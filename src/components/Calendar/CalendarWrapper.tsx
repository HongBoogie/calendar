'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import { subMonths } from 'date-fns';
import { useState } from 'react';
import ScheduleModal from '../SchedulModal/ScheduleModal';
import { DateObj, Schedule } from '@/libs/internalTypes';
import AddScheduleModal from '../Modal/AddScheduleModal';
import ScheduleBtn from '../SchedulModal/ScheduleBtn';
import { useScheduleStore } from '@/store/ScheduleStore';
import InitialCalendar from './InitialCalendar';
import ScheduleLabel from './ScheduleLabel';
import useScheduleModal from '@/hooks/useScheduleModal';
import useThemeContext from '@/hooks/useThemeContext';

type CalendarContextProps = {
  weekCalendarList: Array<Array<DateObj>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  calculateMonth: (month: number) => string;
  theme: string;
  isSidebarOpen: boolean;
};

type CalendarProps = CalendarContextProps & PropsWithChildren;

const CalendarContext = React.createContext<CalendarContextProps | undefined>(undefined);

const CalendarWrapper = ({
  weekCalendarList,
  currentDate,
  setCurrentDate,
  calculateMonth,
  isSidebarOpen,
  theme,
  children,
}: CalendarProps) => {
  const value = {
    weekCalendarList,
    currentDate,
    setCurrentDate,
    calculateMonth,
    isSidebarOpen,
    theme,
  };

  return (
    <CalendarContext.Provider value={value}>
      <div
        className={clsx('flex flex-col border-t min-h-calendar', {
          'md:pl-40': isSidebarOpen,
          'border-t-slate-400': theme === 'DARK',
        })}
      >
        {children}
      </div>
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = React.useContext(CalendarContext);
  if (!context) {
    throw new Error('컨텍스트가 존재하지 않습니다.');
  }
  return context;
};

const Buttons = () => {
  const { currentDate, setCurrentDate, calculateMonth } = useCalendarContext();
  const [isShowModal, setIsShowModal] = useState(false);
  const { theme } = useThemeContext();

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className="flex my-4 ml-4 gap-4">
      <strong
        className={clsx('text-lg flex items-center w-20', {
          'text-slate-300': theme === 'DARK',
        })}
      >
        {currentDate.getFullYear()}. {calculateMonth(currentDate.getMonth() + 1)}
      </strong>
      <div className="flex gap-1">
        <ScheduleBtn
          className={clsx(
            'border rounded-md w-8 h-8 flex relative items-center',
            'justify-center text-lg  text-sky-400 border-sky-400',
            {
              'border-slate-300 text-slate-300': theme === 'DARK',
            },
          )}
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        >
          <p className="pb-[2px]">{'<'}</p>
        </ScheduleBtn>
        <ScheduleBtn
          className={clsx(
            'border rounded-md w-8 h-8 flex relative items-center text-lg',
            'justify-center text-sky-400 border-sky-400',
            {
              'border-slate-300 text-slate-300': theme === 'DARK',
            },
          )}
          onClick={() => setCurrentDate(subMonths(currentDate, -1))}
        >
          <p className="pb-[2px]">{'>'}</p>
        </ScheduleBtn>
        <ScheduleBtn
          className={clsx(
            'border rounded-md w-8 flex items-center justify-center text-xs',
            'text-sky-400 border-sky-400',
            {
              'border-slate-300 text-slate-300': theme === 'DARK',
            },
          )}
          onClick={() => setCurrentDate(new Date())}
        >
          오늘
        </ScheduleBtn>
        <ScheduleBtn
          onClick={openModal}
          className={clsx(
            'border rounded-md w-8 h-8 pb-[2px] flex items-center',
            'justify-center text-lg text-sky-400 border-sky-400',
            {
              'border-slate-300 text-slate-300': theme === 'DARK',
            },
          )}
        >
          +
        </ScheduleBtn>
      </div>
      {isShowModal && (
        <AddScheduleModal close={closeModal} prevClose={closeModal}>
          일정 추가
        </AddScheduleModal>
      )}
    </div>
  );
};

const WeekDays = () => {
  const { currentDate } = useCalendarContext();
  const [currentDay, setCurrentDay] = useState<number>(-1);

  useEffect(() => {
    setCurrentDay(currentDate.getDay());
  }, [currentDate]);

  return (
    <div className="grid grid-cols-7">
      {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
        <div
          key={idx}
          className={clsx('text-center font-bold', {
            'text-red-500': day === '일',
            'opacity-35': idx !== currentDay || currentDate.getMonth() !== new Date().getMonth(),
          })}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

const Days = () => {
  const [today, setToday] = useState<Date | null>(null);
  const [schedulesByDay, setSchedulesByDay] = useState<Record<string, Schedule[]>>({});
  const { weekCalendarList, currentDate } = useCalendarContext();
  const { isShowModal, dateObj, modalSchedule, openModal, closeModal } = useScheduleModal();
  const { theme } = useThemeContext();

  const schedules = useScheduleStore((state) => state.schedules);
  const getSchedulesByDate = useScheduleStore((state) => state.getSchedulesByDate);

  useEffect(() => {
    setToday(new Date()); // hydration 에러 때문에 추가함.

    const allSchedules: Record<string, Schedule[]> = {};
    weekCalendarList.forEach((week) => {
      week.forEach((date) => {
        const key = `${date.year}-${date.month}-${date.day}`;
        allSchedules[key] = getSchedulesByDate(date);
      });
    });
    setSchedulesByDay(allSchedules);
  }, [weekCalendarList, getSchedulesByDate, schedules]);

  if (!today) {
    return <InitialCalendar weekCalendarList={weekCalendarList} />;
  }

  return (
    <div className="grid grid-cols-7 flex-grow">
      {weekCalendarList.map((week, weekIdx) => (
        <React.Fragment key={weekIdx}>
          {week.map((dateObj, dayIdx) => {
            const dateKey = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
            const schedules = schedulesByDay[dateKey] || [];
            const isToday =
              dateObj.day === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            return (
              <div
                key={dayIdx}
                onClick={() => openModal(dateObj)}
                className={clsx(
                  'text-center relative border-t pt-2 min-h-[100px]',
                  'hover:bg-sky-50 ease-in-out duration-150',
                  {
                    'text-gray-300': dateObj.type !== 'current',
                    'text-white': isToday,
                    'border-t-slate-400': theme === 'DARK',
                  },
                )}
              >
                {isToday ? (
                  <div className="absolute left-1/2 top-2 -translate-x-1/2 w-6 h-6 bg-sky-400 rounded-full">
                    <span className="text-white">{dateObj.day}</span>
                  </div>
                ) : (
                  <span className="text-xs md:text-lg">{dateObj.day}</span>
                )}
                <ScheduleLabel schedules={schedules} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
      {isShowModal && <ScheduleModal DateObj={dateObj} schedule={modalSchedule} close={closeModal} />}
    </div>
  );
};

CalendarWrapper.Buttons = Buttons;
CalendarWrapper.WeekDays = WeekDays;
CalendarWrapper.Days = Days;

export default CalendarWrapper;

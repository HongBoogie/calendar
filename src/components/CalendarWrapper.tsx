'use client';

import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import { subMonths } from 'date-fns';
import { useState } from 'react';
import ScheduleModal from './ScheduleModal';
import { DateObj, Schedule } from '@/libs/internalTypes';
import AddScheduleModal from './AddScheduleModal';
import ScheduleBtn from './ScheduleBtn';
import { useScheduleStore } from '@/store/ScheduleStore';

type CalendarContextProps = {
  weekCalendarList: Array<Array<{ year: number; day: number; type: string; month: number }>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  calculateMonth: (month: number) => string;
};

type CalendarProps = CalendarContextProps & PropsWithChildren<{}>;

const CalendarContext = React.createContext<CalendarContextProps | undefined>(undefined);

const CalendarWrapper = ({
  weekCalendarList,
  currentDate,
  setCurrentDate,
  calculateMonth,
  children,
}: CalendarProps) => {
  const value = {
    weekCalendarList,
    currentDate,
    setCurrentDate,
    calculateMonth,
  };

  return (
    <CalendarContext.Provider value={value}>
      <div className="flex flex-col min-h-home">{children}</div>
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

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className="flex gap-4 w-[calc(100% - 8px)] m-3">
      <strong className="text-lg w-20">
        {currentDate.getFullYear()}. {calculateMonth(currentDate.getMonth() + 1)}
      </strong>
      <div className="flex gap-1">
        <ScheduleBtn
          className="border rounded-md w-8 flex items-center justify-center text-lg text-sky-400 border-sky-400"
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        >
          {'<'}
        </ScheduleBtn>
        <ScheduleBtn
          className="border rounded-md w-8 flex items-center text-lg justify-center text-sky-400 border-sky-400"
          onClick={() => setCurrentDate(subMonths(currentDate, -1))}
        >
          {'>'}
        </ScheduleBtn>
        <ScheduleBtn
          className="border rounded-md w-8 flex items-center justify-center text-xs text-sky-400 border-sky-400"
          onClick={() => setCurrentDate(new Date())}
        >
          오늘
        </ScheduleBtn>
        <ScheduleBtn
          onClick={openModal}
          className="border rounded-md w-8 flex items-center justify-center text-lg text-sky-400 border-sky-400"
        >
          +
        </ScheduleBtn>
      </div>
      {isShowModal && <AddScheduleModal close={closeModal}>일정 추가</AddScheduleModal>}
    </div>
  );
};

const WeekDays = () => {
  const { currentDate } = useCalendarContext();

  return (
    <div className="grid grid-cols-7">
      {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
        <div
          key={idx}
          className={clsx('text-center font-bold mb-1', {
            ['text-red-500']: day === '일',
            ['opacity-35']: idx !== currentDate.getDay() || currentDate.getMonth() !== new Date().getMonth(),
          })}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

const Days = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [dateObj, setDateObj] = useState<DateObj>({ year: 0, day: 0, type: '', month: 0 });
  const [today, setToday] = useState<Date | null>(null);
  const [schedulesByDay, setSchedulesByDay] = useState<Record<string, Schedule[]>>({});
  const [modalSchedule, setModalSchedule] = useState<Schedule | null>(null);
  const { weekCalendarList, currentDate } = useCalendarContext();

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

  const openModal = (date: DateObj) => {
    setIsShowModal(true);
    setDateObj(date);
    setModalSchedule(getSchedulesByDate(date)[0] || null);
  };
  const closeModal = () => setIsShowModal(false);

  if (!today) {
    return (
      <div className="grid grid-cols-7 flex-grow">
        {weekCalendarList.map((week, weekIdx) => (
          <React.Fragment key={weekIdx}>
            {week.map((dateObj, dayIdx) => (
              <div key={dayIdx} className="text-center relative border-t pt-2 min-h-[100px]">
                <span>{dateObj.day}</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 flex-grow">
      {weekCalendarList.map((week, weekIdx) => (
        <React.Fragment key={weekIdx}>
          {week.map((dateObj, dayIdx) => {
            const dateKey = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
            const schedules = schedulesByDay[dateKey] || [];
            const isToday = dateObj.day === today.getDate() && currentDate.getMonth() === today.getMonth();

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
                  },
                )}
              >
                {isToday ? (
                  <div className="absolute left-1/2 top-2 opacity-50 -translate-x-1/2 w-6 h-6 bg-sky-500 rounded-full">
                    <span className="text-white">{dateObj.day}</span>
                  </div>
                ) : (
                  <span>{dateObj.day}</span>
                )}
                <div className="mt-4 px-1">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className={clsx(
                        'text-xs p-1 mb-1 rounded truncate text-left',
                        'bg-sky-100 text-sky-700',
                        schedule.isAllDay && 'bg-purple-100 text-purple-700',
                      )}
                      title={schedule.title}
                    >
                      {schedule.isAllDay ? (
                        schedule.title
                      ) : (
                        <>
                          {schedule.startTime && <span className="mr-1">{schedule.startTime}</span>}
                          {schedule.title}
                        </>
                      )}
                    </div>
                  ))}
                </div>
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

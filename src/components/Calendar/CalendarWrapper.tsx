'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import { useState } from 'react';
import ScheduleModal from '../SchedulModal/ScheduleModal';
import { DateObj } from '@/libs/internalTypes';
import AddScheduleModal from '../Modal/AddScheduleModal';
import useCalendarGrid from '@/hooks/useCalendarGrid';
import InitialCalendar from './Days/InitialCalendar';
import useClientDate from '@/hooks/useClientDate';
import CalendarWeek from './Days/CalendarWeek';
import useScheduleModal from '@/hooks/useScheduleModal';
import useThemeContext from '@/hooks/useThemeContext';
import ButtonsWrapper from './Buttons/ButtonsWrapper';
import FullDate from './Buttons/FullDate';

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

const Buttons = () => {
  const { currentDate, calculateMonth } = useCalendarContext();
  const [isShowModal, setIsShowModal] = useState(false);

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className="flex my-4 ml-4 gap-4">
      <FullDate currentDate={currentDate} calculateMonth={calculateMonth} />
      <ButtonsWrapper isShowModal={isShowModal} currentDate={currentDate} openModal={openModal}>
        <ButtonsWrapper.Prev />
        <ButtonsWrapper.Next />
        <ButtonsWrapper.Today />
        <ButtonsWrapper.Add />
      </ButtonsWrapper>
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
  const { weekCalendarList, currentDate } = useCalendarContext();
  const { theme } = useThemeContext();
  const { isShowModal, dateObj, modalSchedule, openModal, closeModal } = useScheduleModal();
  const { schedulesByDay } = useCalendarGrid();
  const today = useClientDate(); // 커스텀 훅으로 hydration 처리

  if (!today) {
    return <InitialCalendar weekCalendarList={weekCalendarList} />;
  }

  return (
    <div className="grid grid-cols-7 flex-grow">
      {weekCalendarList.map((week, weekIdx) => (
        <CalendarWeek
          key={weekIdx}
          week={week}
          today={today}
          currentDate={currentDate}
          schedulesByDay={schedulesByDay}
          theme={theme}
          onCellClick={openModal}
        />
      ))}
      {isShowModal && <ScheduleModal DateObj={dateObj} schedule={modalSchedule} close={closeModal} />}
    </div>
  );
};

CalendarWrapper.Buttons = Buttons;
CalendarWrapper.WeekDays = WeekDays;
CalendarWrapper.Days = Days;

export default CalendarWrapper;

export const useCalendarContext = () => {
  const context = React.useContext(CalendarContext);
  if (!context) {
    throw new Error('컨텍스트가 존재하지 않습니다.');
  }
  return context;
};

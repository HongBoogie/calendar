'use client';

import React from "react";
import clsx from "clsx";
import { type PropsWithChildren } from "react";
import { subMonths } from "date-fns";


type CalendarContextProps = {
  weekCalendarList: Array<Array<{day: number, type: string}>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  calculateMonth: (month: number) => string;
}

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
  }

  return (
    <CalendarContext.Provider value={value}>
      <div className="flex flex-col min-h-home">
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
}

const Buttons = () => {
  const { currentDate ,setCurrentDate, calculateMonth } = useCalendarContext();

  return (
    <div className="flex gap-4 m-3">
          <strong className="text-lg w-20">{currentDate.getFullYear()}. {calculateMonth(currentDate.getMonth() + 1)}</strong>
          <div className="flex gap-1">
          <button 
          className="border rounded-md w-8 flex items-center justify-center text-xl text-sky-400 border-sky-400"
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}>{'<'}</button>
          <button 
          className="border rounded-md w-8 flex items-center text-xl justify-center text-sky-400 border-sky-400"
          onClick={() => setCurrentDate(subMonths(currentDate, -1))}>{'>'}</button>
          <button
            className="border rounded-md w-8 flex items-center justify-center text-xs text-sky-400 border-sky-400"
            onClick={() => setCurrentDate(new Date())}>
            오늘
          </button>
        </div>
    </div>
  );
}

const WeekDays = () => {
  const { currentDate } = useCalendarContext();

  return (
    <div className="grid grid-cols-7">
      {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
        <div key={idx} className={clsx("text-center font-bold mb-1", {
          ['text-red-500'] : day === '일',
          ['opacity-35'] : idx !== currentDate.getDay() || currentDate.getMonth() !== new Date().getMonth(),
        })}>{day}</div>
      ))}
    </div>
  );
}

const Days = () => {
  const { weekCalendarList } = useCalendarContext();

  return (
    <div className="grid grid-cols-7 flex-grow">
  {weekCalendarList.map((week, weekIdx) => (
    <React.Fragment key={weekIdx}>
      {week.map((dateObj, dayIdx) => (
        <div
          key={dayIdx}
          className={clsx("text-center border-t pt-2",
            "hover:bg-sky-50 ease-in-out duration-150", {
            'text-gray-300': dateObj.type !== 'current'
          })}
        >
          {dateObj.day}
        </div>
      ))}
    </React.Fragment>
  ))}
</div>
  )
}

CalendarWrapper.Buttons = Buttons;
CalendarWrapper.WeekDays = WeekDays;
CalendarWrapper.Days = Days;

export default CalendarWrapper;

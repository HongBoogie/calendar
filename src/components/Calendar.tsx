'use client';

import React from "react";
import clsx from "clsx";
import { subMonths } from "date-fns";
import useCalendar from "../hooks/useCalendar";


const Calendar = () => {
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();

  const calculateMonth = (month: number) => {
    if (month < 10) {
      return `0${month}`;
    } else {
      return `${month}`;
    }
  }

  return (
      <div className="flex flex-col min-h-home">
        <div className="flex gap-4 m-3">
          <strong className="text-lg">{currentDate.getFullYear()}. {calculateMonth(currentDate.getMonth() + 1)}</strong>
          <div className="flex gap-1">
          <button 
          className="border rounded-md w-8 flex items-center justify-center"
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}>{'<'}</button>
          <button 
          className="border rounded-md w-8 flex items-center justify-center"
          onClick={() => setCurrentDate(subMonths(currentDate, -1))}>{'>'}</button>
          <button
            className="border rounded-md w-8 flex items-center justify-center text-xs"
            onClick={() => setCurrentDate(currentDate)}>
            오늘
          </button>
          </div>
        </div>
        <div className="grid grid-cols-7">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
            <div key={idx} className={clsx("text-center font-bold mb-1", {
              ['text-red-500'] : day === '일',
              ['opacity-35'] : idx !== currentDate.getDay() || currentDate.getMonth() !== new Date().getMonth(),
            })}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-grow">
  {weekCalendarList.map((week, weekIdx) => (
    <React.Fragment key={weekIdx}>
      {week.map((dateObj, dayIdx) => (
        <div
          key={dayIdx}
          className={clsx("text-center border-t pt-2",
            "hover:bg-gray-100 ease-in-out duration-150", {
            'text-gray-300': dateObj.type !== 'current'
          })}
        >
          {dateObj.day}
        </div>
      ))}
    </React.Fragment>
  ))}
</div>
      </div>
  )
}

export default Calendar
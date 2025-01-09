'use client';

import React, { useEffect } from "react";
import { subMonths } from "date-fns";
import useCalendar from "../hooks/useCalendar";

type CalendarProps = {

}

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
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="text-center">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-grow">
          {weekCalendarList.map((week, idx) => (
            <React.Fragment key={idx}>
              {week.map((day, idx) => (
                <div key={idx} className="text-center border-t">{day}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
  )
}

export default Calendar
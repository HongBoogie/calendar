'use client';

import React from "react";

import useCalendar from "../hooks/useCalendar";
import { useEffect } from "react";

const Calendar = () => {
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();

  useEffect(() => {
    console.log(weekCalendarList);
    console.log(currentDate);
  });

  return (
      <div className="w-full h-screen">
        <div className="flex justify-between">
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>prev</button>
          <div>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</div>
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>next</button>
        </div>
        <div className="grid grid-cols-7 gap-8">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="text-center">{day}</div>
          ))}
          {weekCalendarList.map((week, idx) => (
            <React.Fragment key={idx}>
              {week.map((day, idx) => (
                <div key={idx} className="text-center h-20">{day}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
  )
}

export default Calendar
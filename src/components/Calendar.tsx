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
      <div className="">
        hi
      </div>
  )
}

export default Calendar
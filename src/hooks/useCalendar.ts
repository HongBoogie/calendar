'use client';

import React from 'react';
import { getDaysInMonth, subMonths } from 'date-fns';
import { CALENDER_LENGTH, DAY_OF_WEEK } from '../configs/tailwind.constant';

const useCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const totalMonthDays = getDaysInMonth(currentDate);
  const prevMonth = subMonths(currentDate, 1);
  const prevMonthDays = getDaysInMonth(prevMonth);
  
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const startDayIndex = firstDayOfMonth.getDay();

  const prevDayList = Array.from({ length: startDayIndex }).map((_, index) => ({
    day: prevMonthDays - startDayIndex + index + 1,
    type: 'prev'
  }));

  const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => ({
    day: i + 1,
    type: 'current'
  }));

  const nextDayList = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map((_, index) => ({
    day: index + 1,
    type: 'next'
  }));

  const currentCalendarList = [...prevDayList, ...currentDayList, ...nextDayList];
  const weekCalendarList = currentCalendarList.reduce(
    (acc: Array<Array<{day: number, type: string}>>, cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    [],
  );
  
  return {
    weekCalendarList,
    currentDate,
    setCurrentDate,
  };
};

export default useCalendar;
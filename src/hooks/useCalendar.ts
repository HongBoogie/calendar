'use client';

import React from 'react';
import { getDaysInMonth, subMonths } from 'date-fns';
import { CALENDAR_LENGTH, DAY_OF_WEEK } from '../configs/tailwind.constant';

const useCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const totalMonthDays = getDaysInMonth(currentDate);
  const prevMonth = subMonths(currentDate, 1);
  const prevMonthDays = getDaysInMonth(prevMonth);

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startDayIndex = firstDayOfMonth.getDay();

  const prevDayList = Array.from({ length: startDayIndex }).map((_, index) => ({
    year: prevMonth.getFullYear(),
    day: prevMonthDays - startDayIndex + index + 1,
    type: 'prev',
    month: prevMonth.getMonth() + 1,
  }));

  const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => ({
    year: currentDate.getFullYear(),
    day: i + 1,
    type: 'current',
    month: currentDate.getMonth() + 1,
  }));

  const nextDayList = Array.from({
    length: CALENDAR_LENGTH - currentDayList.length - prevDayList.length,
  }).map((_, index) => ({
    year: currentDate.getFullYear(),
    day: index + 1,
    type: 'next',
    month: currentDate.getMonth() + 2,
  }));

  const currentCalendarList = [...prevDayList, ...currentDayList, ...nextDayList];
  const weekCalendarList = currentCalendarList.reduce(
    (acc: Array<Array<{ year: number; day: number; type: string; month: number }>>, cur, idx) => {
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

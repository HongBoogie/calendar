'use client';

import CalendarWrapper from './CalendarWrapper';
import useCalendar from '../../hooks/useCalendar';

const Calendar = () => {
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();
  const calculateMonth = (month: number) => {
    if (month < 10) {
      return `0${month}`;
    } else {
      return `${month}`;
    }
  };

  return (
    <CalendarWrapper
      weekCalendarList={weekCalendarList}
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      calculateMonth={calculateMonth}
    >
      <CalendarWrapper.Buttons />
      <CalendarWrapper.WeekDays />
      <CalendarWrapper.Days />
    </CalendarWrapper>
  );
};

export default Calendar;

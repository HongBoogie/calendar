'use client';

import CalendarWrapper from './CalendarWrapper';
import useCalendar from '../../hooks/useCalendar';
import { useSidebarContext } from '@/providers/SidebarProvider';
import useThemeContext from '@/hooks/useThemeContext';

const Calendar = () => {
  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();
  const { isSidebarOpen } = useSidebarContext();
  const { theme } = useThemeContext();

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
      isSidebarOpen={isSidebarOpen}
      theme={theme}
    >
      <CalendarWrapper.Buttons />
      <CalendarWrapper.WeekDays />
      <CalendarWrapper.Days />
    </CalendarWrapper>
  );
};

export default Calendar;

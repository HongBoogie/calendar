import { useScheduleStore } from '@/store/ScheduleStore';
import { useState, useEffect } from 'react';
import { formatDateKey } from '@/utils/dateUtils';
import { Schedule } from '@/libs/internalTypes';

const useCalendarGrid = (weekCalendarList: any, currentDate: Date) => {
  const [schedulesByDay, setSchedulesByDay] = useState<Record<string, Schedule[]>>({});
  const getSchedulesByDate = useScheduleStore((state) => state.getSchedulesByDate);
  const schedules = useScheduleStore((state) => state.schedules);

  useEffect(() => {
    const allSchedules: Record<string, Schedule[]> = {};
    weekCalendarList.forEach((week: any) => {
      week.forEach((date: any) => {
        const key = formatDateKey(date);
        allSchedules[key] = getSchedulesByDate(date);
      });
    });
    setSchedulesByDay(allSchedules);
  }, [weekCalendarList, getSchedulesByDate, schedules]);

  return { schedulesByDay };
};

export default useCalendarGrid;

import { DateObj, Schedule } from '@/libs/internalTypes';
import { formatDateKey } from '@/utils/dateUtils';
import { isSameDay } from '@/utils/dateUtils';
import CalendarCell from './CalendarCell';

type Props = {
  week: DateObj[];
  today: Date;
  currentDate: Date;
  schedulesByDay: Record<string, Schedule[]>;
  theme: 'LIGHT' | 'DARK';
  onCellClick: (dateObj: DateObj) => void;
};

const CalendarWeek = ({ week, today, currentDate, schedulesByDay, theme, onCellClick }: Props) => {
  return (
    <>
      {week.map((dateObj, dayIdx) => {
        const dateKey = formatDateKey(dateObj);
        const schedules = schedulesByDay[dateKey] || [];
        const isToday = isSameDay(today, dateObj);
        const isCurrentMonth = dateObj.type === 'current';

        return (
          <CalendarCell
            key={dayIdx}
            dateObj={dateObj}
            schedules={schedules}
            isToday={isToday}
            isCurrentMonth={isCurrentMonth}
            theme={theme}
            onCellClick={onCellClick}
          />
        );
      })}
    </>
  );
};

export default CalendarWeek;

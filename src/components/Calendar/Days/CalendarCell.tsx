import { DateObj, Schedule } from '@/libs/internalTypes';
import clsx from 'clsx';
import ScheduleLabel from './ScheduleLabel';
import DateNumber from './DateNumber';

type Props = {
  dateObj: DateObj;
  schedules: Schedule[];
  isToday: boolean;
  isCurrentMonth: boolean;
  theme: string;
  onCellClick: (dateObj: DateObj) => void;
};

const CalendarCell = ({ dateObj, schedules, isToday, isCurrentMonth, theme, onCellClick }: Props) => {
  return (
    <div
      onClick={() => onCellClick(dateObj)}
      className={clsx('text-center relative border-t pt-2 min-h-[100px]', 'hover:bg-sky-50 ease-in-out duration-150', {
        'text-gray-300': !isCurrentMonth,
        'text-white': isToday,
        'border-t-slate-400': theme === 'DARK',
      })}
    >
      <DateNumber dateObj={dateObj} isToday={isToday} />
      <ScheduleLabel schedules={schedules} />
    </div>
  );
};

export default CalendarCell;

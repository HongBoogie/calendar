import { Schedule } from '@/libs/internalTypes';
import clsx from 'clsx';

type Props = {
  schedules: Schedule[];
};

const ScheduleLabel = ({ schedules }: Props) => {
  return (
    <div className="absolute w-full top-10 px-1">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className={clsx(
            'text-xs p-1 mb-1 rounded truncate text-left',
            'bg-sky-100 text-sky-700',
            schedule.isAllDay && 'bg-purple-100 text-purple-700',
          )}
          title={schedule.title}
        >
          {schedule.isAllDay ? (
            schedule.title
          ) : (
            <>
              {schedule.startTime && <span className="mr-1">{schedule.startTime}</span>}
              {schedule.title}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleLabel;

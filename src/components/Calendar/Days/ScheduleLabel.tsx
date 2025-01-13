import { Schedule } from '@/libs/internalTypes';
import clsx from 'clsx';

type Props = {
  schedules: Schedule[];
};

const ScheduleLabel = ({ schedules }: Props) => {
  return (
    <div className="absolute w-full top-10 px-1">
      {schedules.slice(0, 1).map((schedule) => (
        <div
          key={schedule.id}
          className={clsx(
            'text-2xs md:text-xs py-1 px-2 mb-1 rounded-xl  truncate text-left',
            'bg-sky-100 text-sky-700',
            schedule.isAllDay && 'bg-purple-100 text-purple-700',
          )}
          title={schedule.title}
        >
          {schedule.isAllDay ? (
            schedule.title
          ) : (
            <>
              {schedule.startTime && <span className="mr-1 text-2xs text-gray-500">{schedule.startTime}</span>}
              {schedule.title}
            </>
          )}
        </div>
      ))}
      {schedules.length > 1 && (
        <div className="text-2xs md:text-xs text-gray-400  text-left pl-4">+{schedules.length - 1}개</div>
      )}
    </div>
  );
};

export default ScheduleLabel;

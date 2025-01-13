import { Schedule } from '@/libs/internalTypes';

type Props = {
  schedule: Schedule;
};

const ScheduleTime = ({ schedule }: Props) => {
  return (
    <div className="flex justify-between">
      <p className="text-sm text-gray-500">
        {schedule.startTime} ~ {schedule.endTime}
      </p>
      <p className="text-sm">
        {schedule.date.year}. {schedule.date.month}. {schedule.date.day}
      </p>
    </div>
  );
};

export default ScheduleTime;

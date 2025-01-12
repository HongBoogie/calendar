import { Schedule } from '@/libs/internalTypes';

type Props = {
  schedule: Schedule;
};

const ScheduleTime = ({ schedule }: Props) => {
  return (
    <p className="text-sm text-gray-500">
      {schedule.startTime} ~ {schedule.endTime}
    </p>
  );
};

export default ScheduleTime;

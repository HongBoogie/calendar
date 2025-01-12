import { Schedule } from '@/libs/internalTypes';
import RightArrowSvg from '../svg/RightArrowSvg';

type Props = {
  handleNextSchedule: () => void;
  schedule: Schedule[] | null;
};

const ScheduleIncreaser = ({ handleNextSchedule, schedule }: Props) => {
  return (
    <button
      onClick={handleNextSchedule}
      className="p-2 disabled:opacity-50 absolute -right-1/2 top-1/2 -rotate-90 -translate-y-1/2"
      disabled={!schedule || schedule.length <= 1}
    >
      <RightArrowSvg />
    </button>
  );
};

export default ScheduleIncreaser;

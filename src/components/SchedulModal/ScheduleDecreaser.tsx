import LeftArrowSvg from "../svg/LeftArrowSvg"
import { Schedule } from '@/libs/internalTypes';

type Props = {
  handlePrevSchedule: () => void;
  schedule: Schedule[] | null;
}

const ScheduleDecreaser = ({handlePrevSchedule, schedule} : Props) => {
  return (
    <button
    onClick={handlePrevSchedule}
    className="p-2 disabled:opacity-50 absolute -left-1/2 top-1/2 rotate-90 -translate-y-1/2"
    disabled={!schedule || schedule.length <= 1}
  >
    <LeftArrowSvg />
  </button>
  )
}

export default ScheduleDecreaser;
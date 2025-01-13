import { DateObj } from '@/libs/internalTypes';

type Props = {
  isToday: boolean;
  dateObj: DateObj;
};

const DateNumber = ({ isToday, dateObj }: Props) => {
  return (
    <>
      {isToday ? (
        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-6 h-6 bg-sky-400 rounded-full">
          <span className="text-white">{dateObj.day}</span>
        </div>
      ) : (
        <span className="text-xs md:text-lg">{dateObj.day}</span>
      )}
    </>
  );
};

export default DateNumber;

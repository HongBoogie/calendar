import React from 'react';
import { DateObj } from '@/libs/internalTypes';

type Props = {
  weekCalendarList: Array<Array<DateObj>>;
};

const InitialCalendar = ({ weekCalendarList }: Props) => {
  return (
    <div className="grid grid-cols-7 flex-grow">
      {weekCalendarList.map((week, weekIdx) => (
        <React.Fragment key={weekIdx}>
          {week.map((dateObj, dayIdx) => (
            <div key={dayIdx} className="text-center relative border-t pt-2 min-h-[100px]">
              <span>{dateObj.day}</span>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default InitialCalendar;

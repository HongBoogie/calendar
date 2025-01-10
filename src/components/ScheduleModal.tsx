'use client';

import { type ComponentPropsWithoutRef } from 'react';
import { DateObj, Schedule } from '@/libs/internalTypes';
import Modal from './Modal';
import { useScheduleStore } from '@/store/ScheduleStore';
import DeleteSvg from './svg/DeleteSvg';
import ModifySvg from './svg/ModifySvg';

type Props = ComponentPropsWithoutRef<typeof Modal> & {
  DateObj: DateObj;
  schedule: Schedule | null;
};

const ScheduleModal = ({ close, DateObj, schedule }: Props) => {
  const deleteSchedule = useScheduleStore((state) => state.deleteSchedule);
  const updateSchedule = useScheduleStore((state) => state.updateSchedule);

  const handleDelete = () => {
    if (schedule) {
      deleteSchedule(schedule.id);
      close();
    }
  };

  return (
    <Modal close={close}>
      {schedule && (
        <div className='flex justify-end gap-1'>
          <button>
            <ModifySvg />
          </button>
          <button onClick={handleDelete}>
            <DeleteSvg />
          </button>
        </div>
      )}
      <div className="text-center">
        {schedule ? (
          <>
            <h3 className="text-lg font-bold mb-2">{schedule.title}</h3>
            <p className="mb-2">{schedule.description}</p>
            {schedule.startTime && (
              <p>
                {schedule.startTime} ~ {schedule.endTime}
              </p>
            )}
          </>
        ) : (
          <p>일정이 없습니다.</p>
        )}
      </div>
    </Modal>
  );
};

export default ScheduleModal;

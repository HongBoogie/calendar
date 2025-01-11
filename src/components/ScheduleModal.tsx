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

const ScheduleModal = ({ close, schedule }: Props) => {
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
      <div className="min-h-32 relative flex-col">
        {schedule ? (
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg flex mt-1 font-bold">{schedule.title}</h3>
              {schedule && (
                <div className="flex gap-1">
                  <button onClick={}>
                    <ModifySvg />
                  </button>
                  <button onClick={handleDelete}>
                    <DeleteSvg />
                  </button>
                </div>
              )}
            </div>
            <p className="flex-1 flex truncate">{schedule.description}</p>
            {schedule.startTime && (
              <p className="text-sm text-gray-500">
                {schedule.startTime} ~ {schedule.endTime}
              </p>
            )}
          </div>
        ) : (
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">일정이 없습니다.</p>
        )}
      </div>
    </Modal>
  );
};

export default ScheduleModal;

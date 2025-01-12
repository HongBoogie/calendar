import React from 'react';
import ModifySvg from '../svg/ModifySvg';
import DeleteSvg from '../svg/DeleteSvg';
import { Schedule } from '@/libs/internalTypes';
import { useScheduleStore } from '@/store/ScheduleStore';

type Props = {
  schedule: Schedule;
  openModal: () => void;
  closeModal: () => void;
};

const Header = ({ schedule, openModal, closeModal }: Props) => {
  const deleteSchedule = useScheduleStore((state) => state.deleteSchedule);

  const handleDelete = () => {
    if (schedule) {
      deleteSchedule(schedule.id);
    }

    closeModal();
  };

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg flex mt-1 font-bold">{schedule.title}</h3>
      <div className="flex gap-1">
        <button title="일정 수정" onClick={openModal}>
          <ModifySvg />
        </button>
        <button title="일정 삭제" onClick={handleDelete}>
          <DeleteSvg />
        </button>
      </div>
    </div>
  );
};

export default Header;

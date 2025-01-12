'use client';

import { type ComponentPropsWithoutRef } from 'react';
import { DateObj, Schedule } from '@/libs/internalTypes';
import Modal from '../Modal';
import Header from './Header';
import UpdateScheduleModal from '../UpdateScheduleModal';
import AddScheduleModal from '../AddScheduleModal';

import { useState } from 'react';
import ScheduleTime from './ScheduleTime';
import NoSchedule from './NoSchedule';

import ScheduleDecreaser from './ScheduleDecreaser';
import ScheduleIncreaser from './ScheduleIncreaser';

type Props = ComponentPropsWithoutRef<typeof Modal> & {
  DateObj: DateObj;
  schedule: Schedule[] | null;
};

const ScheduleModal = ({ close, schedule }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [detailedSchedule, setDetailedSchedule] = useState<Schedule | null>(
    schedule && schedule.length > 0 ? schedule[0] : null,
  );
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const openUpdateModal = () => setIsShowModal(true);
  const closeUpdateModal = () => setIsShowModal(false);

  const openAddModal = () => {
    setIsShowAddModal(true);
  };
  const closeAddModal = () => setIsShowAddModal(false);

  const handlePrevSchedule = () => {
    if (!schedule || schedule.length === 0) return;

    const newIndex = currentIndex > 0 ? currentIndex - 1 : schedule.length - 1;
    setCurrentIndex(newIndex);
    setDetailedSchedule(schedule[newIndex]);
  };

  const handleNextSchedule = () => {
    if (!schedule || schedule.length === 0) return;

    const newIndex = currentIndex < schedule.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setDetailedSchedule(schedule[newIndex]);
  };

  return (
    <Modal close={close}>
      <div className="min-h-32 relative flex-col">
        {detailedSchedule ? (
          <div className="flex flex-col space-y-6">
            <Header schedule={detailedSchedule} openModal={openUpdateModal} closeModal={close} />
            <p className="flex-1 flex truncate">{detailedSchedule.description}</p>
            {detailedSchedule.startTime && <ScheduleTime schedule={detailedSchedule} />}
          </div>
        ) : (
          <NoSchedule openAddModal={openAddModal} />
        )}
        <ScheduleDecreaser handlePrevSchedule={handlePrevSchedule} schedule={schedule} />
        <ScheduleIncreaser handleNextSchedule={handleNextSchedule} schedule={schedule} />
      </div>

      {isShowAddModal && <AddScheduleModal close={closeAddModal} prevClose={close} />}
      {isShowModal && <UpdateScheduleModal schedule={detailedSchedule} close={closeUpdateModal} prevClose={close} />}
    </Modal>
  );
};

export default ScheduleModal;

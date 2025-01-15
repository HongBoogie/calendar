'use client';

import { type ComponentPropsWithoutRef } from 'react';
import { DateObj, Schedule } from '@/libs/internalTypes';
import Modal from '../Modal/Modal';
import Header from './Header';
import UpdateScheduleModal from '../Modal/UpdateScheduleModal';
import AddScheduleModal from '../Modal/AddScheduleModal';

import { useState } from 'react';
import ScheduleTime from './ScheduleTime';
import NoSchedule from './NoSchedule';

import ScheduleDecreaser from './ScheduleDecreaser';
import ScheduleIncreaser from './ScheduleIncreaser';
import useChangeSchedule from '@/hooks/useChangeSchedule';

type Props = ComponentPropsWithoutRef<typeof Modal> & {
  DateObj?: DateObj;
  schedule: Schedule[] | null;
};

const ScheduleModal = ({ close, schedule, DateObj }: Props) => {
  const { detailedSchedule, handleNextSchedule, handlePrevSchedule } = useChangeSchedule({ schedule });

  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);

  const openUpdateModal = () => setIsShowUpdateModal(true);
  const closeUpdateModal = () => setIsShowUpdateModal(false);

  const openAddModal = () => {
    setIsShowAddModal(true);
  };
  const closeAddModal = () => setIsShowAddModal(false);

  const padZero = (num: number) => String(num).padStart(2, '0');
  const formattedDate = DateObj ? `${DateObj.year}-${padZero(DateObj.month)}-${padZero(DateObj.day)}` : '';

  return (
    <Modal close={close}>
      <div className="min-h-32 h-32 relative flex-col">
        {detailedSchedule ? (
          <div className="flex flex-col justify-between h-full">
            <Header schedule={detailedSchedule} openModal={openUpdateModal} closeModal={close} />
            <p className="flex-1 flex truncate">{detailedSchedule.description}</p>
            <ScheduleTime schedule={detailedSchedule} />
          </div>
        ) : (
          <NoSchedule openAddModal={openAddModal} />
        )}
        <ScheduleDecreaser handlePrevSchedule={handlePrevSchedule} schedule={schedule} />
        <ScheduleIncreaser handleNextSchedule={handleNextSchedule} schedule={schedule} />
      </div>

      {isShowAddModal && <AddScheduleModal close={closeAddModal} date={formattedDate} prevClose={close} />}
      {isShowUpdateModal && (
        <UpdateScheduleModal schedule={detailedSchedule} close={closeUpdateModal} prevClose={close} />
      )}
    </Modal>
  );
};

export default ScheduleModal;

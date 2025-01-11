import { useState } from 'react';
import { DateObj, Schedule } from '@/libs/internalTypes';
import { useScheduleStore } from '@/store/ScheduleStore';

const useScheduleModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [dateObj, setDateObj] = useState<DateObj>({ year: 0, day: 0, type: '', month: 0 });
  const [modalSchedule, setModalSchedule] = useState<Schedule | null>(null);
  const getSchedulesByDate = useScheduleStore((state) => state.getSchedulesByDate);

  const openModal = (date: DateObj) => {
    setIsShowModal(true);
    setDateObj(date);
    setModalSchedule(getSchedulesByDate(date)[0] || null);
  };

  const closeModal = () => setIsShowModal(false);

  return {
    isShowModal,
    dateObj,
    modalSchedule,
    openModal,
    closeModal,
  };
};

export default useScheduleModal;

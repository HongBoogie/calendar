import { useState } from 'react';
import { Schedule } from '@/libs/internalTypes';

type Props = {
  schedule: Schedule[] | null;
};

const useChangeSchedule = ({ schedule }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [detailedSchedule, setDetailedSchedule] = useState<Schedule | null>(
    schedule && schedule.length > 0 ? schedule[0] : null,
  );

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

  return { currentIndex, detailedSchedule, handlePrevSchedule, handleNextSchedule };
};

export default useChangeSchedule;

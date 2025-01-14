import { useState } from 'react';
import { useScheduleStore } from '@/store/ScheduleStore';
import { Schedule } from '@/libs/internalTypes';
import ScheduleModal from './ScheduleModal';

type Props = {
  close: () => void;
  schedule: Schedule | null;
  prevClose: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

export type FormDataProps = {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
};

const UpdateScheduleModal = ({ schedule, close, prevClose }: Props) => {
  const updateSchedule = useScheduleStore((state) => state.updateSchedule);

  const [formData, setFormData] = useState<FormDataProps>({
    title: schedule?.title || '',
    description: schedule?.description || '',
    date: schedule?.date.year + '-' + schedule?.date.month + '-' + schedule?.date.day || '',
    startTime: schedule?.startTime || '',
    endTime: schedule?.endTime || '',
    isAllDay: schedule?.isAllDay || false,
  });
  const padZero = (num: number) => String(num).padStart(2, '0');

  const formattedDate = schedule?.date
    ? `${schedule.date.year}-${padZero(schedule.date.month)}-${padZero(schedule.date.day)}`
    : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (schedule) {
      e.preventDefault();

      const [year, month, day] = formData.date.split('-').map(Number);

      updateSchedule(schedule?.id, {
        title: formData.title,
        description: formData.description,
        date: { year, month, day },
        startTime: formData.isAllDay ? undefined : formData.startTime,
        endTime: formData.isAllDay ? undefined : formData.endTime,
        isAllDay: formData.isAllDay,
      });

      prevClose();
      close();
    }
  };

  return (
    <ScheduleModal
      close={close}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      formattedDate={formattedDate}
      type="일정 수정"
    />
  );
};

export default UpdateScheduleModal;

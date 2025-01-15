import { useState } from 'react';
import { useScheduleStore } from '@/store/ScheduleStore';
import ScheduleModal from './ScheduleModal';
import type { FormDataProps } from '@/libs/internalTypes';

type Props = {
  close: () => void;
  prevClose: () => void;
  date?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const AddScheduleModal = ({ close, prevClose, date }: Props) => {
  const addSchedule = useScheduleStore((state) => state.addSchedule);

  const [formData, setFormData] = useState<FormDataProps>({
    title: '',
    description: '',
    date: date || '',
    startTime: '',
    endTime: '',
    isAllDay: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [year, month, day] = formData.date.split('-').map(Number);

    addSchedule({
      title: formData.title,
      description: formData.description,
      date: { year, month, day },
      startTime: formData.isAllDay ? undefined : formData.startTime,
      endTime: formData.isAllDay ? undefined : formData.endTime,
      isAllDay: formData.isAllDay,
    });

    prevClose();
    close();
  };

  return (
    <ScheduleModal
      close={close}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      type="일정 추가"
    />
  );
};

export default AddScheduleModal;

import { useState } from 'react';
import Modal from './Modal';
import { useScheduleStore } from '@/store/ScheduleStore';
import { Schedule } from '@/libs/internalTypes';

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
    <Modal close={close}>
      <h2 className="text-xl font-bold mb-4 text-center">일정 변경</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            일정명
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={15}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="text-xs text-slate-500 my-1">· 15자 이내로 입력해주세요.</p>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            날짜
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formattedDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isAllDay"
            name="isAllDay"
            checked={formData.isAllDay}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <label htmlFor="isAllDay" className="text-sm text-gray-700">
            종일
          </label>
        </div>

        {!formData.isAllDay && (
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                시작 시간
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                종료 시간
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            설명
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            maxLength={30}
            className="mt-1 relative block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex justify-between my-1">
            <p className="text-xs text-slate-500">· 설명은 30자까지 입력 가능합니다.</p>
            <p className="flex justify-end text-sm">{formData.description.length} / 30</p>
          </div>
        </div>
        <div className="flex gap-2 pt-4">
          <button
            type="button"
            onClick={close}
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            저장
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateScheduleModal;

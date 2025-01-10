import { useState } from 'react';
import Modal from './Modal';
import { useScheduleStore } from '@/store/ScheduleStore';

type Props = {
  close: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

export type FormDataProps = {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
};

const AddScheduleModal = ({ children, close }: Props) => {
  const addSchedule = useScheduleStore((state) => state.addSchedule);
  const [formData, setFormData] = useState<FormDataProps>({
    title: '',
    description: '',
    date: '',
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

    close();
  };

  return (
    <Modal close={close}>
      <h2 className="text-xl font-bold mb-4 text-center">일정 추가</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            날짜
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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

export default AddScheduleModal;

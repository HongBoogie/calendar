type Props = {
  isAllDay: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  startTime: string;
  endTime: string;
};

const ModalTime = ({ isAllDay, handleChange, startTime, endTime }: Props) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isAllDay"
          name="isAllDay"
          checked={isAllDay}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600"
        />
        <label htmlFor="isAllDay" className="text-sm text-gray-700">
          종일
        </label>
      </div>

      {!isAllDay && (
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
              시작 시간
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={startTime}
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
              value={endTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTime;

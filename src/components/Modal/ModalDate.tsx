type Props = {
  date: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ModalDate = ({ date, handleChange }: Props) => {
  return (
    <div>
      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
        날짜
      </label>
      <input
        type="date"
        id="date"
        name="date"
        value={date}
        onChange={handleChange}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};

export default ModalDate;

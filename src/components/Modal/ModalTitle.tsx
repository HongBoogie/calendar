type Props = {
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ModalTitle = ({ title, handleChange }: Props) => {
  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        일정명
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={handleChange}
        maxLength={15}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <p className="text-xs text-slate-500 my-1">· 15자 이내로 입력해주세요.</p>
    </div>
  );
};

export default ModalTitle;

type Props = {
  description: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const ModalDescription = ({ description, handleChange }: Props) => {
  return (
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        일정 상세
      </label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={handleChange}
        rows={3}
        maxLength={30}
        className="mt-1 relative block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <div className="flex justify-between my-1">
        <p className="text-xs text-slate-500">· 설명은 30자까지 입력 가능합니다.</p>
        <p className="flex justify-end text-sm">{description.length} / 30</p>
      </div>
    </div>
  );
};

export default ModalDescription;

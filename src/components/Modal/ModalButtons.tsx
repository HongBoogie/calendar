type Props = {
  close: () => void;
};

const ModalButtons = ({ close }: Props) => {
  return (
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
  );
};

export default ModalButtons;

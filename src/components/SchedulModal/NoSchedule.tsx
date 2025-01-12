type Props = {
  openAddModal: () => void;
};

const NoSchedule = ({ openAddModal }: Props) => {
  return (
    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
      일정이 없습니다.
      <button
        onClick={openAddModal}
        className="text-white font-bold text-xs h-6 bg-sky-500 rounded-xl hover:opacity-55"
      >
        일정 추가하기
      </button>
    </p>
  );
};

export default NoSchedule;

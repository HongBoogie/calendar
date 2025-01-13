type Props = {
  type: string;
};

const ModalType = ({ type }: Props) => {
  return <h2 className="text-xl font-bold mb-4 text-center">{type}</h2>;
};

export default ModalType;

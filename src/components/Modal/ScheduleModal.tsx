import Modal from './Modal';
import ModalTitle from './ModalTitle';
import ModalType from './ModalType';
import ModalDate from './ModalDate';
import ModalTime from './ModalTime';
import ModalDescription from './ModalDescription';
import ModalButtons from './ModalButtons';

type Props = {
  close: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formData: {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    isAllDay: boolean;
  };
  formattedDate?: string;
  type: string;
};

const ScheduleModal = ({ close, handleSubmit, handleChange, formData, formattedDate, type }: Props) => {
  return (
    <Modal close={close}>
      <ModalType type={type} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <ModalTitle title={formData.title} handleChange={handleChange} />
        {formattedDate ? (
          <ModalDate date={formattedDate} handleChange={handleChange} />
        ) : (
          <ModalDate date={formData.date} handleChange={handleChange} />
        )}
        <ModalTime
          isAllDay={formData.isAllDay}
          handleChange={handleChange}
          startTime={formData.startTime}
          endTime={formData.endTime}
        />
        <ModalDescription description={formData.description} handleChange={handleChange} />
        <ModalButtons close={close} />
      </form>
    </Modal>
  );
};

export default ScheduleModal;

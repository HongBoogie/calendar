import { createContext, type PropsWithChildren, useContext } from 'react';
import ScheduleBtn from '@/components/SchedulModal/ScheduleBtn';
import { subMonths } from 'date-fns';
import clsx from 'clsx';
import { useCalendarContext } from '../CalendarWrapper';
import useThemeContext from '@/hooks/useThemeContext';

type ButtonsContextProps = {
  isShowModal: boolean;
  currentDate: Date;
  openModal: () => void;
};

type ButtonsProps = ButtonsContextProps & PropsWithChildren;

const ButtonsContext = createContext<ButtonsContextProps | undefined>(undefined);

const ButtonsWrapper = ({ isShowModal, currentDate, openModal, children }: ButtonsProps) => {
  return (
    <ButtonsContext.Provider value={{ isShowModal, openModal, currentDate }}>
      <div className="flex gap-1">{children}</div>
    </ButtonsContext.Provider>
  );
};

const PrevMonthButton = () => {
  const { setCurrentDate, currentDate } = useCalendarContext();
  const { theme } = useThemeContext();

  return (
    <ScheduleBtn
      className={clsx(
        'border rounded-md w-8 h-8 flex relative items-center',
        'justify-center text-lg  text-sky-400 border-sky-400',
        {
          'border-slate-300 text-slate-300': theme === 'DARK',
        },
      )}
      onClick={() => setCurrentDate(subMonths(currentDate, 1))}
    >
      <p className="pb-[2px]">{'<'}</p>
    </ScheduleBtn>
  );
};

const NextMonthButton = () => {
  const { setCurrentDate, currentDate } = useCalendarContext();
  const { theme } = useThemeContext();

  return (
    <ScheduleBtn
      className={clsx(
        'border rounded-md w-8 h-8 flex relative items-center text-lg',
        'justify-center text-sky-400 border-sky-400',
        {
          'border-slate-300 text-slate-300': theme === 'DARK',
        },
      )}
      onClick={() => setCurrentDate(subMonths(currentDate, -1))}
    >
      <p className="pb-[2px]">{'>'}</p>
    </ScheduleBtn>
  );
};

const TodayButton = () => {
  const { setCurrentDate } = useCalendarContext();
  const { theme } = useThemeContext();

  return (
    <ScheduleBtn
      className={clsx('border rounded-md w-8 flex items-center justify-center text-xs', 'text-sky-400 border-sky-400', {
        'border-slate-300 text-slate-300': theme === 'DARK',
      })}
      onClick={() => setCurrentDate(new Date())}
    >
      오늘
    </ScheduleBtn>
  );
};

const AddScheduleButton = () => {
  const { openModal } = useButtonsContext();
  const { theme } = useThemeContext();

  return (
    <ScheduleBtn
      onClick={openModal}
      className={clsx(
        'border rounded-md w-8 h-8 pb-[2px] flex items-center',
        'justify-center text-lg text-sky-400 border-sky-400',
        {
          'border-slate-300 text-slate-300': theme === 'DARK',
        },
      )}
    >
      +
    </ScheduleBtn>
  );
};

ButtonsWrapper.Prev = PrevMonthButton;
ButtonsWrapper.Next = NextMonthButton;
ButtonsWrapper.Today = TodayButton;
ButtonsWrapper.Add = AddScheduleButton;

export default ButtonsWrapper;

export const useButtonsContext = () => {
  const context = useContext(ButtonsContext);
  if (!context) {
    throw new Error('컨텍스트가 존재하지 않습니다.');
  }
  return context;
};

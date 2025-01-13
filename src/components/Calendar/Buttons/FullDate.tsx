import clsx from 'clsx';
import useThemeContext from '@/hooks/useThemeContext';

type Props = {
  currentDate: Date;
  calculateMonth: (month: number) => string;
};

const FullDate = ({ currentDate, calculateMonth }: Props) => {
  const { theme } = useThemeContext();

  return (
    <strong
      className={clsx('text-lg flex items-center w-20', {
        'text-slate-300': theme === 'DARK',
      })}
    >
      {currentDate.getFullYear()}. {calculateMonth(currentDate.getMonth() + 1)}
    </strong>
  );
};

export default FullDate;

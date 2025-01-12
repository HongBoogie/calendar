import React from 'react';

type ScheduleBtnProps = {
  children: React.ReactNode;
  className?: string;
};

type Props = ScheduleBtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ScheduleBtn = ({ children, className, ...props }: Props) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default ScheduleBtn;

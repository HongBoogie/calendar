export type SvgComponentProps = {
  svgTitle?: string;
  svgDescription?: string;
};

export type DateObj = {
  year?: number;
  day: number;
  type?: string;
  month: number;
};

export type Schedule = {
  id: string;
  title: string;
  date: DateObj;
  description?: string;
  startTime?: string;
  endTime?: string;
  isAllDay: boolean;
};

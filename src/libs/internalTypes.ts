import { APP_THEME } from './constants';

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

export type AppTheme = keyof typeof APP_THEME;

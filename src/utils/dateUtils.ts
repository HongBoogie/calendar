import { DateObj } from '@/libs/internalTypes';

export const formatDateKey = (date: DateObj): string => {
  return `${date.year}-${date.month}-${date.day}`;
};

export const isSameDay = (date1: Date, date2: DateObj): boolean => {
  return date2.day === date1.getDate() && date2.month === date1.getMonth() + 1 && date2.year === date1.getFullYear();
};

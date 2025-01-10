import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DateObj } from '@/libs/internalTypes';
import { Schedule } from '@/libs/internalTypes';

interface ScheduleState {
  schedules: Schedule[];
  addSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  updateSchedule: (id: string, schedule: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;
  getSchedulesByDate: (date: DateObj) => Schedule[];
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      schedules: [],
      
      addSchedule: (schedule) => set((state) => ({
        schedules: [...state.schedules, { ...schedule, id: crypto.randomUUID() }]
      })),
      
      updateSchedule: (id, updatedSchedule) => set((state) => ({
        schedules: state.schedules.map(schedule => 
          schedule.id === id ? { ...schedule, ...updatedSchedule } : schedule
        )
      })),
      
      deleteSchedule: (id) => set((state) => ({
        schedules: state.schedules.filter(schedule => schedule.id !== id)
      })),
      
      getSchedulesByDate: (date) => {
        const { schedules } = get();
        return schedules.filter(
          schedule => 
            schedule.date.year === date.year &&
            schedule.date.month === date.month &&
            schedule.date.day === date.day
        );
      }
    }),
    {
      name: 'schedule-storage', // localStorage에 저장될 키 이름
    }
  )
);
import create from 'zustand';
import { EventInput } from '@fullcalendar/core';

interface CalendarState {
  events: EventInput[];
  docCount: number;
  midCount: number;
  interviewCount: number;
  currentMonth: number;
  selectedDate: string;
  setEvents: (events: EventInput[]) => void;
  setDocCount: (count: number) => void;
  setMidCount: (count: number) => void;
  setInterviewCount: (count: number) => void;
  setCurrentMonth: (month: number) => void;
  setSelectedDate: (date: string) => void;
}

const useCalendarStore = create<CalendarState>((set) => ({
  events: [],
  docCount: 0,
  midCount: 0,
  interviewCount: 0,
  currentMonth: new Date().getMonth() + 1,
  selectedDate: '',
  setEvents: (events) => set({ events }),
  setDocCount: (count) => set({ docCount: count }),
  setMidCount: (count) => set({ midCount: count }),
  setInterviewCount: (count) => set({ interviewCount: count }),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useCalendarStore;

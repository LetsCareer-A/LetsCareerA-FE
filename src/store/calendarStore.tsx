import create from 'zustand';

interface CalendarStore {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const useCalendarStore = create<CalendarStore>((set) => ({
  selectedDate: new Date().toISOString().split('T')[0], 
  setSelectedDate: (date: string) => set({ selectedDate: date }),
}));

export default useCalendarStore;

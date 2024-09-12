import create from 'zustand';

interface Stage {
  stageId: number;
  order: number;
  type: string;
  mid_name: string;
  status: string;
  date: string;
  dday: string;
}

interface Schedule {
  scheduleId: number;
  company: string;
  department: string;
  url: string;
  progress: string;
  isAlways: boolean;
  stages: Stage[];
}

interface scheduleStore {
  schedule: Schedule | null;
  setSchedule: (schedule: Schedule) => void;
  clearSchedule: () => void;
}

const useScheduleStore = create<scheduleStore>((set) => ({
  schedule: null,
  setSchedule: (schedule) => set({ schedule }),
  clearSchedule: () => set({ schedule: null }),
}));

export default useScheduleStore;

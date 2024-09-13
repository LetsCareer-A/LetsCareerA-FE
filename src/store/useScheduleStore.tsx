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

interface ScheduleStore {
  schedule: Schedule | null;
  selectedStageId: number | null; // 선택된 Stage의 ID
  selectedStageType: string | null; // 선택된 Stage의 type
  setSchedule: (schedule: Schedule) => void;
  clearSchedule: () => void;
  setSelectedStageId: (stageId: number | null) => void; // Stage ID 설정
  setSelectedStageType: (type: string | null) => void; // Stage type 설정
}

const useScheduleStore = create<ScheduleStore>((set) => ({
  schedule: null,
  selectedStageId: null,
  selectedStageType: null,
  setSchedule: (schedule) => set({ schedule }),
  clearSchedule: () => set({ schedule: null }),
  setSelectedStageId: (stageId) => set({ selectedStageId: stageId }),
  setSelectedStageType: (type) => set({ selectedStageType: type }), // type 설정 메소드 추가
}));

export default useScheduleStore;

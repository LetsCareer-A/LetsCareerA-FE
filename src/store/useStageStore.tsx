import create from 'zustand';
import { DropdownItem } from '../components/Dropdown';

interface ReadyState {
  type: string;
  date: string;
  status: string;
}

interface StageStore {
  selectedStage: DropdownItem | null; // 드롭다운에서 선택한 값
  setSelectedStage: (item: DropdownItem | null) => void;
  readyStates: ReadyState[]; // 배열로 관리하는 상태
  setReadyStates: (states: ReadyState[]) => void;
  addReadyState: (state: ReadyState) => void;
}

const useStageStore = create<StageStore>((set) => ({
  selectedStage: null,
  setSelectedStage: (item) => set({ selectedStage: item }),
  readyStates: [],
  setReadyStates: (states) => set({ readyStates: states }),
  addReadyState: (newState) =>
    set((currentState) => ({
      readyStates: [...currentState.readyStates, newState], // 올바른 타입으로 배열 추가
    })),
}));

export default useStageStore;

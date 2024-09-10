import create from 'zustand';
import { DropdownItem } from '../components/Dropdown';

interface StageStore {
  selectedStage: DropdownItem | null;
  setSelectedStage: (item: DropdownItem | null) => void;
  readyStates: {
    type: string;
    date: string;
  };
  setReadyStates: (states: { type: string; date: string }) => void;
}

const useStageStore = create<StageStore>((set) => ({
  selectedStage: null,
  setSelectedStage: (item) => set({ selectedStage: item }),
  readyStates: {
    type: '전형이 지정되지 않음', //기본값
    date: '날짜가 지정되지 않음', //기본값
  },
  setReadyStates: (states) => set({ readyStates: states }),
}));

export default useStageStore;

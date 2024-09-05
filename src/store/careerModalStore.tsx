import create from 'zustand';

interface CareerModalState {
  isModalOpen: boolean;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  selectedExperience: string | null;
  setIsModalOpen: (isOpen: boolean) => void;
  setTitle: (title: string) => void;
  setSituation: (situation: string) => void;
  setTask: (task: string) => void;
  setAction: (action: string) => void;
  setResult: (result: string) => void;
  setSelectedExperience: (experience: string | null) => void;
  resetState: () => void; 
}

export const useStore = create<CareerModalState>((set) => ({
  isModalOpen: false,
  title: '',
  situation: '',
  task: '',
  action: '',
  result: '',
  selectedExperience: null,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setTitle: (title) => set({ title }),
  setSituation: (situation) => set({ situation }),
  setTask: (task) => set({ task }),
  setAction: (action) => set({ action }),
  setResult: (result) => set({ result }),
  setSelectedExperience: (experience) => set({ selectedExperience: experience }),
  
  resetState: () =>
    set({
      title: '',
      situation: '',
      task: '',
      action: '',
      result: '',
      selectedExperience: null,
    }),
}));

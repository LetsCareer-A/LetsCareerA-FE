import create from 'zustand';

interface CareerModalStore {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  situation: string;
  setSituation: (situation: string) => void;
  task: string;
  setTask: (task: string) => void;
  action: string;
  setAction: (action: string) => void;
  result: string;
  setResult: (result: string) => void;
  selectedExperience: string | null; 
  setSelectedExperience: (experience: string | null) => void; 
}

export const useStore = create<CareerModalStore>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (open) => set({ isModalOpen: open }),
  title: '',
  setTitle: (title) => set({ title }),
  situation: '',
  setSituation: (situation) => set({ situation }),
  task: '',
  setTask: (task) => set({ task }),
  action: '',
  setAction: (action) => set({ action }),
  result: '',
  setResult: (result) => set({ result }),
  selectedExperience: null, 
  setSelectedExperience: (experience) => set({ selectedExperience: experience }),
}));

import create from 'zustand';

interface ModalState {
  companyName: string;
  jobTitle: string;
  setCompanyName: (name: string) => void;
  setJobTitle: (title: string) => void;
  isButtonDisabled: boolean;
  resetState: () => void; 
}

const useModalStore = create<ModalState>((set) => ({
  companyName: '',
  jobTitle: '',
  setCompanyName: (name: string) => set({ companyName: name }),
  setJobTitle: (title: string) => set({ jobTitle: title }),
  isButtonDisabled: false,
  resetState: () => set({ companyName: '', jobTitle: '' }),
}));


export const useModalStoreState = () => {
  const { companyName, jobTitle } = useModalStore.getState();
  const isButtonDisabled = !companyName || !jobTitle;
  return {
    isButtonDisabled,
  };
};

export default useModalStore;

import create from 'zustand';

interface ModalState {
  companyName: string;
  jobTitle: string;
  setCompanyName: (name: string) => void;
  setJobTitle: (title: string) => void;
  isButtonDisabled: boolean;
}

const useModalStore = create<ModalState>((set) => ({
  companyName: '',
  jobTitle: '',
  setCompanyName: (name: string) => set({ companyName: name }),
  setJobTitle: (title: string) => set({ jobTitle: title }),
  isButtonDisabled: false,
}));


export const useModalStoreState = () => {
  const { companyName, jobTitle } = useModalStore.getState();
  const isButtonDisabled = !companyName || !jobTitle;
  return {
    isButtonDisabled,
  };
};

export default useModalStore;

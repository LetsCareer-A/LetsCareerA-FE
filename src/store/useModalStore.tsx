import create from 'zustand';

interface ModalState {
  companyName: string;
  jobTitle: string;
  dropdownItem: string | null; 
  setCompanyName: (name: string) => void;
  setJobTitle: (title: string) => void;
  setDropdownItem: (item: string | null) => void; 
  isButtonDisabled: boolean;
  resetState: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  companyName: '',
  jobTitle: '',
  dropdownItem: null, 
  setCompanyName: (name: string) => set({ companyName: name }),
  setJobTitle: (title: string) => set({ jobTitle: title }),
  setDropdownItem: (item: string | null) => set({ dropdownItem: item }), 
  isButtonDisabled: false,
  resetState: () => set({ companyName: '', jobTitle: '', dropdownItem: null }),
}));

export const useModalStoreState = () => {
  const { companyName, jobTitle, dropdownItem } = useModalStore.getState();
  
  const isButtonDisabled = !companyName || !jobTitle || !dropdownItem;
  
  return {
    isButtonDisabled,
  };
};

export default useModalStore;

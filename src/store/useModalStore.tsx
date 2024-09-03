import create from 'zustand';

interface ModalState {
  companyName: string;
  jobTitle: string;
  dropdownItem: string | null;
  isCheckboxChecked: boolean;  
  setCompanyName: (name: string) => void;
  setJobTitle: (title: string) => void;
  setDropdownItem: (item: string | null) => void;
  setCheckboxChecked: (checked: boolean) => void; 
  isButtonDisabled: boolean;
  resetState: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  companyName: '',
  jobTitle: '',
  dropdownItem: null,
  isCheckboxChecked: false, 
  setCompanyName: (name: string) => set({ companyName: name }),
  setJobTitle: (title: string) => set({ jobTitle: title }),
  setDropdownItem: (item: string | null) => set({ dropdownItem: item }),
  setCheckboxChecked: (checked: boolean) => set({ isCheckboxChecked: checked }),  // 체크박스 상태 업데이트
  isButtonDisabled: false,
  resetState: () => set({ 
    companyName: '', 
    jobTitle: '', 
    dropdownItem: null,
    isCheckboxChecked: false,  
  }),
}));

export const useModalStoreState = () => {
  const { companyName, jobTitle, dropdownItem } = useModalStore.getState();

  const isButtonDisabled = !companyName || !jobTitle || !dropdownItem;

  return {
    isButtonDisabled,
  };
};

export default useModalStore;

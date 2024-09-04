import create from 'zustand';

interface ModalState {
  companyName: string;
  jobTitle: string;
  dropdownItem: string | null;
  isCheckboxChecked: boolean;  
  stageDetailInput: string;
  setCompanyName: (name: string) => void;
  setJobTitle: (title: string) => void;
  setDropdownItem: (item: string | null) => void;
  setCheckboxChecked: (checked: boolean) => void; 
  setStageDetailInput: (input: string) => void;
  isButtonDisabled: boolean;
  resetState: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  companyName: '',
  jobTitle: '',
  dropdownItem: null,
  isCheckboxChecked: false, 
  stageDetailInput: '',
  setCompanyName: (name: string) => set({ companyName: name }),
  setJobTitle: (title: string) => set({ jobTitle: title }),
  setDropdownItem: (item: string | null) => set({ dropdownItem: item }),
  setCheckboxChecked: (checked: boolean) => set({ isCheckboxChecked: checked }),  
  setStageDetailInput: (input: string) => set({ stageDetailInput: input }),
  isButtonDisabled: false,
  resetState: () => set({ 
    companyName: '', 
    jobTitle: '', 
    dropdownItem: null,
    isCheckboxChecked: false,  
    stageDetailInput: '',
  }),
}));

export const useModalStoreState = () => {
  const { companyName, jobTitle, dropdownItem, stageDetailInput } = useModalStore.getState();
  
  // '중간 전형(직접 입력)'일 때만 stageDetailInput을 체크
  const isButtonDisabled = !companyName || !jobTitle || !dropdownItem || (dropdownItem === '중간 전형(직접 입력)' && !stageDetailInput);

  return {
    isButtonDisabled,
  };
};

export default useModalStore;

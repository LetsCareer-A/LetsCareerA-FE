import create from 'zustand';

interface ModalState {
  companyName: string;
  jobTitle: string;
  dropdownItem: string | null;
  isCheckboxChecked: boolean;  
  stageDetailInput: string;
  link: string;
  date: Date | null;
  setCompanyName: (name: string) => void;
  setJobTitle: (title: string) => void;
  setDropdownItem: (item: string | null) => void;
  setCheckboxChecked: (checked: boolean) => void; 
  setStageDetailInput: (input: string) => void;
  setLink: (link: string) => void;
  setDate: (date: Date | null) => void; 
  isButtonDisabled: boolean;
  resetState: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  companyName: '',
  jobTitle: '',
  dropdownItem: null,
  isCheckboxChecked: false, 
  stageDetailInput: '',
  link: '',
  date: null, // 날짜 상태 초기화
  setCompanyName: (name: string) => set({ companyName: name }),
  setJobTitle: (title: string) => set({ jobTitle: title }),
  setDropdownItem: (item: string | null) => set({ dropdownItem: item }),
  setCheckboxChecked: (checked: boolean) => set({ isCheckboxChecked: checked }),  
  setStageDetailInput: (input: string) => set({ stageDetailInput: input }),
  setLink: (link: string) => set({ link }),
  setDate: (date: Date | null) => set({ date }), 
  isButtonDisabled: false,
  resetState: () => set({ 
    companyName: '', 
    jobTitle: '', 
    dropdownItem: null,
    isCheckboxChecked: false,  
    stageDetailInput: '',
    link: '',
    date: null,
  }),
}));

export const useModalStoreState = () => {
  const { companyName, jobTitle, dropdownItem, stageDetailInput, date } = useModalStore.getState();
  

  const isButtonDisabled = (dropdownItem === '중간 전형(직접 입력)' && !stageDetailInput) ||
    !date || 
    !companyName ||
    !jobTitle ||
    !dropdownItem; 

  return {
    isButtonDisabled,
  };
};

export default useModalStore;

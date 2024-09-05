// import { useState } from "react";
// import { PrimaryButton, SecondaryButton } from "../components/CustomButton"
// import Dropdown from "../components/Dropdown";
// import Modal from '../components/Modal';
// import { Button } from '@mui/material';
// import Chip from "../components/Chips";
// import Calendar from "./components/Calendar";
// import TodoList from "./components/Todo";
// import DetailList from "./components/DetailList";


// const handleItemClick = (item: string) => {
//     alert(`Clicked on ${item}`);
//   };





const index = () => {

  // const [isModalOpen, setModalOpen] = useState(false);

  // const handleOpenModal = () => {
  //   setModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // };

  // const handleConfirm = () => {
  //   console.log('확인 버튼 클릭');
  //   setModalOpen(false);
  // };


  return (
    <div>
    {/* <Calendar />
    <TodoList />
    <DetailList /> */}
        {/* <PrimaryButton>텍스트</PrimaryButton>
        <SecondaryButton>텍스트</SecondaryButton>
        <Dropdown 
        buttonText="드롭다운"
        items={[
          { text: 'Item 1', onClick: () => handleItemClick('Item 1') },
          { text: 'Item 2', onClick: () => handleItemClick('Item 2') },
          { text: 'Item 3', onClick: () => handleItemClick('Item 3') },
        ]}
      />
      <Button onClick={handleOpenModal} variant="contained" className="bg-blue-600 text-white">
        모달 열기
      </Button>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="모달 제목"
        confirmText="확인"
        onConfirm={handleConfirm}
      >
        모달 내용이 이곳에 들어갑니다.
      </Modal>
      <Chip text="텍스트" color="#1BC47D" /> */}
      {/* 컴포넌트 사용 예시 */}
    </div>
  )
}

export default index
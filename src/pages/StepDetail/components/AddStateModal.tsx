import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DropdownItem } from '../../../components/Dropdown';
import Modal from '../../../components/Modal';
import Chip from '../../../components/Chips';
import Label from '../../../components/Label';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import Dropdown from '../../../components/Dropdown';
import notebook from '../../../assets/notebook_white.png';
import useModalStore from '../../../store/useModalStore';
import chat from '../../../assets/chat.png';
import pencil from '../../../assets/pencil.png';
import CalendarInput from '../../../components/CalendarInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // CSS import

const items: DropdownItem[] = [
  { text: '서류 전형', color: `${colors.primary.normal}`, image: notebook },
  { text: '면접 전형', color: `${colors.secondary.normal}`, image: chat },
  { text: '중간 전형(직접 입력)', color: `${colors.neutral[20]}`, image: pencil },
];

const AddStateModal = ({ open, onClose }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { date, setDate } = useModalStore();

  const handleConfirm = () => {
    onClose(); // 모달 닫기
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="새로운 전형 추가"
      confirmText="추가하기"
      width="412px"
      height="auto" 
      onConfirm={handleConfirm}
    >
      <Box
        sx={{
          display: 'flex',
          width: '372px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '24px',
          overflow: 'hidden',
          marginTop : '20px',
          marginBottom: '20px'
        }}
      >
        {/* 전형 단계 박스 */}
        <Box display="flex" width={372} flexDirection="column" alignItems="flex-start" gap="8px">
          <Label label="전형단계" required={true} />
          {/* 전형 선택 드롭다운 */}
          <Dropdown
            buttonText="전형 단계를 선택해주세요."
            items={items}
            renderItem={(item) => (
              <Chip text={item.text as string} backgroundColor={item.color} sx={{ height: '24px', padding: '4px 8px', gap: '4px' }} />
            )}
            sx={{ width: '195px', height: '44px' }}
          />
        </Box>

        {/* 전형 일자 설정 */}
        <Box display="flex" width={372} flexDirection="column" alignItems="flex-start" gap="8px">
          {/* 일정 선택 데이피커 */}
          <Box>
            <Label label="지원 마감일 또는 전형 진행일" required={true} />
            <Box display="flex" alignItems="center" gap="8px" flexDirection="column" justifyContent="flex-end">
              <DatePicker
                selected={date}
                onChange={(date: Date | null) => setDate(date)}
                dateFormat="yyyy년 MM월 dd일"
                customInput={
                  <CalendarInput
                    value={date ? date.toLocaleDateString() : ''}
                    onClick={() => setStartDate(new Date())} // Update datePicker
                  />
                }
              />
            </Box>
            <Typography mt="4px" style={typography.xxSmallReg} color={colors.neutral[45]}>
              서류 준비중일 경우 지원 마감일을 <br />
              면접 또는 중간전형 준비 중일 경우 진행일을 입력해주세요.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddStateModal;

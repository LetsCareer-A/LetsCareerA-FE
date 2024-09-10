import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Dropdown from '../../../components/Dropdown';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import fileImage from '../../../assets/ill_file.png';
import interview from '../../../assets/intervew.png';
import workcheck from '../../../assets/workcheck.png';
import { DropdownItem } from '../../../components/Dropdown';

interface SupportStateProps {
  dropdownItems: DropdownItem[];
  selectedChip: DropdownItem | null;
  onDropdownSelect: (item: DropdownItem) => void;
}

// ReadyStates 타입 정의
interface ReadyStates {
  type: string; // 전형명 (예: '서류', '면접', '중간')
  date: string; // 날짜 (예: '24.08.30')
}

const ReadyState: React.FC<SupportStateProps> = ({ dropdownItems, onDropdownSelect }) => {
  const [readyStates, setReadyStates] = useState<ReadyStates>({
    type: '서류', // 초기 전형 상태
    date: '24.08.30', // 초기 날짜
  });

  // 전형 상태에 따른 이미지 반환 함수
  const getImageForStage = () => {
    switch (readyStates.type) {
      case '서류':
        return fileImage;
      case '중간':
        return workcheck;
      case '면접':
        return interview;
      default:
        return fileImage;
    }
  };

  const handleDropdownSelect = (item: DropdownItem) => {
    setReadyStates((prevState) => ({
      ...prevState,
      type: item.text, // 드롭다운에서 선택된 전형 상태로 업데이트
    }));
    onDropdownSelect(item); // 부모 컴포넌트의 선택 처리 함수 호출
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100px',
        paddingBottom: '4px',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        marginLeft: '23px',
        marginTop: '25px',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 100,
          height: 100,
          padding: '3px 3px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          bgcolor: colors.primary[80],
        }}
      >
        <img src={getImageForStage()} alt={readyStates.type} style={{ width: '100%', height: '100%' }} />
      </Box>
      
      <Typography color={colors.neutral[10]} style={typography.xSmallMed}>
        {readyStates.type} 전형
      </Typography>

      <Typography color={colors.neutral[40]} style={typography.xxSmallReg}>
        {readyStates.date}
      </Typography>

      <Dropdown
        buttonText="진행중"
        backgroundColor={colors.primary[10]}
        items={dropdownItems}
        renderItem={(item) => (
          <Typography
            style={typography.xSmall2Reg}
            color={colors.neutral[20]}
            sx={{
              width: '80px',
              padding: '8px',
              alignItems: 'flex-start',
              gap: '4px',
              '&:hover': {
                backgroundColor: colors.primary[20],
                borderRadius: '4px',
              },
            }}
          >
            {item.text}
          </Typography>
        )}
        onSelect={handleDropdownSelect}
        sx={{
          height: '28px',
          marginTop: '10px',
          color: `${colors.primary.normal}`,
          typography: `${typography.xSmall2Med}`,
        }}
      />
    </Box>
  );
};


export default ReadyState;

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Dropdown, { DropdownItem } from '../../../components/Dropdown';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import fileImage from '../../../assets/ill_file.png';
import AddIcon from '@mui/icons-material/Add';
import AddStateModal from './AddStateModal';
import useStageStore from '../../../store/useStageStore'; // 상태 관리 스토어 import

const Stateitems: DropdownItem[] = [
  { text: '진행중', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}` },
  { text: '진행완료', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}` },
  { text: '합격', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}` },
  { text: '불합격', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}` },
];

const StateGroup = () => {
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
        <img src={fileImage} style={{ width: '100%', height: '100%' }} />
      </Box>

      <Typography color={colors.neutral[10]} style={typography.xSmallMed}>
        전형 이름
      </Typography>

      <Typography color={colors.neutral[40]} style={typography.xxSmallReg}>
        날짜
      </Typography>

      <Dropdown
        buttonText="상태"
        backgroundColor={colors.primary[10]}
        items={Stateitems}
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

const ReadyState = () => {
  const [isAddStateModalOpen, setIsAddStateModalOpen] = useState(false);
  const { stages, setStages } = useStageStore(); // 상태 관리 스토어 사용

  const handleOpenAddStateModal = () => {
    setIsAddStateModalOpen(true);
  };

  const handleCloseAddStateModal = () => {
    setIsAddStateModalOpen(false);
  };

  const handleAddState = (newState: any) => {
    // 새로운 상태를 추가하는 로직
    console.log('Adding new state:', newState); // 디버깅용 로그 추가
    setStages([...stages, newState]); // 상태 업데이트
  };

  return (
    <Box width={'1043px'} height={'237px'} borderRadius={'12px'} border={`1px solid ${colors.neutral[85]}`} bgcolor={colors.neutral[100]}>
      <Box display={'inline-flex'} alignItems={'flex-start'} gap={'16px'}>
      {stages.map((state) => (
          <StateGroup key={state.stageId}/>
        ))}        <Box
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
            cursor: 'pointer',
          }}
          onClick={handleOpenAddStateModal} // onClick 이벤트 추가
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
              bgcolor: colors.primary[10],
            }}
          >
            <AddIcon width={'12px'} />
          </Box>
        </Box>
      </Box>

      {/* AddStateModal을 조건부로 렌더링 */}
      {isAddStateModalOpen && (
        <AddStateModal
          open={isAddStateModalOpen}
          onClose={handleCloseAddStateModal}
          onAddState={handleAddState} // 상태 추가 핸들러 전달
        />
      )}
    </Box>
  );
};

export default ReadyState;

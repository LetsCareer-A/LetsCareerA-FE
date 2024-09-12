import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Dropdown, { DropdownItem } from '../../../components/Dropdown';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import fileImage from '../../../assets/ill_file.png';
import AddIcon from '@mui/icons-material/Add';
import AddStateModal from './AddStateModal';

import useScheduleStore from '../../../store/useScheduleStore';

const Stateitems: DropdownItem[] = [
  { text: '진행중', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}` },
  { text: '진행완료', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}` },
  { text: '합격', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}` },
  { text: '불합격', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}` },
];

const StateGroup = ({ stage }: { stage: Stage }) => {
  const setSelectedStageId = useScheduleStore((state) => state.setSelectedStageId);
  const setSelectedStageType = useScheduleStore((state) => state.setSelectedStageType);

  const handleClick = () => {
    setSelectedStageId(stage.stageId);
    setSelectedStageType(stage.type);
  };
  return(
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
    onClick={handleClick}
  >
    <Box
      sx={{
        display: 'flex',
        width: 100,
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
      {stage.type === '중간' ? stage.mid_name : `${stage.type} 전형` }
    </Typography>


    <Typography color={colors.neutral[40]} style={typography.xxSmallReg}>
      {stage.date || '날짜'}
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
  )
};

const ReadyState = () => {
  const [isAddStateModalOpen, setIsAddStateModalOpen] = useState(false);
  const { schedule, setSchedule } = useScheduleStore(); // 스케줄 상태 가져오기

  console.log(schedule);

  const handleOpenAddStateModal = () => {
    setIsAddStateModalOpen(true);
  };

  const handleCloseAddStateModal = () => {
    setIsAddStateModalOpen(false);
  };

  const handleAddState = (newState: any) => {
    if (schedule) {
      setSchedule({
        ...schedule,
        stages: [...schedule.stages, newState],
      });
    }
  };


  return (
    <Box
      width="1043px"
      height="237px"
      borderRadius="12px"
      border={`1px solid ${colors.neutral[85]}`}
      bgcolor={colors.neutral[100]}
      sx={{ overflowX: 'auto' }}
      >
      <Box display={'inline-flex'} alignItems={'flex-start'} gap={'16px'}>
        {/* 스케줄의 단계(stages)를 반복 렌더링 */}
        {schedule?.stages.map((stage) => (
          <StateGroup key={stage.stageId} stage={stage} />
        ))}

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
          onAddState={handleAddState}
        />
      )}
    </Box>
  );
};

export default ReadyState;
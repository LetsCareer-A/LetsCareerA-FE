import { useState } from 'react';
import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import Dropdown, { DropdownItem } from '../../../components/Dropdown';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import fileImage from '../../../assets/ill_file.png';
import AddIcon from '@mui/icons-material/Add';
import AddStateModal from './AddStateModal';

import useScheduleStore from '../../../store/useScheduleStore';

const Stateitems = [
  { text: '진행중', color: colors.primary[20], textColor: colors.primary.normal },
  { text: '진행완료', color: colors.primary[20], textColor: colors.primary.normal },
  { text: '합격', color: colors.primary[20], textColor: colors.primary.normal },
  { text: '불합격', color: colors.primary[20], textColor: '#FF566A' },
];

const StateGroup = ({ stage }: { stage: Stage }) => {
  const [selectedState, setSelectedState] = useState('');

  const setSelectedStageId = useScheduleStore((state) => state.setSelectedStageId);
  const setSelectedStageType = useScheduleStore((state) => state.setSelectedStageType);

  const handleClick = () => {
    setSelectedStageId(stage.stageId);
    setSelectedStageType(stage.type);
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedState(event.target.value);
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
      overflowY: 'hidden',
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

    <FormControl sx={{ width: '100%', marginTop: '10px' }}>
      <Select
        value={selectedState || '진행중'} // selectedState가 없으면 '진행중'으로 설정
        onChange={handleChange}
        sx={{
          height: '28px',
          typography: typography.xSmall2Reg,
          textAlign: 'center', 
          background: selectedState == '불합격'? 'rgba(255, 86, 106, 0.10)': `${colors.primary[10]}`,
          color: selectedState == '불합격'? '#FF566A': `${colors.primary.normal }`,
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      >
        {Stateitems.map((item) => (
          <MenuItem
            key={item.text}
            value={item.text}
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              color: 'black',
              typography: typography.xSmall2Reg,
              '&:hover': {
                backgroundColor: `${item.color}80`, // 호버 시 배경색 약간 투명하게
                color: item.textColor,
              },
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
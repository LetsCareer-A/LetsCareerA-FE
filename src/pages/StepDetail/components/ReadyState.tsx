import { Box, Typography } from '@mui/material';
import Dropdown from '../../../components/Dropdown';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import fileImage from '../../../assets/ill_file.png';
import interview from '../../../assets/intervew.png';
import workcheck from '../../../assets/workcheck.png';
import { DropdownItem } from '../../../components/Dropdown';
import useStageStore from '../../../store/useStageStore';

// export interface ReadyStateProps {
//   type: string;
//   date: string;
//   status?: string;
// }

const Stateitems: DropdownItem[] = [
  { text: '진행중', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}`},
  { text: '진행완료', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}`},
  { text: '합격', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}`},
  { text: '불합격', color: `${colors.primary[10]}`, textColor: `${colors.primary.normal}`},
];



const ReadyState = () => {
  // const {readyStates, setReadyStates} = useStageStore();

  // // 전형 상태에 따른 이미지 반환 함수
  // const getImageForStage = () => {
  //   switch (readyStates.type) {
  //     case '서류':
  //       console.log(readyStates)
  //       return fileImage;
  //     case '중간':
  //       console.log("중간")
  //       return workcheck;
  //     case '면접':
  //       console.log("면접")
  //       return interview;
  //     default:
  //       console.log("기본")
  //       return fileImage;
  //   }
  // };

  const handleDropdownSelect = (item: DropdownItem) => {
    // console.log(readyStates);
  
    // // 상태를 직접 객체로 업데이트
    // setReadyStates({
    //   ...readyStates, // 기존 readyStates 상태 유지
    //   status: item.text, // 드롭다운에서 선택된 상태로 업데이트
    // });
    
    // console.log(readyStates);
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
        <img src={fileImage} style={{ width: '100%', height: '100%' }} />
      </Box>
      
      <Typography color={colors.neutral[10]} style={typography.xSmallMed}>
        전형 이름
      </Typography>

      <Typography color={colors.neutral[40]} style={typography.xxSmallReg}>
        날짜
      </Typography>

      <Dropdown
        buttonText='상태'
        backgroundColor={colors.primary[10]}
        items={Stateitems}
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

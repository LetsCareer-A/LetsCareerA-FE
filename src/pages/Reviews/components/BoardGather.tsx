import { Box, Typography, Stack } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import Chip from '../../../components/Chips'; 
import Chart from '../../../assets/chart.svg';
import Commuincation from '../../../assets/communication.svg';
import { NormalButton } from '../../../components/CustomButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

interface Review {
  type: string;
  freeReview: string;
  isReviewed: boolean;
}

interface BoardGatherProps {
  company: string;
  department: string;
  reviews: Review[];
  onClick: () => void; // 클릭 핸들러 추가
}

const BoardGather: React.FC<BoardGatherProps> = ({ company, department, reviews, onClick }) => {
  const getChipIcon = (type: string) => {
    if (type === '면접 회고') {
      return Commuincation; 
    } else if (type === '중간 전형 회고') {
      return Chart; 
    }
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
    // 버튼 클릭 시 동작을 정의합니다.
    alert('리뷰를 작성하려면 이 버튼을 클릭하세요!');
  };

  return (
    <Box 
      onClick={onClick} // 클릭 핸들러 연결
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '337px',          
        height: '670px',         
        padding: '16px',
        border: '1px solid #EFEFEF',
        borderRadius: '12px',
        background: 'white',
        cursor: 'pointer' // 클릭 가능한 느낌을 주기 위해
      }}
    >
      {/* 회사 이름 및 부서 */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginBottom: '16px' }}>
        <Typography sx={typography.small2Bold}>{company}</Typography>
        <Typography sx={typography.small2Bold}> | </Typography> 
        <Typography sx={typography.small2Bold}>{department}</Typography>
      </Box>

      {/* 회고 상태 리스트 */}
      <Stack spacing={2}>
        {reviews.map((review, index) => (
          <Box 
            key={index} 
            sx={{
              display: 'flex', // Flexbox 레이아웃 설정
              flexDirection: 'column',
              gap: '12px',
              border: `1px solid ${review.type === '면접 회고' ? colors.secondary[20] : colors.neutral[85]}`,
              borderRadius: '8px',                             
              backgroundColor: review.type === '면접 회고' ? 'rgba(27, 196, 125, 0.05)' : colors.neutral[95],           
              padding: '12px 12px',                            
            }}
          >
            <Box sx={{ flexDirection:'column'}}>
              <Chip 
                text={review.type}
                backgroundColor={review.type === '면접 회고' ? '#1bC47d' : colors.neutral[20]} 
                textColor="#FFFFFF"
                image={getChipIcon(review.type)} 
                imageWidth='16px'
              />  
              <Typography display='flex' mt='12px' alignItems='center' sx={{ typography: typography.xxSmall2, color: colors.neutral[35] }}>
                {review.freeReview}
              </Typography>
            </Box>

            {!review.isReviewed && (
              <NormalButton
                onClick={handleButtonClick} 
                width="100%" 
                padding="4px"
              >
                회고 작성하기
                <CreateOutlinedIcon sx={{ width: '16px', color: colors.primary.normal }} />
              </NormalButton>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default BoardGather;

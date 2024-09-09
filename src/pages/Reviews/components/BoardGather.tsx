import { Box, Typography, Stack } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import Chip from '../../../components/Chips'; 
import Chart from '../../../assets/chart.svg';
import Commuincation from '../../../assets/communication.svg';

interface Review {
  type: string;
  freeReview: string;
}

interface BoardGatherProps {
  company: string;
  department: string;
  reviews: Review[];
}

const BoardGather: React.FC<BoardGatherProps> = ({ company, department, reviews }) => {
  const getChipIcon = (type: string) => {
    if (type === '면접 회고') {
      return Commuincation; 
    } else if (type === '중간 전형 회고') {
      return Chart; 
    }
  };
  

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '337px',          
        height: '670px',         
        padding: '16px',
        border: '1px solid #EFEFEF',
        borderRadius: '12px',
        background: 'white'
      }}
    >
      {/* 회사 이름 및 부서 */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginBottom: '16px' }}>
        <Typography style={typography.small2Bold}>{company}</Typography>
        <Typography style={typography.small2Bold}> | </Typography> 
        <Typography style={typography.small2Bold}>{department}</Typography>
      </Box>

      {/* 회고 상태 리스트 */}
      <Stack spacing={2}>
        {reviews.map((review, index) => (
          <Box 
            key={index} 
            sx={{
              border: `1px solid ${review.type === '면접 회고' ? colors.secondary[20] : colors.neutral[85]}`,
              borderRadius: '8px',                             
              backgroundColor: review.type === '면접 회고' ? 'rgba(27, 196, 125, 0.05)' : colors.neutral[95],           
              padding: '12px 12px',                            
            }}
          >
            <Box >
              <Chip 
              text={review.type}
              backgroundColor={review.type === '면접 회고' ? '#1bC47d' : colors.neutral[20]} 
              textColor="#FFFFFF"
              image={getChipIcon(review.type)} 
              imageWidth='16px'
            />            
            </Box>
            <Typography display='flex' alignItems='center' sx={{ typography: typography.xxSmall2, color: colors.neutral[35], marginTop: '12px'}}>
              {review.freeReview}
            </Typography>  


          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default BoardGather;

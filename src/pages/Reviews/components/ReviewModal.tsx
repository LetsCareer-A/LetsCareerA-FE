import { Box, Typography, Stack, IconButton } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import CloseIcon from '@mui/icons-material/Close';

interface Review {
  type: string;
  freeReview: string;
}

interface CompanyData {
  company: string;
  department: string;
  reviews: Review[];
}
interface ReviewModalProps {
  companyData: CompanyData | null;
  handleClose: () => void;
}



const ModalStyle = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <Box 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'start', 
        gap: '6px', 
        alignSelf: 'stretch'
      }}
    >
      <Typography color={colors.neutral[20]} style={typography.xSmallSemiBold}>
        {question}
      </Typography>
      <Typography color={colors.neutral[40]} style={typography.xSmallMed}>
        {answer}
      </Typography>
    </Box>
  );
};

const ReviewModal: React.FC<ReviewModalProps> = ({ companyData, handleClose }) => {
  if (!companyData) return null;

  return (
    <Box 
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 632,
        height: 658,
        bgcolor: '#FFF',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
        gap: '32px',
      }}
    >
      <Box sx={{ gap: '2px', position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            id="modal-title" 
            style={typography.medium2Bold} 
            component="h2" 
            color={colors.neutral[10]}
          >
            {companyData.company} {companyData.department} 중간전형 회고
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ width: 24, height: 24, color: colors.neutral[40] }} />
          </IconButton>
        </Box>
        <Typography 
          id="modal-description" 
          style={typography.xxSmallReg} 
          color={colors.neutral[40]} 
          sx={{ mt: 1 }}
        >
          2024년 08월 21일에 진행된 중간 전형에 대한 회고입니다.
        </Typography>
      </Box>
  
      <Stack 
        spacing={2} 
        sx={{ 
          gap: '32px', 
          display: 'flex', 
          width: 592, 
          flexDirection: 'column', 
          alignItems: 'start',
          marginTop: '32px',
        }}
      >
        {companyData.reviews.map((review, index) => (
          <ModalStyle 
            key={index} 
            question={review.type} 
            answer={review.freeReview} 
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ReviewModal;

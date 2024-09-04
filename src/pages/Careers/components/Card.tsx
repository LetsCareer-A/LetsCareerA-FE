import {  Typography,  CardContent, Box } from '@mui/material';
import colors from '../../../styles/colors';


const Card = ({ title }: { title: string }) => (
  <Box sx={{ maxWidth: 300, background: colors.neutral[95], borderRadius: '8px' }}>
    <CardContent>
      <Typography variant="h6" color={colors.neutral[10]}>
        {title}
      </Typography>
    </CardContent>
  </Box>
);

// 샘플 카드 데이터
const cardData = Array.from({ length: 30 }, (_, index) => `Card ${index + 1}`);

export default Card;
import { Typography, Box } from '@mui/material';
import colors from '../../../styles/colors';
import Chip from '../../../components/Chips';
import typography from '../../../styles/typography';

interface CardProps {
  chipText: string;
  chipBackgroundColor: string;
  chipTextColor: string;
  title: string;
  summary: string;
}

const Card: React.FC<CardProps> = ({ chipText, chipBackgroundColor, chipTextColor, title, summary }) => (
  <Box sx={{ width: '337px', background: 'white', borderRadius: '12px', padding: '12px' }}>
      <Chip 
        text={chipText} 
        backgroundColor={chipBackgroundColor} 
        textColor={chipTextColor}
      />
      <Typography style={typography.small2Bold} color={colors.neutral[10]} mt="8px">
        {title}
      </Typography>
      <Typography 
        style={typography.xSmall2Reg}
        color={colors.neutral[60]} 
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 1
        }}
      >
        {summary}
      </Typography>
  </Box>
);

export default Card;

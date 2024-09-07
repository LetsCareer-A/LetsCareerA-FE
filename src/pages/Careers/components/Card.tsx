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
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ chipText, chipBackgroundColor, chipTextColor, title, summary, onClick }) => (
  <Box 
    sx={{ 
      width: '337px', 
      height:'104px',
      background: 'white', 
      borderRadius: '12px', 
      padding: '12px',
      cursor: 'pointer', 
      '&:hover': {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
      }
    }}
    onClick={onClick}
  >
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

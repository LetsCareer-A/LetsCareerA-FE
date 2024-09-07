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

const Card: React.FC<CardProps> = ({ chipText, chipBackgroundColor, chipTextColor, title, summary, onClick }) => {
  const getChipColors = (text: string) => {
    switch (text) {
      case '대외활동':
        return {
          backgroundColor: 'rgba(81, 119, 255, 0.10)',
          textColor: '#5177FF'
        };
      case '실무':
        return {
          backgroundColor: ' rgba(255, 86, 106, 0.10)',
          textColor: '#FF566A'
        };
      case '공모전':
        return {
          backgroundColor: colors.secondary[10],
          textColor: colors.secondary.normal,
        };
      case '프로젝트':
        return {
          backgroundColor: colors.primary[10],
          textColor: colors.primary.normal
        };
      case '자격증':
        return {
          backgroundColor: 'rgba(255, 143, 81, 0.15)',
          textColor: '#FF8F51'
        };
      case '기타':
        return {
          backgroundColor: colors.neutral[90],
          textColor:  colors.neutral[20],
        };
      default:
        return {
          backgroundColor: chipBackgroundColor,
          textColor: chipTextColor
        };
    }
  };

  const { backgroundColor, textColor } = getChipColors(chipText);

  return (
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
        backgroundColor={backgroundColor} 
        textColor={textColor}
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
};

export default Card;

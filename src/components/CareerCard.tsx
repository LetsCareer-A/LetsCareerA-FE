import { Box, Checkbox, Typography } from "@mui/material";
import Chip from "./Chips";
import colors from "../styles/colors";
import typography from "../styles/typography";

interface CareerCardProps {
  chipText: string;
  title: string;
  description: string;
  isSelected: boolean;
  onCardClick: () => void;
}

const CareerCard: React.FC<CareerCardProps> = ({ chipText, title, description, isSelected, onCardClick }) => {
  return (
    <Box 
      width='301px' 
      mb='8px'
      p='12px' 
      sx={{
        borderRadius: '12px', 
        border: `1px solid ${isSelected ? colors.primary[30] : colors.neutral[85]}`, 
        background: isSelected ? colors.primary[10] : colors.neutral[95], 
        boxShadow: '0px 0px 29px 0px rgba(0, 0, 0, 0.04)', 
        position: 'relative',
        cursor: 'pointer'
      }}
      onClick={onCardClick}
    >
      <Box display='flex' justifyContent='space-between' mb='8px'>
        <Chip text={chipText} />
        <Checkbox
          checked={isSelected}
          sx={{
            position: 'absolute',
            top: '5px',
            right: '12px'
          }}
        />
      </Box>
      <Box>
        <Typography style={typography.small2Bold}>{title}</Typography>
        <Typography 
          style={typography.xSmall2Reg}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default CareerCard;
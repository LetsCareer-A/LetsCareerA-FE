import { useState } from 'react';
import { Box, Checkbox, Typography } from "@mui/material";
import Chip from "./Chips";
import colors from "../styles/colors";
import typography from "../styles/typography";

interface CareerCardProps {
  chipText: string;
  title: string;
  description: string;
}

const CareerCard: React.FC<CareerCardProps> = ({ chipText, title, description }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(prevChecked => !prevChecked);
  };

  return (
    <Box 
      width='301px' 
      mb='8px'
      p='12px' 
      sx={{
        borderRadius: '12px', 
        border: `1px solid ${checked ? colors.primary[30] : colors.neutral[85]}`, 
        background: checked ? colors.primary[10] : colors.neutral[95], 
        boxShadow: '0px 0px 29px 0px rgba(0, 0, 0, 0.04)', 
        position: 'relative'
      }}
    >
      <Box display='flex' justifyContent='space-between' mb='8px'>
        <Chip text={chipText} />
        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
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

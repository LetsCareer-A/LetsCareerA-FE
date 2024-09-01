import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import colors from '../styles/colors';
import typography from '../styles/typography';

const StyledChip = styled('div')<{ backgroundColor?: string }>(({ backgroundColor }) => ({
  display: 'inline-flex',
  height: '28px',
  padding: '4px 12px 3px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,
  borderRadius: '6px',
  backgroundColor: backgroundColor || '#1BC47D', // 기본 색상
  color: '#FFF',
}));

interface ChipProps {
  text: string;
  backgroundColor?: string;
  textColor?: string; 
}

const Chip: React.FC<ChipProps> = ({ text, backgroundColor, textColor }) => {
  return (
    <StyledChip backgroundColor={backgroundColor}>
      <Typography 
      sx={{ 
        color: textColor || colors.system.PositiveBlue, 
        ...typography.xxSmall2
      }}
>
        {text}
      </Typography>
    </StyledChip>
  );
};

export default Chip;

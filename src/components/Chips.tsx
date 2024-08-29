import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';


const StyledChip = styled('div')(({  color }) => ({
  display: 'inline-flex',
  height: '28px',
  padding: '4px 12px 3px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,
  borderRadius: '6px',
  backgroundColor: color || '#1BC47D', // 기본 색상
  color: '#FFF',
}));

interface ChipProps {
  text: string;
  color?: string; 
}

const Chip: React.FC<ChipProps> = ({ text, color }) => {
  return (
    <StyledChip color={color}>
      <Typography variant="body2">{text}</Typography>
    </StyledChip>
  );
};

export default Chip;

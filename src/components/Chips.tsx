import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
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
  backgroundColor: backgroundColor || '#1BC47D', 
  color: '#FFF',
}));

interface ChipProps {
  text: string;
  backgroundColor?: string;
  textColor?: string; 
  image?: string; 
  imageWidth?: string; // Add imageWidth prop
  imageHeight?: string; // Add imageHeight prop
}

const Chip: React.FC<ChipProps> = ({ text, backgroundColor, textColor, image, imageWidth = '20px', imageHeight = '20px' }) => {
  return (
    <StyledChip backgroundColor={backgroundColor}>
      {image && <img src={image} alt={text} style={{ width: imageWidth, height: imageHeight }} />} 
      <Typography 
        sx={{ 
          color: textColor || 'white',
          ...typography.xxSmall2,
        }}
      >
        {text}
      </Typography>
    </StyledChip>
  );
};

export default Chip;

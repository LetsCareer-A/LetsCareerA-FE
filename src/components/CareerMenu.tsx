import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";
import Delete from '../assets/delete.svg';
import typography from "../styles/typography";
import { PrimaryButton } from "./CustomButton";

const CareerMenu = () => {
  const [isVisible, setIsVisible] = useState(true); 
  const [isSliding, setIsSliding] = useState(false); 

  const handleClose = () => {
    setIsSliding(true); 
    setTimeout(() => {
      setIsVisible(false); 
    }, 300); 
  };

  if (!isVisible) return null; 

  return (
    <Box 
      padding='20px 40px'
      sx={{
        position: 'fixed',
        top: '0', 
        left: 0,
        width: '381px',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1000, 
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transform: isSliding ? 'translateX(-100%)' : 'translateX(0)', 
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <Box display='flex' justifyContent='space-between'>
        <Typography style={typography.smallBold}>
          어필할 커리어
        </Typography>
        <img 
          src={Delete} 
          alt="Delete" 
          style={{ cursor: 'pointer' }} 
          onClick={handleClose} 
        />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '381px',
          height: '132px',
          padding: '20px 40px 68px 40px',
          backgroundColor: '#FFF',
          boxShadow: '0px 16px 20px rgba(0, 0, 0, 0.12), 0px 8px 16px rgba(0, 0, 0, 0.08), 0px 0px 8px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <PrimaryButton sx={{ width: '100%' }}>
          어필할 커리어 추가 완료하기
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default CareerMenu;

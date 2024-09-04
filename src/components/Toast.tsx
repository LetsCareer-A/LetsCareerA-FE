import React, { useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import typography from '../styles/typography';

interface ToastProps {
  message: string;
  description: string;
  onClose: () => void;
}

const Toast = ({ message, description, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [onClose]);

  return (
    <Box
      sx={{
        position: 'fixed', 
        top: 102,      
        left: '50%',
        transform: 'translateX(-50%)', 
        width: 848,
        height: 80,
        padding: '16px 20px',
        backgroundColor: '#2a2d34',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1300, 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5, 
        }}
      >
        <CheckCircleIcon
          sx={{
            width: 36,
            height: 36,
            color: '#757BFF',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            component="div"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'Pretendard',
              lineHeight: '1.75',
            }}
            style={typography.smallBold}
          >
            {message}
          </Typography>
          <Typography 
            sx={{
              color: 'white',
              fontFamily: 'Pretendard',
              lineHeight: '1.5',
            }}
            style={typography.small2Reg}
          >
            {description}
          </Typography>
        </Box>
      </Box>
      <IconButton
        sx={{
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
        }}
        onClick={onClose}
      >
        <CloseIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
};

export default Toast;

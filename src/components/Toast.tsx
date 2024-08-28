import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MoreHoriz } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const Toast = () => {
  return (
    <Box
      sx={{
        position: 'fixed', // 화면에 고정
        top: 102,       // 화면 하단에서 20px 떨어진 위치
        left: '50%',      // 화면 중앙에 위치
        transform: 'translateX(-50%)', // 중앙 정렬을 위한 이동
        width: 848,
        height: 80,
        padding: '16px 20px',
        backgroundColor: '#2a2d34',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1300, // 기본 MUI zIndex보다 높게 설정하여 오버레이가 항상 위에 보이도록 함
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5, // gap-4
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
            gap: 0.5, // gap-0.5
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'Pretendard',
              lineHeight: '1.75', // leading-7
            }}
          >
            ‘네이버클라우드 UX리서처’ 중간 전형에 대한 회고를 완료했어요!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              fontFamily: 'Pretendard',
              lineHeight: '1.5', // leading-snug
            }}
          >
            조금 더 성장에 한 걸음 가까워졌어요 :
          </Typography>
        </Box>
      </Box>
      <IconButton
        sx={{
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
        }}
      >
        <CloseIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
};

export default Toast;

import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import Chip from '../../../components/Chips'; 

const BoardGather = ({ company, department, reviews }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '337px',          
        height: '670px',         
        padding: '16px',
        border: '1px solid #EFEFEF',
        borderRadius: '12px',
        background: colors.neutral[100]
      }}
    >
      {/* 회사 이름 및 부서 */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginBottom: '16px' }}>
        <Typography sx={{ typography: typography.small2Bold }}>{company}</Typography>
        <Typography sx={{ typography: typography.small2Bold }}> | </Typography> 
        <Typography sx={{ typography: typography.small2Bold }}>{department}</Typography>
      </Box>

      {/* 회고 상태 리스트 */}
      <Stack spacing={2}>
        {reviews.map((review, index) => (
          <Box 
            key={index} 
            sx={{
              border: `1px solid ${review.type === '면접 회고' ? colors.secondary[20] : colors.neutral[85]}`,
              borderRadius: '8px',                             
              backgroundColor: review.type === '면접 회고' ? 'rgba(27, 196, 125, 0.05)' : colors.neutral[95],  // 조건부 배경색 설정              
              padding: '12px 12px',                            
            }}
          >
            <Chip 
              text={review.type}
              backgroundColor={review.type === '면접 회고' ? '#1bC47d' : colors.neutral[20]} // 조건부 배경색 설정
              textColor="#FFFFFF"                               
            />
            <Typography sx={{ typography: typography.xxSmall2, color: colors.neutral[35], marginTop: '12px'}}>
              {review.freeReview}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default BoardGather;

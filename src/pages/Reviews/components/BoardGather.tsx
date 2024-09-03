import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import Chip from '/Users/l_yesme/Desktop/LetsCareerA-FE/src/components/Chips.tsx'; // Chip 컴포넌트를 import합니다.

const BoardGather = ({ company, department, reviews }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '337px',          // 넓이 설정
        height: '670px',         // 높이 설정
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
              border: `1px solid ${colors.neutral[85]}`,        // 테두리 색상 설정
              borderRadius: '8px',                              // 둥근 테두리 설정
              background: `${colors.neutral[95]}`,              // 배경 색상 설정
              padding: '12px 12px',                             // 패딩 설정
            }}
          >
            <Chip 
              text={review.type}
              backgroundColor={colors.neutral[20]} 
              textColor="#FFFFFF"                                  // Chip의 텍스트 색상 설정
            />
            <Typography sx={{ typography: typography.xxSmall2, color: colors.neutral[50], marginTop: '12px'}}>
              {review.freeReview}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default BoardGather;

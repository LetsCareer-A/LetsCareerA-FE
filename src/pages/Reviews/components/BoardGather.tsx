import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors'
import Chip from '/Users/l_yesme/Desktop/LetsCareerA-FE/src/components/Chips.tsx';

const BoardGather = ({ company, department, reviews }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
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
        {reviews.map((index, review) => (
          <Box 
            key={index} 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px',
              backgroundColor: colors.neutral[0],
              borderRadius: '8px',
              border: '1px solid #EFEFEF',
              gap: '8px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Chip text={review.title} backgroundColor={review.color} />
              <Box sx={{ flexGrow: 1 }} /> {/* Spacing */}
              <Typography sx={{ color: colors.neutral[50], typography: typography.xxSmall2 }}>
                &#x27A4;
              </Typography>
            </Box>
            <Typography sx={{ typography: typography.xxSmall2, color: colors.neutral[50] }}>
              {review.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default BoardGather;

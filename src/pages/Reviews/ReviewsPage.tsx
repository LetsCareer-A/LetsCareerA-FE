import React from 'react';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import { Box, Typography, Stack, Pagination } from '@mui/material';
import Chip from '/Users/l_yesme/Desktop/LetsCareerA-FE/src/components/Chips.tsx'; // Chip 컴포넌트를 import합니다.

const BoardGather = () => {
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
        <Typography sx={{ typography: typography.small2Bold }}>네이버클라우드</Typography>
        <Typography sx={{ typography: typography.small2Bold }}> | </Typography> 
        <Typography sx={{ typography: typography.small2Bold }}>UX리서치</Typography>
      </Box>

      {/* 회고 상태 리스트 */}
      <Stack spacing={2}>
        <Box>
          <Chip text="중간 전형 회고" backgroundColor={colors.neutral[80]} textColor="#FFF" />
          <Typography sx={{ typography: typography.xxSmall2, color: colors.neutral[50] }}>
            2024년 08월 21일에 진행된 중간 전형입니다.
          </Typography>
        </Box>
        <Box>
          <Chip text="면접 회고" backgroundColor={colors.system.PositiveBlue} textColor="#FFF" />
          <Typography sx={{ typography: typography.xxSmall2, color: colors.neutral[50] }}>
            2024년 08월 21일에 진행된 면접입니다.
          </Typography>
        </Box>
        {/* 추가 회고 리스트를 여기에 추가하세요 */}
      </Stack>
    </Box>
  );
}

const ReviewPage = () => {
  return (
    <Box sx={{ width: '100%', padding: '16px' }}>
      {/* 페이지 상단의 제목 및 설명 */}
      <Stack spacing={4}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '384px',
            height: '32px',
            marginTop: '110px',
            marginLeft: '317px',
            gap: '16px'
          }}
        >
          <Typography sx={{ typography: typography.mediumBold }}>회고마스터</Typography>
          <Typography sx={{ typography: typography.small2Reg, color: colors.neutral[40] }}>
            기업별로 진행한 회고를 볼 수 있어요
          </Typography>
        </Box>

        {/* 회고록 박스 나열 */}
        <Stack direction="row" flexWrap="wrap">
          <Box>
            <BoardGather />
            {/* 필요시 다른 BoardGather 컴포넌트도 추가하세요 */}
          </Box>
        </Stack>
      </Stack>

      {/* 페이지 네이션 중앙 정렬 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
        <Pagination
          count={5}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '14px',
              alignItems: 'center',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ReviewPage;

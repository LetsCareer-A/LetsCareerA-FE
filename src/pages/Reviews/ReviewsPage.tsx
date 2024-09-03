import React from 'react';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import { Box, Typography, Stack, Pagination } from '@mui/material';
import Chip from '/Users/l_yesme/Desktop/LetsCareerA-FE/src/components/Chips.tsx';
import BoardGather from './components/BoardGather';


const ReviewPage = () => {
  const company = [
    { company: '네이버', department: 'UI 엔지니어', reviews: [{ type: '중간 전형 회고', freeReview: '이 회사의 UI 엔지니어는 매우 만족스럽습니다.' }] },
    { company: '삼성', department: '프론트엔드', reviews: [{ type: '면접 회고', freeReview: '프론트엔드 개발 환경이 불편했습니다.' }] },
    { company: '엘지', department: '백엔드', reviews: [{ type: '중간 전형 회고', freeReview: '백엔드 업무가 매우 힘들었습니다.' }] }
  ];

  return (
    <Box sx={{ width: '100%', padding: '40px' }}>
      {/* 페이지 상단의 제목 및 설명 */}
      <Stack spacing={4}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '32px',
            marginTop: '40px',
            marginLeft: '40px',
            gap: '16px'
          }}
        >
          <Typography sx={{ typography: typography.mediumBold, marginLeft: '12px' }}>회고마스터</Typography>
          <Typography sx={{ typography: typography.small2Reg, color: colors.neutral[40] }}>
            기업별로 진행한 회고를 볼 수 있어요
          </Typography>
        </Box>

        {/* 회고록 박스 나열 */}
        <Stack direction="row" spacing={2}>
          {company.map((item, index) => (
            <BoardGather
              key={index}
              company={item.company}
              department={item.department}
              reviews={item.reviews}
            />
          ))}
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

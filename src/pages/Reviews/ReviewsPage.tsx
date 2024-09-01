import React from 'react';
import { Box, Typography, Grid, Card, CardContent, IconButton, Pagination } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const ReviewPage = () => {
  // Sample data
  const reviews = [
    {
      company: '네이버클라우드 | UX리서처',
      items: [
        { type: '중간 전형 회고', date: '2024년 08월 21일', color: '#424242' },
        { type: '면접 회고', date: '2024년 08월 21일', color: '#1BC47D' },
      ],
    },
    {
      company: '우아한형제들 | 프로덕트디자이너',
      items: [
        { type: '중간 전형 회고', date: '2024년 08월 21일', color: '#424242' },
      ],
    },
    {
      company: '비바리퍼블리카 | Product Designer',
      items: [
        { type: '중간 전형 회고', date: '2024년 08월 21일', color: '#424242' },
        { type: '면접 회고', date: '2024년 08월 21일', color: '#1BC47D' },
      ],
    },
  ];

  return (
    <Box sx={{ padding: '24px' }}>
      {/* 상단 텍스트 */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        나의 성장을 위한 회고
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        기업 별로 진행한 회고를 볼 수 있어요
      </Typography>

      {/* 그리드 컨테이너 */}
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined" sx={{ borderRadius: '12px' }}>
              <CardContent>
                {/* 회사 이름 */}
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {review.company}
                </Typography>
                {/* 회고 항목들 */}
                {review.items.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: item.color === '#424242' ? '#F2F2F2' : '#E6FAF0',
                      borderRadius: '8px',
                      padding: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <IconButton sx={{ color: item.color }}>
                      {item.color === '#424242' ? <AccessTimeIcon /> : <ChatBubbleOutlineIcon />}
                    </IconButton>
                    <Box sx={{ flexGrow: 1, paddingLeft: '8px' }}>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: item.color }}>
                        {item.type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.date}에 진행된 {item.type}입니다.
                      </Typography>
                    </Box>
                    <IconButton sx={{ color: '#9E9E9E' }}>
                      <Typography>&gt;</Typography>
                    </IconButton>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 페이지네이션 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
        <Pagination count={5} color="primary" />
      </Box>
    </Box>
  );
};

export default ReviewPage;

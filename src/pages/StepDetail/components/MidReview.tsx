// MidReview.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import ReviewQuestion from './ReviewQuestion';
import UploadReview from './UploadReview';
import { getMidReviewData } from '../../../api/StepDetail/getMidReviewData'; // 중간 전형 단계 API 호출 함수 import

interface MidReviewProps {
  scheduleId: number;
  stageId: number;
}

const MidReview: React.FC<MidReviewProps> = ({ scheduleId, stageId }) => {
  const [reviewAvailable, setReviewAvailable] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchMidReviewData = async () => {
      try {
        const response = await getMidReviewData(scheduleId, stageId);
        if (response.data.reviewAvailable) {
          setReviewAvailable(true);
          setReviews([response.data.review]);
        } else {
          setReviewAvailable(false);
        }
      } catch (error) {
        console.error('Failed to fetch mid review data:', error);
      }
    };

    fetchMidReviewData();
  }, [scheduleId, stageId]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" gap="16px">
      <Box display="flex" flexDirection="row" gap="16px" alignItems="center">
        <Typography color={colors.neutral[10]} style={typography.smallBold}>
          회고보기
        </Typography>
        <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
          {reviewAvailable ? '작성된 회고를 확인해보세요.' : '아직 회고를 진행하지 않았어요.'}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '702px',
          height: '302px',
          borderRadius: '8px',
          border: `1px solid ${colors.neutral[85]}`,
          bgcolor: colors.neutral[100],
          overflowY: 'auto',
        }}
      >
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'32px'} padding={'15px 24px'}>
          {reviewAvailable ? (
            reviews.map((review) => (
              <ReviewQuestion key={review.reviewId} review={review} />
            ))
          ) : (
            <UploadReview />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MidReview;

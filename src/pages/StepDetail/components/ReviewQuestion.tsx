// ReviewQuestion.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

interface ReviewQuestionProps {
  review?: {
    qa: string;
    feel: string;
  };
}

const ReviewQuestion: React.FC<ReviewQuestionProps> = ({ review }) => {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'6px'} alignSelf={'stretch'}>
      <Typography color={colors.neutral[10]} style={typography.smallBold}>
        {review ? `질문: ${review.qa}` : '작성된 회고를 확인해보세요.'}
      </Typography>
      <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
        {review ? `느낀점: ${review.feel}` : ''}
      </Typography>
    </Box>
  );
};

export default ReviewQuestion;

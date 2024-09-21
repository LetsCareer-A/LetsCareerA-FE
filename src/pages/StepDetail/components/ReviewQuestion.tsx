import React from 'react';
import { Box, Typography } from '@mui/material';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

interface ReviewQuestionProps {
  review: any;
  stageType: '중간' | '면접';
}

const ReviewQuestion: React.FC<ReviewQuestionProps> = ({ review, stageType }) => {
  return (
    <Box display="flex" flexDirection="column" gap="6px" alignSelf="stretch">
      {stageType === '중간' ? (
        <>
          <Typography color={colors.neutral[10]} style={typography.smallBold}>
            목표: {review?.goal || '정보 없음'}
          </Typography>
          <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
            느낀점: {review?.free_review || '정보 없음'}
          </Typography>
        </>
      ) : (
        <>
          <Typography color={colors.neutral[10]} style={typography.smallBold}>
            질문: {review?.qa || '정보 없음'}
          </Typography>
          <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
            느낀점: {review?.feel || '정보 없음'}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ReviewQuestion;

import { Box, Typography, Button } from '@mui/material';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import pencil from '../../../assets/edit_pencil.png';

const ReviewQuestion = () => {
  return (
    //const ReviewQuestion = ({review}) => {
    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={'6px'} alignSelf={'stretch'}>
      {/* <Typography color={colors.neutral[10]} style={typography.smallBold}>
        {review ? `질문: ${review.qa}` : '작성된 회고를 확인해보세요.'}
      </Typography>
      <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
        {review ? `느낀점: ${review.feel}` : ''}
      </Typography> */}
    </Box>
  );
};

const UploadReview = () => {
  return (
    <Box gap="8px" display="flex" flexDirection="column" alignItems={'center'} justifyContent={'center'}>
      {/* 회고 진행 안됐을 때 */}
      <Box display="flex" flexDirection="column" alignItems={'center'}>
        <Typography color={colors.neutral[10]} style={typography.xSmallBold}>
          아직 회고를 진행하지 않았어요!
        </Typography>
        <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
          새로운 회고를 등록해볼까요?
        </Typography>
      </Box>
      <Button
        sx={{
          display: 'inline-flex',
          height: '44px',
          padding: '8px 12px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          bgcolor: colors.primary[10],
          borderRadius: '8px',
          marginTop: '10px',
        }}
      >
        <Typography color={colors.primary.normal} textAlign="center" style={typography.xSmallSemiold}>
          회고하기
        </Typography>
        <img src={pencil} alt="edit icon" style={{ width: '20px', height: '20px', marginBottom: '4px' }} />
      </Button>
    </Box>
  );
};

const MidReview = () => {
  // Mock 데이터: 여러 개의 질문과 느낀점
  const mockData = {
    reviewAvailable: true,
    reviews: [
      { reviewId: 1, qa: "질문 1", feel: "느낀점 1" },
      { reviewId: 2, qa: "질문 2", feel: "느낀점 2" },
      { reviewId: 3, qa: "질문 3", feel: "느낀점 3" },
      { reviewId: 1, qa: "질문 1", feel: "느낀점 1" },
      { reviewId: 2, qa: "질문 2", feel: "느낀점 2" },
      { reviewId: 3, qa: "질문 3", feel: "느낀점 3" },    ]
  };

  const { reviewAvailable, reviews } = mockData;

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
              <ReviewQuestion key={review.reviewId} 
              // review={review}
               />
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

import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import { getReviewMid } from '../../../api/Reviews/getReviewMid';

interface Review {
  type: string;
  freeReview: string;
  scheduleId: number; 
  stageId: number;  
  reviewId: number; 
  isReviewed: boolean;
}

interface CompanyData {
  company: string;
  department: string;
  reviews: Review[];
}

interface ReviewModalProps {
  open: boolean;
  handleClose: () => void;
  companyData: CompanyData | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, handleClose, companyData }) => {
  const [reviewDetails, setReviewDetails] = useState<any>(null);  // 실제 데이터 형태에 맞게 설정
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (companyData && companyData.reviews.length > 0) {
        try {
          // isReviewed가 false인 리뷰에 대해서만 데이터 가져오기
          const reviewsToFetch = companyData.reviews.filter(review => !review.isReviewed);
          if (reviewsToFetch.length > 0) {
            // 첫 번째 리뷰를 예로 사용
            const review = reviewsToFetch[0];
            const response = await getReviewMid(review.scheduleId, review.stageId, review.reviewId);
            setReviewDetails(response.data);
          }
        } catch (error) {
          console.error('Error fetching review details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDetails();
  }, [companyData]);

  if (!open) return null;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!companyData) return null;

  return (
    <Box 
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 632,
        height: 658,
        bgcolor: '#FFF',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
        gap: '32px',
      }}
    >
      <Box sx={{ gap: '2px', position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            id="modal-title" 
            style={typography.medium2Bold} 
            component="h2" 
            color={colors.neutral[10]}
          >
            {companyData.company} {companyData.department} 중간전형 회고
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ width: 24, height: 24, color: colors.neutral[40] }} />
          </IconButton>
        </Box>
        <Typography 
          id="modal-description" 
          style={typography.xxSmallReg} 
          color={colors.neutral[40]} 
          sx={{ mt: 1 }}
        >
          {reviewDetails ? `${reviewDetails.deadline}에 진행된 중간 전형 회고입니다.` : '중간 전형 회고 데이터가 없습니다.'}
        </Typography>
      </Box>
  
      <Stack 
        spacing={2} 
        sx={{ 
          gap: '32px', 
          display: 'flex', 
          width: 592, 
          flexDirection: 'column', 
          alignItems: 'start',
          marginTop: '32px',
        }}
      >
        <Typography 
          id="modal-summary" 
          style={typography.small2Bold} 
          color={colors.neutral[90]}
        >
          회고 내용
        </Typography>
        <Typography 
          id="modal-summary" 
          style={typography.small2Reg} 
          color={colors.neutral[50]}
        >
          {companyData.reviews[0]?.freeReview || '회고 내용이 없습니다.'}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ReviewModal;

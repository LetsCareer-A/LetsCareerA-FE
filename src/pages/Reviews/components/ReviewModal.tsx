import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, IconButton, Backdrop } from '@mui/material';
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

interface ReviewModalProps {
  open: boolean;
  handleClose: () => void;
  selectedReview: Review | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, handleClose, selectedReview }) => {
  const [reviewDetails, setReviewDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedReview) {
        try {
          const { scheduleId, stageId, reviewId } = selectedReview;
          const response = await getReviewMid(scheduleId, stageId, reviewId);
          console.log(scheduleId, stageId, reviewId )
            setReviewDetails(response.data);
        } catch (error) {
          console.error('Error fetching review details:', error);
        }
      }
    };

    fetchDetails();
  }, [selectedReview]);

  if (!open) return null;

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'rgba(0, 0, 0, 0.5)' }}
        open={open}
        onClick={handleClose}
      />
      <Box
        sx={{
          position: 'fixed',
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
          zIndex: 1300,
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
              {reviewDetails?.company} {reviewDetails?.department} {selectedReview?.type}
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
            {reviewDetails ? `${reviewDetails.deadline}에 진행된 ${selectedReview?.type}입니다.` : '회고 데이터가 없습니다.'}
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
            {reviewDetails?.freeReview || '회고 내용이 없습니다.'}
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default ReviewModal;

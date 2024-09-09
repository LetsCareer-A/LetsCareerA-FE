import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import { getReviewMid } from '../../../api/Reviews/getReviewMid';
import { getReviewInt } from '../../../api/Reviews/getReviewInt';

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
  const [reviewData, setReviewData] = useState<any>(null);
  const [reviewInt, setReviewInt] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedReview) {
        try {
          const { scheduleId, stageId, reviewId, type } = selectedReview;

          console.log(scheduleId, stageId, reviewId, type);

          let response;
          if (type === '중간 전형 회고') {
            response = await getReviewMid(scheduleId, stageId, reviewId);
            setReviewData(response.data);
          } else if (type === '면접 회고') {
            response = await getReviewInt(scheduleId, stageId, reviewId);
            setReviewInt(response.data);
          } else {
            console.warn('Unknown review type:', type);
            return;
          }
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
          zIndex: 1300,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ gap: '2px', position: 'relative', flex: '1', overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              id="modal-title"
              style={typography.medium2Bold}
              component="h2"
              color={colors.neutral[10]}
            >
              {reviewData?.company} {reviewData?.department}
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
            {reviewData?.deadline ? 
              `${reviewData.deadline}에 진행된 ${reviewData.type}` 
              : '날짜가 설정되지 않은 일자의 회고입니다.'
            }
          </Typography>

          {selectedReview?.type === '중간 전형 회고' && (
            <>
              <Box display='flex' flexDirection='column' gap='8px'>
                <Typography mt='32px' color={colors.neutral[20]} style={typography.xSmallSemiold}>
                  자유롭게 회고를 진행해주세요.
                </Typography>
                <Typography color={colors.neutral[40]} style={typography.xSmallMed}>
                  {reviewData?.freeReview}
                </Typography>
              </Box>

              <Box display='flex' flexDirection='column' gap='8px'>
                <Typography mt='32px' color={colors.neutral[20]} style={typography.xSmallSemiold}>
                  앞으로의 목표를 작성해주세요.
                </Typography>
                <Typography color={colors.neutral[40]} style={typography.xSmallMed}>
                  {reviewData?.goal}
                </Typography>
              </Box>
            </>
          )}

          {selectedReview?.type === '면접 회고' && (
            <>
            <Box>
              <Typography mt='32px' color={colors.neutral[20]} style={typography.xSmallSemiold}>
                면접 방법이 어땠나요?
              </Typography>
              <Typography color={colors.neutral[40]} style={typography.xSmallMed}>
                {reviewInt?.details}
              </Typography>
            </Box>
            <Box>
            <Typography mt='32px' color={colors.neutral[20]} style={typography.xSmallSemiold}>
              면접 질문과 답변을 기억 나는대로 작성해주세요.
            </Typography>
            <Typography color={colors.neutral[40]} style={typography.xSmallMed}>
              {reviewInt?.qa}
            </Typography>
          </Box>
          <Box>
          <Typography mt='32px' color={colors.neutral[20]} style={typography.xSmallSemiold}>
          이번 면접으로 느낀 점을 자유롭게 작성해보세요.
          </Typography>
          <Typography color={colors.neutral[40]} style={typography.xSmallMed}>
            {reviewInt?.feelings}
          </Typography>
        </Box>
        </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ReviewModal;

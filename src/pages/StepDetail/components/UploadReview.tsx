import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import pencil from '../../../assets/edit_pencil.png';
import ReviewModal from '../../Reviews/components/ReviewModal'; // ReviewModal 컴포넌트 import
import { Review } from '../../../store/useReviewStore'; // Review 타입 import (필요하다면)

// 가상의 Review 데이터를 설정 (실제 데이터로 대체 가능)
const exampleReview: Review = {
  scheduleId: 1,
  stageId: 2,
  reviewId: 3,
  type: '중간 전형 회고',
  freeReview: '',
  isReviewed: false
};

const UploadReview: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false); // 모달 열림/닫힘 상태 관리
  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // 선택된 리뷰 데이터 관리

  const handleOpenModal = () => {
    setSelectedReview(exampleReview); // 가상의 Review 데이터 설정 (실제 데이터로 대체 가능)
    setModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ 
        width: '100%',
        height: '100%',
        textAlign: 'center',
        marginTop: 10,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="8px"
      >
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
        onClick={handleOpenModal} // 버튼 클릭 시 모달 열림
      >
        <Typography color={colors.primary.normal} textAlign="center" style={typography.xSmallSemiold}>
          회고하기
        </Typography>
        <img src={pencil} alt="edit icon" style={{ width: '20px', height: '20px', marginBottom: '4px' }} />
      </Button>

      {/* ReviewModal 컴포넌트 추가 */}
      <ReviewModal 
        open={isModalOpen} 
        handleClose={handleCloseModal} 
        selectedReview={selectedReview} 
      />
    </Box>
  );
};

export default UploadReview;

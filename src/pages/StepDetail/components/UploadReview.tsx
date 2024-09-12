// UploadReview.tsx
import React, { useState } from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import pencil from '../../../assets/edit_pencil.png';
import ReviewModal from '../../Reviews/components/ReviewModal'; // ReviewModal 컴포넌트 import

const UploadReview: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Box gap="8px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ height: '100%', width: '100%', marginTop: 10 }} >
      {/* 회고 진행 안됐을 때 */}
      <Box display="flex" flexDirection="column" alignItems={'center'} justifyContent={'center'} sx={{ height: '100%', width: '100%' }}>
        <Typography color={colors.neutral[10]} style={typography.xSmallBold}>
          아직 회고를 진행하지 않았어요!
        </Typography>
        <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
          새로운 회고를 등록해볼까요?
        </Typography>
      </Box>
      <Button
        onClick={handleOpen}
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

      {/* ReviewModal */}
      {/* <Modal
        open={openModal}
        onClose={handleClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ReviewModal onClose={handleClose} />
      </Modal> */}
    </Box>
  );
};

export default UploadReview;

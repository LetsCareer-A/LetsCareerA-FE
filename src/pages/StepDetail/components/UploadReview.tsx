// UploadReview.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import pencil from '../../../assets/edit_pencil.png';

const UploadReview: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ 
        width: '100%',
        height: '100%', // 화면 전체 높이로 설정
        textAlign: 'center', // 텍스트 가운데 정렬
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
      >
        <Typography color={colors.primary.normal} textAlign="center" style={typography.xSmallSemiold}>
          회고하기
        </Typography>
        <img src={pencil} alt="edit icon" style={{ width: '20px', height: '20px', marginBottom: '4px' }} />
      </Button>
    </Box>
  );
};

export default UploadReview;

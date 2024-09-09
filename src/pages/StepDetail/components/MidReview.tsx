import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Textfield from '../../../components/Textfield';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import pencil from '../../../assets/edit_pencil.png'; // RemoveIcon 추가

const MidReview = () => (
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
        bgcolor: ` ${colors.primary[10]}`,  // 추가적인 버튼 스타일링
        borderRadius: '8px',
        marginTop: '10px'
      }}
    >
      <Typography color={colors.primary.normal} textAlign="center" style={typography.xSmallSemiold}>
        회고하기
      </Typography>
      <img src={pencil} alt="edit icon" style={{ width: '20px', height: '20px', marginBottom: '4px' }} /> {/* 이미지에 스타일 적용 */}
    </Button>
  </Box>
);

export default MidReview;

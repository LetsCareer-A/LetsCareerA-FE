import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import pencil from '../../../assets/edit_pencil.png';
import WritingModal from '../../Reviews/components/WritingModal'; // WritingModal 컴포넌트 불러오기

const UploadReview: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // WritingModal의 상태 관리

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleConfirm = (data: { details: string; qa: string; feel: string; goal: string; freeReview: string }) => {
    // 모달에서 확인 버튼을 눌렀을 때의 처리
    console.log('Confirmed data:', data);
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
        onClick={handleOpenModal} // 버튼 클릭 시 모달 열기
      >
        <Typography color={colors.primary.normal} textAlign="center" style={typography.xSmallSemiold}>
          회고하기
        </Typography>
        <img src={pencil} alt="edit icon" style={{ width: '20px', height: '20px', marginBottom: '4px' }} />
      </Button>

      {/* WritingModal 연결 */}
      <WritingModal
        open={isModalOpen}
        onClose={handleCloseModal}
        reviewType="중간 전형 회고" // 혹은 "면접 회고"
        onConfirm={handleConfirm} // 모달에서 확인 버튼 눌렀을 때 호출될 함수
        selectedReview={{ scheduleId: '123', stageId: '456' }} // 필요 시 실제 데이터를 넣을 수 있음
      />
    </Box>
  );
};

export default UploadReview;

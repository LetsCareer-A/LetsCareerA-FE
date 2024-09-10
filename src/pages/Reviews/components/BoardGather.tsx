import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import Chip from '../../../components/Chips'; 
import Chart from '../../../assets/chart.svg';
import Commuincation from '../../../assets/communication.svg';
import { NormalButton } from '../../../components/CustomButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ReviewModal from './ReviewModal'; 
import { Review } from '../../../store/useReviewStore';
import Modal from '../../../components/Modal';
import Textfield from '../../../components/Textfield';
import Label from '../../../components/Label';

interface BoardGatherProps {
  company: string;
  department: string;
  reviews: Review[];
}

const BoardGather: React.FC<BoardGatherProps> = ({ company, department, reviews }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState('');
  const [qa, setQa] = useState('');
  const [feel, setFeel] = useState('');

  const getChipIcon = (type: string) => {
    if (type === '면접 회고') {
      return Commuincation; 
    } else if (type === '중간 전형 회고') {
      return Chart; 
    }
  };

  const handleReviewClick = (review: Review) => {
    if (review.isReviewed) {
      setSelectedReview(review);
      setReviewModalOpen(true);
    }
  };

  const handleButtonClick = (review: Review) => {
    setSelectedReview(review); 
    setModalOpen(true);  
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '337px',
        height: '670px',
        padding: '16px',
        border: '1px solid #EFEFEF',
        borderRadius: '12px',
        background: 'white',
        cursor: 'pointer'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginBottom: '16px' }}>
        <Typography sx={typography.small2Bold}>{company}</Typography>
        <Typography sx={typography.small2Bold}> | </Typography> 
        <Typography sx={typography.small2Bold}>{department}</Typography>
      </Box>

      <Stack spacing={2}>
        {reviews.map((review, index) => (
          <Box 
            key={index} 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              border: `1px solid ${review.type === '면접 회고' ? colors.secondary[20] : colors.neutral[85]}`,
              borderRadius: '8px',
              backgroundColor: review.type === '면접 회고' ? 'rgba(27, 196, 125, 0.05)' : colors.neutral[95],
              padding: '12px 12px',
              cursor: review.isReviewed ? 'pointer' : 'default' 
            }}
            onClick={() => handleReviewClick(review)}
          >
            <Box sx={{ flexDirection:'column'}}>
              <Chip 
                text={review.type}
                backgroundColor={review.type === '면접 회고' ? '#1bC47d' : colors.neutral[20]} 
                textColor="#FFFFFF"
                image={getChipIcon(review.type)} 
                imageWidth='16px'
              />  
              <Typography display='flex' mt='12px' alignItems='center' sx={{ typography: typography.xxSmall2, color: colors.neutral[35] }}>
                {review.freeReview} <br />
                {!review.isReviewed && ' 아직 진행되지 않은 회고입니다.'}
              </Typography>
            </Box>

            {!review.isReviewed && (
              <NormalButton
                width="100%"
                padding="4px"
                onClick={() => handleButtonClick(review)}  
              >
                회고 작성하기
                <CreateOutlinedIcon sx={{ width: '16px', color: colors.primary.normal }} />
              </NormalButton>
            )}
          </Box>
        ))}
      </Stack>

      <ReviewModal 
        open={reviewModalOpen}
        handleClose={() => setReviewModalOpen(false)}
        selectedReview={selectedReview}
      />

<Modal 
  open={modalOpen} 
  onClose={() => setModalOpen(false)} 
  title="회고 작성"
  subtitle={selectedReview ? selectedReview.freeReview : "회고를 작성해주세요"}
>
  {selectedReview?.type === '면접 회고' ? (
    <>
      <Box mt='32px' mb='24px'>
        <Label label="면접 회고 작성 내용을 여기에 입력하세요." required={true} />
        <Textfield
            showCharCount={true}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="어떤 질문을 받았나요? 본인이 답변한 내용과 면접관의 반응을 함께 적어보세요."
            maxLength={100} 
            height="132px"
            placeholderVerticalAlign="top"
          />
      </Box>
      <Box mb='24px'>
        <Label label="면접 질문과 답변을 기억 나는대로 작성해주세요." required={true} />
        <Textfield
            showCharCount={true}
            value={qa}
            onChange={(e) => setQa(e.target.value)}
            placeholder="온/오프라인 여부, 면접 시간, 몇 대 몇 면접이었는지 등을 적어보세요"
            maxLength={500} 
            height="220px"
            placeholderVerticalAlign="top"
          />
      </Box>
      <Box mb='24px'>
        <Label label="면접에 대한 추가 의견을 여기에 작성하세요" required={true} />
        <Textfield
            showCharCount={true}
            value={feel}
            onChange={(e) => setFeel(e.target.value)}
            placeholder="만족/불만족스러웠던 부분, 잘했거나 아쉬웠던 것, 더 준비해보았으면 좋을 것 등을 적어보세요."
            maxLength={500} 
            height="220px"
            placeholderVerticalAlign="top"
          />
      </Box>
    </>
  ) : (
    <>
      <Box mt='32px' mb='24px'>
      <Label label="자유롭게 회고를 진행해주세요." required={true} />
        <Textfield
              showCharCount={true}
              value={feel}
              onChange={(e) => setFeel(e.target.value)}
              placeholder="중간 전형을 진행하면서 느꼈던 점이나 어려웠던 부분 등을 자유롭게 기록해주세요."
              maxLength={500} 
              height="220px"
              placeholderVerticalAlign="top"
            />
      </Box>
      <Box mb='24px'>
      <Label label="앞으로의 목표를 작성해주세요." required={true} />
        <Textfield
              showCharCount={true}
              value={feel}
              onChange={(e) => setFeel(e.target.value)}
              placeholder="앞으로 이 중간 전형을 기점으로 본인이 어떻게 성장할 수 있는지 적어보세요."
              maxLength={500} 
              height="220px"
              placeholderVerticalAlign="top"
            />
      </Box>
    </>
  )}
</Modal>

    </Box>
  );
};

export default BoardGather;

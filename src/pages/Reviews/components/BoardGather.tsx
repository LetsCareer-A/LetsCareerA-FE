import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import Chip from '../../../components/Chips'; 
import Chart from '../../../assets/chart.svg';
import Commuincation from '../../../assets/communication.svg';
import { NormalButton } from '../../../components/CustomButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ReviewModal from './ReviewModal'; 
import useReviewStore, { Review } from '../../../store/useReviewStore';
import Modal from '../../../components/Modal';
import Textfield from '../../../components/Textfield';
import Label from '../../../components/Label';
import { postReviewInt } from '../../../api/Reviews/postReviewInt';
import { postReviewMid } from '../../../api/Reviews/postReviewMid';
import Toast from '../../../components/Toast';

interface BoardGatherProps {
  company: string;
  department: string;
  reviews: Review[];
}

const BoardGather: React.FC<BoardGatherProps> = ({ company, department, reviews}) => {
  const { fetchCompanyData, page } = useReviewStore();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState('');
  const [qa, setQa] = useState('');
  const [feel, setFeel] = useState('');
  const [goal, setGoal] = useState('');
  const [freeReview, setFreeReview] = useState('');
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 
  const [toastDescription, setToastDescription] = useState(''); 

  const getChipIcon = (type: string) => {
    if (type === '면접 회고') {
      return Commuincation; 
    } else if (type === '중간 전형 회고') {
      return Chart; 
    }
    return undefined;
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

  const handleCloseToast = () => {
    setShowToast(false);  
  };

  const handleConfirm = async () => {
    if (selectedReview) {
      try {
        const scheduleId = String(selectedReview.scheduleId);
        const stageId = String(selectedReview.stageId); 

        console.log(scheduleId, stageId);
  
        if (selectedReview.type === '면접 회고') {
          await postReviewInt(scheduleId, stageId, details, qa, feel);
          setToastMessage(`'${company} ${department}' 면접에 대한 회고를 완료했어요!`);
          setToastDescription('조금 더 성장에 한 걸음 가까워졌어요 :)');
        } else if (selectedReview.type === '중간 전형 회고') {
          await postReviewMid(scheduleId, stageId, freeReview, goal); 
          setToastMessage(`${company} ${department}' 중간 전형에 대한 회고를 완료했어요!`);
          setToastDescription('조금 더 성장에 한 걸음 가까워졌어요 :)');
        }
  
        setModalOpen(false);
        setShowToast(true); 
        setDetails('');
        setQa('');
        setFeel('');
        setFreeReview('');
        setGoal('');
        await fetchCompanyData(page);
        
      } catch (error) {
        console.error('회고 제출 오류:', error);
        alert('회고 제출에 실패했습니다.');
      }
    } else {
      console.error('Selected review or IDs are missing');
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [showToast]);


  const isButtonDisabled = () => {
    if (selectedReview?.type === '면접 회고') {
      return !details || !qa || !feel;
    } else if (selectedReview?.type === '중간 전형 회고') {
      return !freeReview || !goal;
    }
    return true;
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
        onConfirm={handleConfirm}
        isButtonDisabled={isButtonDisabled()}
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
              <Label label="회고의 목표를 입력해 주세요." required={true} />
              <Textfield
                  showCharCount={true}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="어떤 목표를 가지고 중간 전형을 준비했는지 적어보세요."
                  maxLength={100} 
                  height="132px"
                  placeholderVerticalAlign="top"
                />
            </Box>
            <Box mb='24px'>
              <Label label="자유롭게 작성해주세요" required={true} />
              <Textfield
                  showCharCount={true}
                  value={freeReview}
                  onChange={(e) => setFreeReview(e.target.value)}
                  placeholder="어떤 목표를 가지고 중간 전형을 준비했는지 적어보세요."
                  maxLength={500} 
                  height="220px"
                  placeholderVerticalAlign="top"
                />
            </Box>
          </>
        )}
      </Modal>

      {showToast && (
        <Toast
          message={toastMessage}
          description={toastDescription}
          onClose={handleCloseToast}
        />
      )}

    </Box>
  );
};

export default BoardGather;

import React from 'react';
import { Box } from '@mui/material';
import Modal from '../../../components/Modal'; 
import Textfield from '../../../components/Textfield';
import Label from '../../../components/Label';

interface WritingModalProps {
  open: boolean;
  onClose: () => void;
  reviewType: string | null;
  details: string;
  setDetails: (value: string) => void;
  qa: string;
  setQa: (value: string) => void;
  feel: string;
  setFeel: (value: string) => void;
  goal: string;
  setGoal: (value: string) => void;
  freeReview: string;
  setFreeReview: (value: string) => void;
  onConfirm: () => void;
  isButtonDisabled: () => boolean;
}

const WritingModal: React.FC<WritingModalProps> = ({
  open,
  onClose,
  reviewType,
  details,
  setDetails,
  qa,
  setQa,
  feel,
  setFeel,
  goal,
  setGoal,
  freeReview,
  setFreeReview,
  onConfirm,
  isButtonDisabled
}) => {
  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="회고 작성"
      subtitle={reviewType === '면접 회고' ? "면접 회고를 작성해주세요" : "회고를 작성해주세요"}
      onConfirm={onConfirm}
      isButtonDisabled={isButtonDisabled()}
    >
      {reviewType === '면접 회고' ? (
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
  );
};

export default WritingModal;

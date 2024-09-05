import React, { useEffect, useState } from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import { PrimaryButton } from '../../components/CustomButton';
import Card from './components/Card';  
import typography from '../../styles/typography';
import Plus from '../../assets/plus.svg';
import colors from '../../styles/colors';
import CareerBanner from '../../assets/careerBanner.png';
import Modal from '../../components/Modal'; 
import Label from '../../components/Label';
import Textfield from '../../components/Textfield';
import { useStore } from '../../store/careerModalStore';
import Experience from './components/Experience';
import Toast from '../../components/Toast';

interface CardData {
  chipText: string;
  chipBackgroundColor: string;
  chipTextColor: string;
  title: string;
  summary: string;
}

const cardData: CardData[] = Array.from({ length: 30 }, (_, index) => ({
  chipText: `Chip ${index + 1}`,
  chipBackgroundColor: index % 2 === 0 ? '#4D55F5' : '#1BC47D',
  chipTextColor: '#FFFFFF',
  title: `Card ${index + 1}`,
  summary: `This is the summary for Card ${index + 1}.`,
}));

const CardsPerPage = 15; 
const TotalPages = Math.ceil(cardData.length / CardsPerPage);

const CareersPage = () => {
  const { 
    isModalOpen, 
    setIsModalOpen, 
    title, 
    setTitle, 
    situation, 
    setSituation,
    task, 
    setTask,
    action, 
    setAction,
    result, 
    setResult,
    selectedExperience,
    setSelectedExperience,
    resetState  
  } = useStore(); 

  const [currentPage, setCurrentPage] = React.useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 
  const [toastDescription, setToastDescription] = useState(''); 
  const [isCardModalOpen, setIsCardModalOpen] = useState(false); 
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null); // 타입 수정
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * CardsPerPage;
  const endIndex = startIndex + CardsPerPage;
  const currentCards = cardData.slice(startIndex, endIndex);

  const handleExperienceChange = (label: string) => {
    setSelectedExperience(selectedExperience === label ? null : label);
  };

  const validateForm = () => {
    const isTitleValid = title.trim().length > 0 && title.trim().length <= 20;
    const isSituationValid = situation.trim().length > 0 && situation.trim().length <= 100;
    const isTaskValid = task.trim().length > 0 && task.trim().length <= 100;
    const isActionValid = action.trim().length > 0 && action.trim().length <= 100;
    const isResultValid = result.trim().length > 0 && result.trim().length <= 100;
    const isExperienceSelected = selectedExperience !== null;

    return isTitleValid && isSituationValid && isTaskValid && isActionValid && isResultValid && isExperienceSelected;
  };

  useEffect(() => {
    setIsButtonDisabled(!validateForm());
  }, [title, situation, task, action, result, selectedExperience]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetState();  
  };
  
  const handleConfirm = () => {
    setToastMessage(`${title} 을(를) 경험 정리에 추가했어요!`);
    setToastDescription('차곡차곡 쌓아온 경험들은 지원 일정별 상세페이지에서 핵심 경험으로 등록할 수도 있어요!');
    setShowToast(true);  
    setIsModalOpen(false);  
    resetState(); 
  };
  
  const handleCloseToast = () => {
    setShowToast(false);  
  };

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
    setIsCardModalOpen(true);
  };

  const handleCardModalClose = () => {
    setIsCardModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' gap='16px' alignItems='center'>
          <Typography variant="body2">경험 관리</Typography>
          <Typography style={typography.small2Reg} color={colors.neutral[40]}>
            진행한 활동들을 저장하고 기업 상세페이지에서 핵심 경험으로 꺼내 쓸 수 있어요!
          </Typography>
        </Box>
        
        <PrimaryButton 
          style={{ marginTop: '-6px', height: '44px' }} 
          onClick={() => setIsModalOpen(true)} 
        >
          <Typography style={typography.xSmallSemiold}>내 경험 추가하기</Typography>
          <img src={Plus} alt='플러스 아이콘' />
        </PrimaryButton>
      </Box>
      <img style={{ width: '1043px', marginTop: '14px' }} src={CareerBanner} />
      
      <Box
        display='grid'
        gridTemplateColumns='repeat(3, 1fr)'
        gap='16px'
        mt='32px'
      >
        {currentCards.map((card, index) => (
          <Card 
            key={index} 
            chipText={card.chipText}
            chipBackgroundColor={card.chipBackgroundColor}
            chipTextColor={card.chipTextColor}
            title={card.title}
            summary={card.summary}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </Box>

      <Box display='flex' justifyContent='center' mt='32px'>
        <Pagination
          count={TotalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '14px',
              alignItems: 'center',
            }}}
        />
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}  
        title="내 경험 추가"
        confirmText="경험 추가 완료하기"
        onConfirm={handleConfirm}  
        isButtonDisabled={isButtonDisabled} 
      >
        <Box mt="32px" mb="24px">
          <Label label="제목" required={true} />
          <Textfield
            showCharCount={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="활동명 또는 대회명을 입력해주세요."
            maxLength={20} 
          />
        </Box>
        <Box mt="32px" mb="24px">
          <Label label="경험에 대한 기본 정보를 선택해주세요." required={true} />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: '8px', 
              width: '100%', 
            }}
          >
            <Experience 
              label="대외활동" 
              checked={selectedExperience === "대외활동"} 
              onChange={() => handleExperienceChange("대외활동")} 
            />
            <Experience 
              label="공모전" 
              checked={selectedExperience === "공모전"} 
              onChange={() => handleExperienceChange("공모전")} 
            />
            <Experience 
              label="실무" 
              checked={selectedExperience === "실무"} 
              onChange={() => handleExperienceChange("실무")} 
            />
            <Experience 
              label="프로젝트" 
              checked={selectedExperience === "프로젝트"} 
              onChange={() => handleExperienceChange("프로젝트")} 
            />
            <Experience 
              label="자격증" 
              checked={selectedExperience === "자격증"} 
              onChange={() => handleExperienceChange("자격증")} 
            />
            <Experience 
              label="기타" 
              checked={selectedExperience === "기타"} 
              onChange={() => handleExperienceChange("기타")} 
            />
          </Box>
        </Box>
        <Box mb="24px">
          <Label label="Situation (상황)" required={true} />
          <Textfield
            showCharCount={true}
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="일을 하게 된 계기와 배경, 또는 잘성해야 하는 목표에 대해 적어주세요."
            maxLength={100} 
            height="132px"
            placeholderVerticalAlign="top"
          />
        </Box>
        <Box mb="24px">
          <Label label="Task (과제)" required={true} />
          <Textfield
            showCharCount={true}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="일을 하며 당면했던 과업 (문제, 위기, 업무 등)을 적어주세요."
            maxLength={100} 
            height="132px"
            placeholderVerticalAlign="top"
          />
        </Box>
        <Box mb="24px">
          <Label label="Action (행동)" required={true} />
          <Textfield
            showCharCount={true}
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="과업을 해결하기 위해 취한 행동 및 의사결정기준을 적어주세요."
            maxLength={100} 
            height="132px"
            placeholderVerticalAlign="top"
          />
        </Box>
        <Box mb="24px">
          <Label label="Result (결과)" required={true} />
          <Textfield
            showCharCount={true}
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="본인의 행동을 통해 얻은 결과를 작성해주세요."
            maxLength={100} 
            height="132px"
            placeholderVerticalAlign="top"
          />
        </Box>
      </Modal>
      <Modal
        open={isCardModalOpen}
        onClose={handleCardModalClose}
        title={selectedCard?.title || '제목이 없습니다'} 
        subtitle={selectedCard?.chipText || '제목이 없습니다'} 
        showConfirmButton={false}
      >
        <Box display='flex' flexDirection='column' gap='32px'>
          <Box>
            <Typography mt='36px' style={typography.xSmallSemiold}>
              Situation (상황)
            </Typography>
            <Typography mt='6px' style={typography.xSmallMed} color={colors.neutral[40]}>
              본문본문본문본<br/>문본문본<br/>문본문본문본문<br/>본문본문본문본<br/>문본문본<br/>문본문본문본문본<br/>문본문본문본문본문본문본문본문본<br/>문본문본문본문본문본문본문
              본문본문본문본문본문본문본문본<br/>문본문본문본문<br/>
              본문본문본<br/>문본문본문본문본<br/>문본문본문본문본문
              본문본<br/>문본문본문본문본문<br/>본문
              본문본문<br/>본문본문<br/>문본문본문
              본문본문본<br/>문본문본문
              본문본문본문본문<br/>
            </Typography>
          </Box>
         <Box>
          <Typography style={typography.xSmallSemiold}>
          Task (과제)
          </Typography>
          <Typography mt='6px' style={typography.xSmallMed} color={colors.neutral[40]}>
              본문
            </Typography>    
         </Box>
         <Box>
          <Typography style={typography.xSmallSemiold}>
          Action (행동)
        </Typography>
        <Typography mt='6px' style={typography.xSmallMed} color={colors.neutral[40]}>
              본문
            </Typography> 
         </Box>

         <Box>
          <Typography style={typography.xSmallSemiold}>
         Result (결과)
        </Typography> 
        <Typography mt='6px' style={typography.xSmallMed} color={colors.neutral[40]}>
              본문
            </Typography>
         </Box>



        </Box>
        

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

export default CareersPage;

import React from 'react';
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

const cardData = Array.from({ length: 30 }, (_, index) => ({
  chipText: `Chip ${index + 1}`,
  chipBackgroundColor: index % 2 === 0 ? '#4D55F5' : '#1BC47D', 
  chipTextColor: '#FFFFFF', 
  title: `Card ${index + 1}`,
  summary: `This is the summary for Card ${index + 1}.`
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
    setResult 
  } = useStore(); 

  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * CardsPerPage;
  const endIndex = startIndex + CardsPerPage;
  const currentCards = cardData.slice(startIndex, endIndex);

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' gap='16px' alignItems='center'>
          <Typography variant="body2">지원 일정관리</Typography>
          <Typography style={typography.small2Reg} color={colors.neutral[40]}>
            진행한 활동들을 저장하고 기업 상세페이지에서 핵심 경험으로 꺼내 쓸 수 있어요!
          </Typography>
        </Box>
        
        <PrimaryButton 
          style={{ marginTop: '-6px', height: '44px' }} 
          onClick={() => setIsModalOpen(true)} // Open modal on button click
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
          />
        ))}
      </Box>

      <Box display='flex' justifyContent='center' mt='32px'>
        <Pagination
          count={TotalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        title="내 경험 추가"
        confirmText="경험 추가 완료하기"
        onConfirm={() => {
          console.log('Confirm clicked');
          setIsModalOpen(false); 
        }}
        isButtonDisabled={false} 
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
            <Experience label="대외활동" checked={false} />
            <Experience label="공모전" checked={false} />
            <Experience label="실무" checked={false} />
            <Experience label="프로젝트" checked={false} />
            <Experience label="자격증" checked={false} />
            <Experience label="기타" checked={false} />
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
    </Box>
  );
};

export default CareersPage;

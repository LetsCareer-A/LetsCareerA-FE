import React, { useState } from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import { PrimaryButton } from '../../components/CustomButton';
import Card from './components/Card';  
import typography from '../../styles/typography';
import Plus from '../../assets/plus.svg';
import colors from '../../styles/colors';

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
  const [currentPage, setCurrentPage] = useState(1);


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
        
        <PrimaryButton style={{ marginTop: '-6px', height: '44px' }}>
          <Typography style={typography.xSmallSemiold}>내 경험 추가하기</Typography>
          <img src={Plus} alt='플러스 아이콘' />
        </PrimaryButton>
      </Box>
      
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
    </Box>
  );
};

export default CareersPage;

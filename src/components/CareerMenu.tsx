import { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import typography from "../styles/typography";
import { PrimaryButton } from "./CustomButton";
import CareerCard from './CareerCard';
import { getCareers } from '../api/StepDetail/getCareer'; 

type Career = {
  careerId: number;
  category: string;
  title: string;
  summary: string;
};


type CareerMenuProps = {
  onClose: () => void;
  onComplete: (selectedCards: { chipText: string, title: string, careerId: number }[]) => void;
};

const CareerMenu = ({ onClose, onComplete }: CareerMenuProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [selectedCards, setSelectedCards] = useState<{ chipText: string, title: string, careerId: number }[]>([]);
  const [careerCards, setCareerCards] = useState<{ chipText: string, title: string, description: string, careerId: number }[]>([]);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const response = await getCareers();
        const careers: Career[] = response.data.careers;
    
        const mappedCareers = careers.map(career => ({
          chipText: career.category,
          title: career.title,
          description: career.summary,
          careerId: career.careerId
        }));
        setCareerCards(mappedCareers);
      } catch (error) {
        console.error('Failed to fetch career data:', error);
      }
    };

    fetchCareerData();
  }, []);

  const handleCardClick = (card: { chipText: string, title: string, careerId: number }) => {
    const isSelected = selectedCards.some(selected => selected.careerId === card.careerId);

    if (isSelected) {
      // 카드가 선택된 상태이면 해제
      setSelectedCards(prevCards => prevCards.filter(selected => selected.careerId !== card.careerId));
    } else if (selectedCards.length < 4) {
      // 카드가 선택되지 않은 상태이면 추가
      setSelectedCards(prevCards => [...prevCards, card]);
    }
  };

  const handleCompleteClose = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete(selectedCards);
      onClose();
    }, 300);
  };

  const handleClose = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <Box
      display='flex'
      sx={{
        position: 'fixed',
        top: '70px',
        left: '-15px',
        width: '381px',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 9999,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transform: isSliding ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box display='flex' justifyContent='space-between' padding='20px 40px'>
        <Typography style={typography.smallBold}>
          어필할 경험
        </Typography>
        <ClearIcon
          style={{ cursor: 'pointer' }}
          onClick={handleClose}
        />
      </Box>

      <Box
        padding='12px 40px 0 40px'
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: '200px',
          overflowX: 'hidden',
        }}
      >
        {careerCards.map((card) => (
          <Box key={card.careerId} onClick={() => handleCardClick(card)}>
            <CareerCard
              chipText={card.chipText}
              title={card.title}
              description={card.description}
              isSelected={selectedCards.some(selected => selected.careerId === card.careerId)}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: '60px',
          left: 0,
          width: '381px',
          height: '124px',
          padding: '20px 40px 68px 40px',
          backgroundColor: '#FFF',
          boxShadow: '0px 16px 20px rgba(0, 0, 0, 0.12), 0px 8px 16px rgba(0, 0, 0, 0.08), 0px 0px 8px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <PrimaryButton
          sx={{ width: '100%' }}
          onClick={handleCompleteClose}
          disabled={selectedCards.length === 0 || selectedCards.length > 4} 
        >
          어필할 경험 추가 완료하기
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default CareerMenu;

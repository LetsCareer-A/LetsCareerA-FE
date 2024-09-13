import { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import typography from "../styles/typography";
import { PrimaryButton } from "./CustomButton";
import CareerCard from './CareerCard';
import { getCareers } from '../api/StepDetail/getCareer'; 
import { postCareer } from '../api/StepDetail/postCareer';

type Career = {
  careerId: number;
  category: string;
  title: string;
  summary: string;
  isAppeal: boolean;
};

type CareerMenuProps = {
  onClose: () => void;
  onComplete: (selectedCards: { chipText: string, title: string, careerId: number }[]) => void;
  onOpen?: () => void;
  scheduleId: number;
  stageId: number; 
};

const CareerMenu = ({ scheduleId, stageId, onClose, onComplete, onOpen }: CareerMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [selectedCards, setSelectedCards] = useState<{ chipText: string, title: string, careerId: number }[]>([]);
  const [careerCards, setCareerCards] = useState<{
    chipText: string, title: string, description: string, careerId: number, isAppeal: boolean 
  }[]>([]);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const response = await getCareers(scheduleId, stageId);
        const careers: Career[] = response.data.careers;

        const mappedCareers = careers.map(career => ({
          chipText: career.category,
          title: career.title,
          description: career.summary,
          careerId: career.careerId,
          isAppeal: career.isAppeal
        }));
        setCareerCards(mappedCareers);
      } catch (error) {
        console.error('Failed to fetch career data:', error);
      }
    };

    fetchCareerData();
  }, [scheduleId, stageId]);

  const handleCardClick = (cardId: number) => {
    const isSelected = selectedCards.some(selected => selected.careerId === cardId);
    const card = careerCards.find(card => card.careerId === cardId);

    if (card) {
      const appealCards = careerCards.filter(card => card.isAppeal);
      const totalAppealCount = appealCards.filter(card => selectedCards.some(selected => selected.careerId === card.careerId)).length;
      const totalSelectedCount = selectedCards.length + totalAppealCount;

      if (isSelected) {
        setSelectedCards(prevCards => prevCards.filter(selected => selected.careerId !== cardId));
      } else if (totalSelectedCount < 4 || (card && card.isAppeal)) {
        setSelectedCards(prevCards => [...prevCards, { chipText: card.chipText, title: card.title, careerId: cardId }]);
      }
    }
  };

  const handleCompleteClose = async () => {
    setIsSliding(true);

    const selectedCareerIds = selectedCards.map(card => card.careerId);

    try {
      await postCareer(scheduleId, stageId, selectedCareerIds);
      setTimeout(() => {
        setIsVisible(false);
        onComplete(selectedCards);
        onClose();
      }, 300);
    } catch (error) {
      console.error('Failed to post careers:', error);
    }
  };

  const handleClose = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
      if (onOpen) {
        onOpen();
      }
    }, 0);
  }, [onOpen]);

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
          <Box key={card.careerId}>
            <CareerCard
              chipText={card.chipText}
              title={card.title}
              description={card.description}
              isSelected={selectedCards.some(selected => selected.careerId === card.careerId)}
              isAppeal={card.isAppeal}
              onCardClick={handleCardClick}
              careerId={card.careerId}
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
          disabled={selectedCards.length === 0}
        >
          선택 완료
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default CareerMenu;

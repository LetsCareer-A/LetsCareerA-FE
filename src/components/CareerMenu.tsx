import { useState } from 'react';
import { Box, Typography } from "@mui/material";
import Delete from '../assets/delete.svg';
import typography from "../styles/typography";
import { PrimaryButton } from "./CustomButton";
import CareerCard from './CareerCard';

const CareerMenu = () => {
  const [isVisible, setIsVisible] = useState(true); 
  const [isSliding, setIsSliding] = useState(false); 

  const handleClose = () => {
    setIsSliding(true); 
    setTimeout(() => {
      setIsVisible(false); 
    }, 300); 
  };

  if (!isVisible) return null;

  const careerCards = [
    { chipText: '공모전', title: 'Software Engineer', description: 'Developed and maintained software applications.' },
    { chipText: '기타', title: 'Marketing Specialist', description: 'Managed marketing campaigns and analyzed data.' },
    { chipText: '실무', title: 'UI/UX Designer', description: 'Designed user interfaces and conducted user research.' },
    { chipText: '프로젝트', title: 'Project Manager', description: 'Led project teams and managed project timelines.' },
    { chipText: '공모전', title: 'Data Scientist', description: 'Analyzed data and created data-driven insights.' },
    { chipText: '기타', title: 'Content Writer', description: 'Wrote and edited content for various platforms.' },
    { chipText: '실무', title: 'DevOps Engineer', description: 'Managed deployment pipelines and infrastructure.' },
    { chipText: '프로젝트', title: 'Product Owner', description: 'Oversaw product development and managed stakeholder expectations.' }
  ];

  return (
    <Box 
      display='flex'
      sx={{
        position: 'fixed',
        top: '70px', 
        left: 0,
        width: '381px',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1000, 
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
        <img 
          src={Delete} 
          alt="Delete" 
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
          overflowX:'hidden',
        }}
      >
        {careerCards.map((card, index) => (
          <CareerCard 
            key={index}
            chipText={card.chipText}
            title={card.title}
            description={card.description}
          />
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
        <PrimaryButton sx={{ width: '100%' }}>
          어필할 경험 추가 완료하기
        </PrimaryButton>
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
        <PrimaryButton sx={{ width: '100%' }}>
          어필할 경험 추가 완료하기
        </PrimaryButton>
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
        <PrimaryButton sx={{ width: '100%' }}>
          어필할 커리어 추가 완료하기
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default CareerMenu;

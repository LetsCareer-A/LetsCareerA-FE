import React from 'react';
import { Box, Typography } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import { Link } from 'react-router-dom';

const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 12px',
  borderRadius: '8px',
  backgroundColor: 'white',
  border: '1px solid transparent',
  cursor: 'pointer',
  gap: '8px',
  transition: 'background-color 0.3s, border-color 0.3s',
  '&:hover': {
    backgroundColor: '#EDEEFE',
    borderColor: '#4D55F5',
    '& .menuText': {
      color: '#4D55F5',
    },
    '& .menuIcon': {
      color: '#4D55F5',
    },
  },
};

const textStyle = {
  fontFamily: 'Pretendard',
  fontSize: 14,
  fontWeight: 600,
  color: 'black',
  transition: 'color 0.3s',
};

const Sidebar = () => {
  return (
    <Box sx={{ width: 277, height: '100vh', backgroundColor: 'white' }}>
      {/* 상단 메뉴 목록 */}
      <Box sx={{ width: 181, display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', left: '80px', top: '40px' }}>
        {[
          { icon: <TodayIcon sx={{ width: 20, height: 20, color: 'black', transition: 'color 0.3s' }} className="menuIcon" />, text: '지원 대시보드', path: '/dashboard' },
          { icon: <Inventory2OutlinedIcon sx={{ width: 20, height: 20, color: 'black', transition: 'color 0.3s' }} className="menuIcon" />, text: '회고 보드', path: '/retrospective' },
          { icon: <FolderCopyOutlinedIcon sx={{ width: 20, height: 20, color: 'black', transition: 'color 0.3s' }} className="menuIcon" />, text: '커리어 보드', path: '/career-board' }
        ].map((item, index) => (
          <Link key={index} to={item.path} style={{ textDecoration: 'none' }}>
            <Box sx={menuItemStyle}>
              {item.icon}
              <Typography sx={textStyle} className="menuText">{item.text}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;

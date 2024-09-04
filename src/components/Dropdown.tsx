import React, { useState, MouseEvent } from 'react';
import { Box, Button, Menu, MenuItem, styled } from '@mui/material';
import Chip from './Chips'; 
import colors from '../styles/colors';
import Arrow from '../assets/arrow.svg';

const StyledButton = styled(Button)<{ open: boolean }>(({ open }) => ({
  display: 'flex',
  height: '44px',
  padding: '11px 8px 11px 12px',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  borderRadius: '8px',
  border: open ? `1px solid ${colors.primary[60]}` : `1px solid ${colors.neutral[80]}`, 
  background: open ? colors.primary[10] : colors.neutral[95], 
  color: open ? colors.neutral[10] : colors.neutral[40],
}));

const StyledMenu = styled(Menu)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '8px',
    padding: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08)',
  },
  '& .MuiList-root': {
    padding: 0, 
    margin: 0, 
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    borderRadius: '6px',
    color: theme.palette.primary.light,
  },
}));

interface DropdownProps {
  buttonText: string;
  items: Array<{ text: string; onClick: () => void; color?: string }>; 
  renderItem?: (item: { text: string; onClick: () => void; color?: string }) => React.ReactNode; 
}

const Dropdown: React.FC<DropdownProps> = ({ buttonText, items, renderItem }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<{ text: string; onClick: () => void; color?: string } | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item: { text: string; onClick: () => void; color?: string }) => {
    setSelectedItem(item); 
    item.onClick();
    handleClose();
  };

  return (
    <div>
      <StyledButton onClick={handleClick} open={open}> {/* open 상태 전달 */}
        {selectedItem ? (
          <Chip 
            text={selectedItem.text}
            backgroundColor={selectedItem.color}
            textColor="#FFF" 
          />
        ) : (
          <Box display="flex" alignItems="center" gap='8px'>
            {buttonText}
            <img 
              src={Arrow} 
              alt="icon" 
              style={{ 
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)', 
              }} 
            />
          </Box>
        )}
      </StyledButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item, index) => (
          <StyledMenuItem
            key={index}
            onClick={() => handleItemClick(item)} 
          >
            {renderItem ? renderItem(item) : item.text}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default Dropdown;

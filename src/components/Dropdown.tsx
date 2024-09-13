import React, { useState, MouseEvent } from 'react';
import { Box, Button, Menu, MenuItem, styled } from '@mui/material';
import Chip from './Chips'; 
import colors from '../styles/colors';
import Arrow from '../assets/arrow.svg';

export interface DropdownItem {
  color?: string | undefined;
  text: string;
  backgroundColor?: string;
  textColor?: string; 
  image?: string;
  icon?: string;
  sx?: object;
}

const StyledButton = styled(Button)<{ open: boolean; bgColor?: string }>(({ open, bgColor }) => ({
  display: 'flex',
  padding: '11px 8px 11px 12px',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
  borderRadius: '8px',
  border: open ? `1px solid ${colors.primary[60]}` : `1px solid ${colors.neutral[80]}`, 
  background: bgColor || (open ? colors.primary[10] : colors.neutral[95]), // 버튼 배경색 변경
  color: open ? colors.neutral[10] : colors.neutral[40],
  position: 'relative',
  zIndex: 1,
}));

const StyledMenu = styled(Menu)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '8px',
    padding: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08)',
    zIndex: 0,
  },
  '& .MuiList-root': {
    padding: 0,
    margin: 0,
    maxHeight: '200px',
    overflowY: 'auto', 
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    borderRadius: '6px',
    color: theme.palette.primary.light
  },
}));

interface DropdownProps {
  buttonText: string;
  items: DropdownItem[]; 
  backgroundColor?: string; // 배경색 추가
  renderItem?: (item: DropdownItem) => React.ReactNode; 
  onSelect?: (item: DropdownItem) => void;
  alwaysShowChip?: boolean; 
  defaultChipText?: string; 
  defaultChipBackgroundColor?: string; 
  defaultChipTextColor?: string; 
  sx?: object;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonText,
  items,
  backgroundColor,
  renderItem,
  onSelect,
  alwaysShowChip = false,
  defaultChipText,
  defaultChipBackgroundColor,
  defaultChipTextColor,
  sx = {},
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item: DropdownItem) => {
    setSelectedItem(item);
    if (onSelect) {
      onSelect(item);
    }
    handleClose();
  };

  return (
    <div>
      <StyledButton onClick={handleClick} open={open} bgColor={backgroundColor} sx={sx}>
        <Box display="flex" alignItems="center" gap="8px">
          {/* 항상 Chip을 보여줄지 여부에 따라 Chip 또는 buttonText 표시 */}
          {alwaysShowChip || selectedItem ? (
            <Chip 
              text={selectedItem ? selectedItem.text : defaultChipText || buttonText} 
              backgroundColor={selectedItem?.color || defaultChipBackgroundColor}
              image={selectedItem?.image}
              textColor={selectedItem?.textColor || defaultChipTextColor} 
            />
          ) : (
            buttonText 
          )}
          <img 
            src={Arrow} 
            alt="icon" 
            style={{ 
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)', 
              transition: 'transform 0.3s',
            }} 
          />
        </Box>
      </StyledButton>

      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item, index) => (
          <Box 
            key={index}
            onClick={() => handleItemClick(item)}
            sx={{ margin: '4px 0' }} 
          >
            <StyledMenuItem key={index}>
              {renderItem ? (
                renderItem(item) 
              ) : (
                <Chip 
                  text={item.text}
                  backgroundColor={item.color}
                  image={item.image}
                  sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
                />
              )}
            </StyledMenuItem>
          </Box>
        ))}
      </StyledMenu>
    </div>
  );
};

export default Dropdown;

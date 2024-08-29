import { useState, MouseEvent } from 'react';
import { Button, Menu, MenuItem, styled } from '@mui/material';
import colors from '../styles/colors';

const StyledButton = styled(Button)(() => ({
    display: 'flex',
    height: '44px',
    padding: '11px 8px 11px 12px',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'stretch',
    borderRadius: '8px',
    border: `1px solid ${colors.primary[60]}`, 
    background: colors.primary[10], 
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08)',
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
    color: theme.palette.primary.light
  },
}));

interface DropdownProps {
  buttonText: string;
  items: Array<{ text: string; onClick: () => void }>;
}

const Dropdown: React.FC<DropdownProps> = ({ buttonText, items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledButton onClick={handleClick}>
        {buttonText}
      </StyledButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item, index) => (
          <StyledMenuItem
            key={index}
            onClick={() => { item.onClick(); handleClose(); }}
          >
            {item.text}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default Dropdown;

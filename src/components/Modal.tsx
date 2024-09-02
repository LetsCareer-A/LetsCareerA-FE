import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, styled, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import typography from '../styles/typography';

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    width: '706px',
    height: '413px',
    flexShrink: 0,
    borderRadius: '16px',
    background: '#FFF',
    padding: '20px'
  },
}));

const StyledConfirmButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  display: 'inline-flex',
  height: '56px',
  padding: '8px 16px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
  backgroundColor: theme.palette.primary.main, 
  color: '#fff',
}));

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  confirmText = '확인',
  onConfirm,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }} style={typography.medium2Bold}>
        {title}
        <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        {children}
      </DialogContent>
        <StyledConfirmButton 
          onClick={() => {
            if (onConfirm) onConfirm();
          }}
        >
          {confirmText}
        </StyledConfirmButton>
    </StyledDialog>
  );
};

export default Modal;

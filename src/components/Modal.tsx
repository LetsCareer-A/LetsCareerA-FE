import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, styled } from '@mui/material';

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    width: '706px',
    height: '413px',
    flexShrink: 0,
    borderRadius: '16px',
    background: '#FFF',
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className="p-4">
        {children}
      </DialogContent>
      <DialogActions className="flex justify-end gap-4 p-4">
        <StyledConfirmButton 
          onClick={() => {
            if (onConfirm) onConfirm();
          }}
        >
          {confirmText}
        </StyledConfirmButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default Modal;

import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import typography from '../styles/typography';
import colors from '../styles/colors';

const StyledDialog = styled(Dialog)<{ width?: string }>(({ width }) => ({
  '& .MuiPaper-root': {
    width: width || '706px',
    maxHeight: '729px',
    flexShrink: 0,
    borderRadius: '16px',
    background: '#FFF',
    padding: '20px',
    margin: 0,
    maxWidth: '100%',
    minWidth: 'auto',
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
  '&:disabled': {
    backgroundColor: colors.neutral[90], 
    color: colors.neutral[50], 
    cursor: 'not-allowed',
  },
}));

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string; 
  children: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  width?: string;
  isButtonDisabled?: boolean;
  showConfirmButton?: boolean; 
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  subtitle, 
  children,
  confirmText = '확인',
  onConfirm,
  width,
  isButtonDisabled = false, 
  showConfirmButton = true, 
}) => {
  return (
    <StyledDialog open={open} onClose={onClose} width={width}>
      <DialogTitle 
        sx={{ display: 'flex', flexDirection: 'column', padding: 0 }} 
        style={typography.medium2Bold}
      >
        <span>{title}</span>
        {subtitle && (
          <span style={{ ...typography.xSmall2Reg, color: colors.neutral[40] }}>
            {subtitle}
          </span>
        )}

        <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500], position: 'absolute', top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        {children}
      </DialogContent>
      {showConfirmButton && (
        <StyledConfirmButton 
          onClick={() => {
            if (onConfirm) onConfirm();
          }}
          disabled={isButtonDisabled}  
        >
          {confirmText}
        </StyledConfirmButton>
      )}
    </StyledDialog>
  );
};

export default Modal;

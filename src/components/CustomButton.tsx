import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps extends ButtonProps {
  width?: string;
  height?: string;
  padding?: string; 
}

const PrimaryButton = styled(({ width, height, padding, ...otherProps }: CustomButtonProps) => (
  <Button {...otherProps} />
))(({ theme, width, height, padding }) => ({ 
  borderRadius: '12px',
  padding: padding || '8px 16px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
  width: width || 'auto',
  height: height || 'auto',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    boxShadow: `0px 2px 8px 0px ${theme.palette.primary.main}, 
    0px 1px 4px 0px rgba(77, 85, 245, 0.08), 
    0px 0px 1px 0px rgba(77, 85, 245, 0.08)`,
  },
  '&:active': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  height: '56px',
  padding: '8px 16px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
  color: theme.palette.primary.main,
  border: `1.5px solid ${theme.palette.primary.main}`,
  '&:active': {
    backgroundColor: theme.palette.action.selected,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
  },
}));

const NormalButton = styled(({ width, padding, ...otherProps }: CustomButtonProps) => (
  <Button {...otherProps} />
))(({ theme, width, padding }) => ({
  borderRadius: '12px',
  padding: padding || '8px 16px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: '8px',
  flexShrink: 0,
  width: width || 'auto',
  backgroundColor: theme.palette.action.selected,
  color: theme.palette.primary.main,
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
  },
}));

export { PrimaryButton, SecondaryButton, NormalButton };

import { Box, Typography } from '@mui/material';
import typography from '../styles/typography';
import colors from '../styles/colors';

interface LabelProps {
  label: string;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ label, required }) => {
  return (
    <Box display='flex' gap='8px' alignItems='center' mb='8px'>
      <Typography color='#2A2D34' style={typography.xSmallBold}>
        {label}
      </Typography>
      {required && (
        <Typography style={{ ...typography.xSmall2Med, color: colors.primary.normal }}>
          필수
        </Typography>
      )}
    </Box>
  );
};

export default Label;

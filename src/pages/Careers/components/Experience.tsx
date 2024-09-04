import { useState } from 'react';
import { Box, Typography, Checkbox } from '@mui/material';
import typography from '../../../styles/typography';

interface ExperienceProps {
  label: string; 
  checked?: boolean; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void; 
}

const Experience: React.FC<ExperienceProps> = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(event, newCheckedState);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '11px 8px 11px 12px',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
        borderRadius: '8px',
        border: `1px solid ${isChecked ? '#9499F9' : '#E7E7E7'}`, 
        background: `${isChecked ? '#EDEEFE' : '#F9F9F8'}`, 
        transition: 'border 0.3s ease, background 0.3s ease', 
      }}
    >
      <Typography sx={{ ...typography.xSmall2Med, flex: 1 }}>
        {label}
      </Typography>
      <Checkbox checked={isChecked} onChange={handleChange} />
    </Box>
  );
};

export default Experience;

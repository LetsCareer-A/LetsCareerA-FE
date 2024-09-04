import React from 'react';
import CalendarIcon from '@mui/icons-material/CalendarToday'; 
import colors from '../styles/colors';

interface CalendarInputProps {
    value: string;
    onClick: () => void;
    placeholder: string;
}

const CalendarInput: React.FC<CalendarInputProps> = ({ value, onClick, placeholder }) => (
    <div style={{ position: 'relative', width: '100%' }}>
        <input
            type="text"
            value={value}
            onClick={onClick}
            placeholder={placeholder}
            readOnly
            style={{
                width: '372px',
                backgroundColor: colors.neutral[95],
                borderRadius: '8px',
                padding: '10px 40px 10px 10px', 
                border: `1px solid ${colors.neutral[80]}`,
                color: '#000',
                boxSizing: 'border-box',
                fontSize: '14px',
                lineHeight: '24px',
            }}
        />
        <CalendarIcon
            style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#000',
                cursor: 'pointer',
                pointerEvents: 'none', 
            }}
            onClick={onClick}
        />
    </div>
);

export default CalendarInput;

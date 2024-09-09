import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import Dropdown from '../../../components/Dropdown';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import fileImage from '../../../assets/ill_file.png';
import interview from '../../../assets/intervew.png';
import workcheck from '../../../assets/workcheck.png';
import { DropdownItem } from '../../../components/Dropdown';

interface SupportStateProps {
  dropdownItems: DropdownItem[];
  selectedChip: DropdownItem | null;
  onDropdownSelect: (item: DropdownItem) => void;
}

const ReadyState: React.FC<SupportStateProps> = ({ dropdownItems, onDropdownSelect }) => {
  return (
    <Box
        sx={{
            display: 'flex',
            width: '100px',
            paddingBottom: '4px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            marginLeft: '23px',
            marginTop: '25px',
            position: 'relative',
        }}
    >
        <Box
            sx={{
                display: 'flex',
                width: 100,
                height: 100,
                padding: '3px 3px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                bgcolor: colors.primary[80],
            }}
        >
            <img src={fileImage} alt="file" style={{ width: '100%', height: '100%' }} />
        </Box>
        <Typography color={colors.neutral[10]} style={typography.xSmallMed}>
            서류전형
        </Typography>
        <Typography color={colors.neutral[40]} style={typography.xxSmallReg}>
            24.08.30
        </Typography>

        {/* <Select
          value={onDropdownSelect}
          onChange={onDropdownSelect}
          displayEmpty
          fullWidth
          sx={{
            height: '56px',
            borderRadius: '8px',
            backgroundColor: `${colors.primary[10]}`,
            border: `1px solid ${colors.neutral[85]}`,
            style: `${typography.xSmall2Reg}`,
            padding: '8px',
          }}
        >
          <MenuItem value="" disabled>
            상태를 선택하세요
          </MenuItem>
          <MenuItem value="진행중">진행중</MenuItem>
          <MenuItem value="진행완료">진행완료</MenuItem>
          <MenuItem value="합격">합격</MenuItem>
          <MenuItem value="불합격">불합격</MenuItem>
        </Select> */}

        <Dropdown
            buttonText="진행중"
            backgroundColor={colors.primary[10]}
            items={dropdownItems}
            renderItem={(item) => <Typography 
                style={typography.xSmall2Reg}
                color={colors.neutral[20]} 
                sx={{
                    width: '80px', 
                    padding: '8px', 
                    alignItems: 'flex-start', 
                    gap: '4px',
                    '&:hover': {
                        backgroundColor: colors.primary[20],
                        borderRadius: '4px',
                    },
            }}>{item.text}</Typography>}
            onSelect={onDropdownSelect}
            sx={{height:'28px', marginTop: '10px', color: `${colors.primary.normal}`, typography: `${typography.xSmall2Med}`}}
        />
    </Box>
  );
};

export default ReadyState;

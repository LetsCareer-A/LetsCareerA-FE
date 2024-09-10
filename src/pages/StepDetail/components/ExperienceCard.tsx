// import React from 'react';
// import Chip from '../../../components/Chips';
import { Box, Typography } from '@mui/material';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';

const ExperienceCard = () => {
  return (
    <Box 
      display={'flex'} 
      padding={'14px 27px'} 
      alignItems={'center'} 
      borderRadius={'8px'} 
      border={`1px solid ${colors.neutral[85]}`} 
      bgcolor={colors.neutral[100]}
    >
      {/* <Chip label={career.category} /> */}
      <Box 
        display={'flex'} 
        flexDirection={'row'} 
        alignItems={'center'} 
        gap={'8px'} 
        ml={'16px'} // Adjust spacing between Chip and title
      >
        <Typography 
          color={colors.neutral[10]} 
          style={typography.xSmallMed}
        >
          {/* {career.title} */}
        </Typography>
      </Box>
    </Box>
  );
};
;

export default ExperienceCard;

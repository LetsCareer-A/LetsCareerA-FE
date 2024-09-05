import { Box, Typography, Checkbox } from "@mui/material";
import Chip from "./Chips";
import colors from "../styles/colors";
import typography from "../styles/typography";

const CareerCard = () => {
  return (
    <Box 
      width='100%' 
      p='12px' 
      sx={{
        borderRadius: '12px', 
        border: `1px solid ${colors.neutral[85]}`, 
        background: colors.neutral[95], 
        boxShadow: '0px 0px 29px 0px rgba(0, 0, 0, 0.04)', 
        position: 'relative' 
      }}
    >
      <Box 
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb='8px'
      >
        <Chip text='dd' />
        <Checkbox
          sx={{
            position: 'absolute',
            top: '12px',
            right: '12px'
          }}
        />
      </Box>
      <Box>
        <Typography style={typography.small2Bold}>dkdkdk</Typography>
        <Typography 
          style={typography.xSmall2Reg}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          dddddsldkfjapeofjasdnflskdfmlsdjfpoawjefnaefnosiejfiawjesfpoje
        </Typography>
      </Box>
    </Box>
  );
};

export default CareerCard;

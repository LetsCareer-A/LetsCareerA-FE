import { Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const Toast = () => {
  return (
    <Box
      sx={{
        position: 'fixed', 
        top: 102,      
        left: '50%',
        transform: 'translateX(-50%)', 
        width: 848,
        height: 80,
        padding: '16px 20px',
        backgroundColor: '#2a2d34',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1300, 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5, 
        }}
      >
        <CheckCircleIcon
          sx={{
            width: 36,
            height: 36,
            color: '#757BFF',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'Pretendard',
              lineHeight: '1.75',
            }}
          >
            ‘네이버클라우드 UX리서처’ 중간 전형에 대한 회고를 완료했어요!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              fontFamily: 'Pretendard',
              lineHeight: '1.5',
            }}
          >
            조금 더 성장에 한 걸음 가까워졌어요 :
          </Typography>
        </Box>
      </Box>
      <IconButton
        sx={{
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
        }}
        onClick={() => console.log('Close button clicked')} // 닫기 버튼 클릭 핸들러

      >
        <CloseIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
};

export default Toast;

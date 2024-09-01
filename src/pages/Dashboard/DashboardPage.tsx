import { Container, Box, Typography } from '@mui/material';
import { PrimaryButton } from '../../components/CustomButton';
import CalendarAdd from '../../assets/calendarAdd.svg';
import typography from '../../styles/typograhy'
import Calendar from './components/Calendar';
import DetailList from './components/DetailList';

const DashboardPage = () => {
    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="body2">
                지원 일정관리
            </Typography>
            <PrimaryButton style={{ marginTop: '-6px', height:'44px' }}>
            <Typography style={typography.xSmallSemiold}>
            새로운 지원 일정 등록
            </Typography>
                <img src={CalendarAdd} alt='캘린더 아이콘'/>
            </PrimaryButton>
            </Box>
            <Box display='flex' gap='4px' justifyContent='space-between' mt='20px' borderRadius='12px' sx={{overflow: 'hidden'}}>
                <Calendar />
                <DetailList />
            </Box>
            
        </Box>
    );
};

export default DashboardPage;
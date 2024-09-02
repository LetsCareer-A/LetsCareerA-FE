import { Box, Typography } from '@mui/material';
import { PrimaryButton } from '../../components/CustomButton';
import CalendarAdd from '../../assets/calendarAdd.svg';
import typography from '../../styles/typography'
import Calendar from './components/Calendar';
import DetailList from './components/DetailList';
import TodoList from './components/Todo';
import AlwaysReady from './components/AlwaysReady';
import Modal from '../../components/Modal';
import { useState } from 'react';

const DashboardPage = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="body2">
                지원 일정관리
            </Typography>
            <PrimaryButton style={{ marginTop: '-6px', height:'44px' }} onClick={handleOpen}>
                <Typography style={typography.xSmallSemiold}>
                새로운 지원 일정 등록
                </Typography>
                <img src={CalendarAdd} alt='캘린더 아이콘'/>
            </PrimaryButton>
            </Box>
            <Box display='flex' gap='4px' justifyContent='space-between' mt='20px' mb='16px' borderRadius='12px' sx={{overflow: 'hidden'}}>
                <Calendar />
                <DetailList />
            </Box>
            <Box display='flex' gap='4px' justifyContent='space-between' borderRadius='12px' sx={{overflow: 'hidden'}}>
                <TodoList />
                <AlwaysReady />
            </Box>
            
            <Modal
                open={open}
                onClose={handleClose}
                title="새로운 지원 일정 등록"
             />
            
        </Box>
    );
};

export default DashboardPage;
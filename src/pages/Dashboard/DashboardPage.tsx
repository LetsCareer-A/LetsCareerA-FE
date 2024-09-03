import React, { useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { PrimaryButton } from '../../components/CustomButton';
import CalendarAdd from '../../assets/calendarAdd.svg';
import typography from '../../styles/typography';
import Calendar from './components/Calendar';
import DetailList from './components/DetailList';
import TodoList from './components/Todo';
import AlwaysReady from './components/AlwaysReady';
import Modal from '../../components/Modal';
import Textfield from '../../components/Textfield';
import colors from '../../styles/colors';
import Label from '../../components/Label';
import Dropdown from '../../components/Dropdown';
import useModalStore, { useModalStoreState } from '../../store/useModalStore';
import Chip from '../../components/Chips';

const DashboardPage = () => {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const { companyName, jobTitle, setCompanyName, setJobTitle, resetState, setDropdownItem } = useModalStore();
    const { isButtonDisabled } = useModalStoreState(); 

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        resetState(); 
        setOpen(false);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {}, [companyName, jobTitle]);

    const items = [
        { text: '서류 준비 중', color: '#4D55F5', onClick: () => setDropdownItem('서류 준비 중') },
        { text: '면접 준비 중', color: '#1BC47D', onClick: () => setDropdownItem('면접 준비 중') },
        { text: '중간 전형(직접 입력)', color: '#3E4148', onClick: () => setDropdownItem('중간 전형(직접 입력)') },
    ];

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="body2">지원 일정관리</Typography>
                <PrimaryButton style={{ marginTop: '-6px', height: '44px' }} onClick={handleOpen}>
                    <Typography style={typography.xSmallSemiold}>새로운 지원 일정 등록</Typography>
                    <img src={CalendarAdd} alt='캘린더 아이콘' />
                </PrimaryButton>
            </Box>
            <Box display='flex' gap='4px' justifyContent='space-between' mt='20px' mb='16px' borderRadius='12px' sx={{ overflow: 'hidden' }}>
                <Calendar />
                <DetailList />
            </Box>
            <Box display='flex' gap='4px' justifyContent='space-between' borderRadius='12px' sx={{ overflow: 'hidden' }}>
                <TodoList />
                <AlwaysReady />
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                title="새로운 지원 일정 등록"
                confirmText="다음"
                width='412px'
                isButtonDisabled={isButtonDisabled} 
                onConfirm={() => {
                    //버튼 클릭 시 로직 추가
                }}
            >
                <Box mt='32px' mb='24px'>
                    <Label label="기업 이름" required={true} />
                    <Textfield
                        showCharCount={false}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="지원하시는 기업의 이름을 입력해주세요. (ex: 렛츠커리어)"
                    />
                </Box>
                <Box mb='24px'>
                    <Label label="직무 이름" required={true} />
                    <Textfield
                        showCharCount={false}
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="지원하시는 직무의 이름을 입력해주세요. (ex: 컨텐츠 디자이너)"
                    />
                </Box>
                <Box mb='32px'>
                    <Label label="현재 준비 상태" required={true} />
                    <Dropdown
                        buttonText="준비 단계를 선택해주세요."
                        items={items}
                        renderItem={(item) => (
                            <Chip
                            text={item.text}
                            backgroundColor={item.color}
                            />
                        )}
                    />
                </Box>
                <Box mb='24px' p='10px 12px' borderRadius='8px' sx={{ background: colors.neutral[95] }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={handleCheckboxChange}
                                color="primary"
                            />
                        }
                        label={<Typography style={typography.xSmall2Med}>마감일이 없거나 공고가 뜨지 않았어요. (상시준비)</Typography>}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default DashboardPage;

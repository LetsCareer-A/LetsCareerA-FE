import React, { useState, useRef, useEffect } from 'react';
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
import useModalStore from '../../store/useModalStore';
import Chip from '../../components/Chips';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarInput from '../../components/CalendarInput'; 

const DashboardPage = () => {
    const [open, setOpen] = useState(false);
    const [buttonText, setButtonText] = useState('다음');
    const [modalStep, setModalStep] = useState<number>(1);

    const {
        companyName,
        jobTitle,
        setCompanyName,
        setJobTitle,
        resetState,
        setDropdownItem,
        isCheckboxChecked,
        setCheckboxChecked,
        dropdownItem,
        stageDetailInput,
        setStageDetailInput,
        link,
        setLink,
        date,
        setDate
    } = useModalStore();

    const datePickerRef = useRef<DatePicker>(null);

    useEffect(() => {
        if (modalStep === 1) {
            setButtonText(isCheckboxChecked ? '등록 완료하기' : '다음');
        }
    }, [isCheckboxChecked, modalStep]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        resetState(); 
        setOpen(false);
        setButtonText('다음'); 
        setModalStep(1);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxChecked(event.target.checked);
    };

    const handleConfirm = () => {
        if (modalStep === 1) {
            if (buttonText === '다음') {
                setModalStep(2);
                setButtonText('등록 완료하기');
            } else if (buttonText === '등록 완료하기') {
                handleClose();
            }
        } else if (modalStep === 2) {
            handleClose();
        }
    };
    

    const items = [
        { text: '서류 준비 중', color: '#4D55F5', onClick: () => setDropdownItem('서류 준비 중') },
        { text: '면접 준비 중', color: '#1BC47D', onClick: () => setDropdownItem('면접 준비 중') },
        { text: '중간 전형(직접 입력)', color: '#3E4148', onClick: () => setDropdownItem('중간 전형(직접 입력)') },
    ];

    const isStep1ButtonDisabled = !companyName || !jobTitle || !dropdownItem || (dropdownItem === '중간 전형(직접 입력)' && !stageDetailInput);
    const isStep2ButtonDisabled = !date || (dropdownItem === '중간 전형(직접 입력)' && !link);

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
                confirmText={buttonText}
                width='412px'
                isButtonDisabled={modalStep === 1 ? isStep1ButtonDisabled : isStep2ButtonDisabled}
                onConfirm={handleConfirm}  
            >
                {modalStep === 1 && (
                    <>
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
                            <Box display='flex' gap='8px'>
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
                                {dropdownItem === '중간 전형(직접 입력)' && (
                                    <Box flexGrow={1}> 
                                        <Textfield
                                            showCharCount={false}
                                            value={stageDetailInput}
                                            onChange={(e) => setStageDetailInput(e.target.value)}
                                            placeholder="전형 단계를 입력해주세요."
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <Box mb='24px' p='10px 12px' borderRadius='8px' sx={{ background: colors.neutral[95] }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isCheckboxChecked}  
                                        onChange={handleCheckboxChange}
                                        color="primary"
                                    />
                                }
                                label={<Typography style={typography.xSmall2Med}>마감일이 없거나 공고가 뜨지 않았어요. (상시준비)</Typography>}
                            />
                        </Box>
                    </>
                )}
                {modalStep === 2 && (
                    <>
                    <Box mt='32px' mb='24px'>
                        <Box>
                            <Label label="지원 마감일 또는 전형 진행일" required={true} />
                            <Box display='flex' alignItems='center' gap='8px' flexDirection='column' justifyContent='flex-end'>
                                <DatePicker
                                    selected={date}
                                    onChange={(date: Date | null) => setDate(date)}
                                    dateFormat="yyyy년 MM월 dd일"
                                    customInput={
                                        <CalendarInput
                                            value={date ? date.toLocaleDateString() : ''}
                                            onClick={() => datePickerRef.current?.setOpen(true)}
                                        />
                                    }
                                    ref={datePickerRef} 
                                />
                            </Box>
                            <Typography mt='4px' style={typography.xxSmallReg} color={colors.neutral[45]}>
                                서류 준비중일 경우 지원 마감일을 <br />면접 또는 중간전형 준비 중일 경우 진행일을 입력해주세요.
                            </Typography>
                        </Box>
                    </Box>
                    <Box mb='152px'>
                        <Label label="지원 공고 링크" required={false} />
                        <Textfield
                            showCharCount={false}
                            value={link} 
                            onChange={(e) => setLink(e.target.value)} 
                            placeholder="지원 공고의 링크를 붙여넣기 해주세요."
                        />
                    </Box>
                    </>
                )}
            </Modal>
        </Box>
    );
};

export default DashboardPage;

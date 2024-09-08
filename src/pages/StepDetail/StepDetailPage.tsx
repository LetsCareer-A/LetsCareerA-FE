import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DropdownItem } from '../../components/Dropdown';
import { useParams } from 'react-router-dom';
import CareerMenu from '../../components/CareerMenu'; // CareerMenu import 추가
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Chip from '../../components/Chips';
import Dropdown from '../../components/Dropdown';
import notebook from '../../assets/notebook.png';
import Textfield from '../../components/Textfield';
import AddIcon from '@mui/icons-material/Add';
import banner from '../../assets/banner.png';
import fileImage from '../../assets/ill_file.png';
import Toast from '../../components/Toast';

const items = [
    { 
      text: '공고 진행중', 
      color: '#4D55F5', 
    },
    { 
      text: '최종 합격', 
      color: '#4D55F5', 
    },
    { 
      text: '최종 불합격', 
      color: '#FF566A',
    },
];

const IntroduceBox: React.FC<{
    questionTextFieldValue: string;
    handleQuestionTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    answerTextFieldValue: string;
    handleAnswerTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ questionTextFieldValue, handleQuestionTextFieldChange, answerTextFieldValue, handleAnswerTextFieldChange }) => (
    <Box gap={'8px'} display={'flex'} flexDirection={'column'}>
        <Typography color={colors.neutral[10]} style={typography.xSmallBold}>
            문항 1
        </Typography>
        <Textfield
            placeholder="문항의 제목 또는 기업에서 제시한 문항을 적어주세요"
            value={questionTextFieldValue}
            onChange={handleQuestionTextFieldChange}
            showCharCount={true}
            fullWidth={true}
            maxLength={40}
            height="44px"
        />
        <Textfield
            placeholder="해당 문항에 대한 답변 또는 자기소개 내용을 적어주세요."
            value={answerTextFieldValue}
            onChange={handleAnswerTextFieldChange}
            showCharCount={true}
            fullWidth={true}
            maxLength={1500}
            multiline
            rows={10}
            sx={{ height: '270px' }}
        />
    </Box>
);

const ExperinceBox = () => (
    <Box sx={{ display: 'flex', width: '260px', height: '55px', padding: '16px 8px', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', border: `1px solid ${colors.neutral[85]}`, bgcolor: `${colors.neutral[100]}` }}>
        <AddIcon sx={{ width: '24px', height: '24px' }} />
    </Box>
);

const StepDetailPage = () => {
    const { scheduleId } = useParams<{ scheduleId: string }>();

    const [selectedChip, setSelectedChip] = useState<DropdownItem | null>(null);
    const [questionTextFieldValue, setQuestionTextFieldValue] = useState('');
    const [answerTextFieldValue, setAnswerTextFieldValue] = useState('');
    const [isCareerMenuVisible, setIsCareerMenuVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState(''); // Toast 메시지 상태 추가
    const [toastDescription, setToastDescription] = useState(''); // 추가된 상태


    const handleExperienceBoxClick = () => {
        console.log('핵심경험 사이드바 열기')
        setIsCareerMenuVisible(!isCareerMenuVisible);
    };

    const handleCompleteButtonClick = () => {
        setToastMessage('핵심경험이 추가되었습니다!'); // 토스트 메시지 설정
        setTimeout(() => setToastMessage(''), 3000); // 3초 후 토스트 메시지 숨김
        setIsCareerMenuVisible(false); // CareerMenu 닫기
    };

    const dropdownItems: DropdownItem[] = [
        { text: '공고진행중', color: colors.primary.normal },
        { text: '공고진행예정', color: colors.secondary[30] },
        { text: '공고마감', color: colors.neutral[70] }
    ];

    useEffect(() => {
        // scheduleId에 기반하여 데이터 로드 (예: API 호출)
        fetch(`/api/schedules/${scheduleId}`)
            .then(response => response.json())
            .then(data => {
                // 예: API 응답에서 데이터를 상태로 설정
                setQuestionTextFieldValue(data.question || '');
                setAnswerTextFieldValue(data.answer || '');
            })
            .catch(error => console.error('데이터 로드 오류:', error));
    }, [scheduleId]);

    const handleDropdownSelect = (item: DropdownItem) => {
        setSelectedChip(item);
    };

    const handleQuestionTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionTextFieldValue(event.target.value);
    };

    const handleAnswerTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswerTextFieldValue(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', left: '40px', top: '40px', position: 'relative' }}>
            <Stack spacing={'16px'} direction={'row'} alignItems="center" sx={{ position: 'relative' }}>
                <ArrowBackIosNewIcon />
                <Chip
                    text={'D-4'}
                    backgroundColor={'rgba(81, 119, 255, 0.10)'}
                    textColor={colors.primary.normal}
                    image={notebook}
                    imageWidth="16px"
                    imageHeight="16px"
                />
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    회사이름
                </Typography>
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    |
                </Typography>
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    직무
                </Typography>
                <Box sx={{ position: 'absolute', right: '0' }}>
                    <Dropdown
                        buttonText="준비 단계를 선택해주세요."
                        items={items}
                        renderItem={(item) => <Chip text={item.text} backgroundColor={item.color} image={item.image}/>}
                        onSelect={handleDropdownSelect}
                    />
                </Box>
            </Stack>

            <Stack spacing={'16px'} mt={3}>
                {/* 서류 전형 단계 박스 */}
                <Box sx={{ display: 'flex', width: '1043px', height: '273px', flexDirection: 'column', padding: '25px', borderRadius: '12px', border: `1px solid ${colors.neutral[85]}`, backgroundColor: colors.neutral[100] }}>
                    <Box sx={{display: 'flex', width: '100px', paddingBottom: '4px', flexDirection: 'column', alignItems: 'center', gap: '4px', marginLeft: '23px', marginTop: '28px'}} >
                        <Box sx={{ display: 'flex', width: 100, height: 100, padding: '3px 3px', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', bgcolor: `${colors.primary[80]}`}}>
                            <img src={fileImage} alt="file" style={{ width: '100%', height: '100%' }} />
                        </Box>
                        <Typography color={colors.neutral[10]} style={typography.xSmallMed}>
                            서류전형
                        </Typography>
                        <Typography color={colors.neutral[40]} style={typography.xxSmallReg}>
                            24.08.30
                        </Typography>
                        <Dropdown
                            buttonText={
                                <div className="inline-flex h-7 py-[3px] pl-3 pr-2 justify-center items-center gap-2 flex-shrink-0">
                                    <Typography className="text-sm text-primary-normal">
                                        진행중
                                    </Typography>
                                </div>
                            }
                            items={items}
                            renderItem={(item) => (
                                <div
                                    className={`flex items-center rounded-md px-3 py-1 bg-${item.color} text-primary-normal`}
                                >
                                    {item.text}
                                </div>
                            )}
                            onSelect={handleDropdownSelect}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '1043px',
                        height: '55px',
                        backgroundImage: `url(${banner})`,
                        border: `1px solid ${colors.neutral[95]}`,
                        cursor: 'pointer'
                    }}
                    onClick={() => window.location.href = 'https://www.letscareer.co.kr/program'}
                />

                {/* 배너 및 컨텐츠 */}
                <Stack spacing={'16px'} direction={'row'}>
                    {/* 자기소개서 */}                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '737px', padding: '16px', gap: '10px', border: `1px solid ${colors.neutral[85]}`, backgroundColor: colors.neutral[100] }}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} gap={'16px'}>
                            <Box display={'flex'} flexDirection={'row'} gap={'16px'}  alignItems={'center'}  >
                                <Typography color={colors.neutral[10]} style={typography.smallBold}>
                                    자기소개서
                                </Typography>
                                <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
                                    준비하는 기업의 자기소개서를 미리 써봐요.
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    display: 'flex', 
                                    alignSelf: 'flex-end', // 오른쪽 배치
                                    width: '123px',
                                    height: '32px',
                                    padding: '8px 8px',
                                    gap: '8px',
                                    border: '1px solid transparent', // 기본 투명한 border 설정
                                    borderRadius: '8px',
                                    bgcolor: `${colors.primary[10]}`,
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    lineHeight: '20px',
                                    letterSpacing: '-0.21px',
                                    color: `${colors.primary.normal}`,
                                    boxShadow: 'none', // 그림자 제거
                                    marginRight: '0px !important',
                                    '&:hover': {
                                        border: `1px solid ${colors.primary.normal}`, // 테두리 색상 변경
                                        bgcolor: `${colors.primary[10]}`, // 배경색을 그대로 유지
                                        padding: 'none',
                                        boxShadow: 'none', // 그림자 제거
                                    }
                                }}
                                endIcon={<AddIcon />}
                                onClick={() => alert('문항 추가하기 버튼 클릭됨')} 
                            >
                                문항 추가하기
                            </Button>
                        </Box>
                        <Box gap={'8px'} display={'flex'} flexDirection={'column'}>
                            <IntroduceBox
                                questionTextFieldValue={questionTextFieldValue}
                                handleQuestionTextFieldChange={handleQuestionTextFieldChange}
                                answerTextFieldValue={answerTextFieldValue}
                                handleAnswerTextFieldChange={handleAnswerTextFieldChange}
                            />
                        </Box>
                    </Box>

                    {/* 핵심경험 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '290px', height: '317px', padding: '16px', gap: '15px', borderRadius: '12px', border: isCareerMenuVisible? `1px solid ${colors.primary[30]}`: `1px solid ${colors.neutral[85]}`, backgroundColor: isCareerMenuVisible? ` ${colors.primary[10]}`: colors.neutral[100] }}>
                <Box display={'flex'} flexDirection={'row'} gap={'8px'} alignItems={'center'}>
                    <Typography color={colors.neutral[10]} style={typography.smallBold}>
                        핵심경험
                    </Typography>
                    <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
                        어필할 핵심 경험을 추가해보세요.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '260px',
                            height: '55px',
                            padding: '16px 8px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            border: `1px solid ${colors.neutral[85]}`,
                            bgcolor: `${colors.neutral[100]}`,
                            cursor: 'pointer',
                        }}
                        onClick={handleExperienceBoxClick} // 클릭 이벤트 추가
                    >
                        <AddIcon sx={{ width: '24px', height: '24px' }} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '260px',
                            height: '55px',
                            padding: '16px 8px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            border: `1px solid ${colors.neutral[85]}`,
                            bgcolor: `${colors.neutral[100]}`,
                            cursor: 'pointer',
                        }}
                        onClick={handleExperienceBoxClick} // 클릭 이벤트 추가
                    >
                        <AddIcon sx={{ width: '24px', height: '24px' }} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '260px',
                            height: '55px',
                            padding: '16px 8px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            border: `1px solid ${colors.neutral[85]}`,
                            bgcolor: `${colors.neutral[100]}`,
                            cursor: 'pointer',
                        }}
                        onClick={handleExperienceBoxClick} // 클릭 이벤트 추가
                    >
                        <AddIcon sx={{ width: '24px', height: '24px' }} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '260px',
                            height: '55px',
                            padding: '16px 8px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            border: `1px solid ${colors.neutral[85]}`,
                            bgcolor: `${colors.neutral[100]}`,
                            cursor: 'pointer',
                        }}
                        onClick={handleExperienceBoxClick} // 클릭 이벤트 추가
                    >
                        <AddIcon sx={{ width: '24px', height: '24px' }} />
                    </Box>
                    
                </Box>
            </Box>

            {/* CareerMenu 오버레이 */}
            {isCareerMenuVisible && (
        <CareerMenu
        onClose={() => setIsCareerMenuVisible(false)}
        onComplete={handleCompleteButtonClick} // 완료 버튼 클릭 시 핸들러 추가
      />            )}

                </Stack>
            </Stack>
            {/* Toast 컴포넌트 추가 */}
            {toastMessage && (
                <Toast
                    message={'핵심 경험 등록을 완료했어요!'}
                    description={'정리된 상세 내용을 자세히 보시려면 각 커리어를 클릭해서 확인해보세요.'}
                    onClose={() => setToastMessage('')}
                />
            )}
        </Box>
    );
};

export default StepDetailPage;

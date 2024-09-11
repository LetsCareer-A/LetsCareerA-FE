import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DropdownItem } from '../../components/Dropdown';
import CareerMenu from '../../components/CareerMenu';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Chip from '../../components/Chips';
import Dropdown from '../../components/Dropdown';
import notebook from '../../assets/notebook.png';
import AddIcon from '@mui/icons-material/Add';
import banner from '../../assets/banner.png';
import Toast from '../../components/Toast';
import ReadyState from './components/ReadyState';
// import MidReview from './components/MidReview';
import { useParams } from 'react-router-dom';
import { getSchedules } from '../../api/StepDetail/getSchedules';
import Introduce from './components/Introduce';

// 헤더 드롭다운
const items: DropdownItem[] = [
    { text: '공고 진행중', color: '#4D55F5' },
    { text: '최종 합격', color: '#4D55F5' },
    { text: '최종 불합격', color: '#FF566A' },
];

//핵심커리어 내용
interface ExperienceBoxProps {
    card?: { chipText: string; title: string };
    onClick: () => void;
}
//핵심커리어 박스 컴포넌트
const ExperienceBox: React.FC<ExperienceBoxProps> = ({ card, onClick }) => (
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
            bgcolor: colors.neutral[100],
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        {card ? (
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography style={typography.xSmallBold} color={colors.neutral[10]}>
                    {card.chipText}
                </Typography>
                <Typography style={typography.smallBold} color={colors.neutral[10]}>
                    {card.title}
                </Typography>
            </Box>
        ) : (
            <AddIcon sx={{ width: '24px', height: '24px' }} />
        )}
    </Box>
);


const StepDetailPage: React.FC = () => {
    const { scheduleId } = useParams<{ scheduleId: string }>();
    const [scheduleData, setScheduleData] = useState<any>(null);
    // const [StageData, setStageData ] = useState<any>(null);
    // const [IntroQnAs, setIntroQnAs] = useState<{ question: string; answer: string }[]>([{ question: '', answer: '' }]);
    const [isCareerMenuVisible, setIsCareerMenuVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedCareerCards, setSelectedCareerCards] = useState<{ chipText: string; title: string }[]>([]);
    // const [isAddStateModalOpen, setIsAddStateModalOpen] = useState(false);


    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const data = await getSchedules(Number(scheduleId));
                console.log('Fetched data:', data); // 로그로 데이터 확인
                setScheduleData(data.data);
            } catch (error) {
                console.error('Failed to fetch schedule data:', error);
            }
        };
    
        if (scheduleId) {
            fetchScheduleData();
        }
    }, [scheduleId]);
    

// 면접 전형 추가 모달 관리
// const handleCloseAddStateModal = (selectedStep?: DropdownItem) => {
//     setIsAddStateModalOpen(false);

//     if (selectedStep) {
//         // 상태를 바로 객체 형태로 전달
//         setReadyStates({
//             type: selectedStep.text, // DropdownItem의 text를 type에 할당
//             date: new Date().toISOString(), // 현재 날짜를 ISO 형식으로 설정
//             status: null // DropdownItem의 color를 status에 할당
//         });
//     }
// };

    {/* 핵심경험 관련 이벤트*/}
    const handleExperienceBoxClick = () => {
        setIsCareerMenuVisible((prev) => !prev);
    };

    const handleCompleteButtonClick = (selectedCards: { chipText: string; title: string }[]) => {
     setSelectedCareerCards((prevCards) => [...prevCards, ...selectedCards]); // 상태 업데이트
        setToastMessage('핵심경험이 추가되었습니다!');
        setTimeout(() => setToastMessage(''), 3000);
        setIsCareerMenuVisible(false);
    };

    const handleDropdownSelect = (
        // item: DropdownItem
    ) => {
        // setSelectedStage(item);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Stack spacing="16px" direction="row" alignItems="center" sx={{ position: 'relative' }}>
                {/* 헤더 */}
                <ArrowBackIosNewIcon />
                <Chip
                    text="D-4"
                    backgroundColor="rgba(81, 119, 255, 0.10)"
                    textColor={colors.primary.normal}
                    image={notebook}
                    imageWidth="16px"
                    imageHeight="16px"
                />
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    {scheduleData?.company || '회사명 없음'}
                </Typography>
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    |
                </Typography>
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    {scheduleData?.department || '부서명 없음'}
                </Typography>
                    <Dropdown
                        buttonText={scheduleData?.progress || '진행 상태 없음'}
                        items={items}
                        renderItem={(item) => 
                            <Chip text={item.text} backgroundColor={item.color} />}
                        onSelect={handleDropdownSelect}
                        sx={{ width: 142, height: 44 }}
                    />

            </Stack>

            {/* 전형 준비 상태 */}
            <Stack spacing="16px" mt={3}>
                {/* <ReadyState /> */}
                {/* 배너 */}
                <Box
                    sx={{
                        width: '1043px',
                        height: '55px',
                        backgroundImage: `url(${banner})`,
                        border: `1px solid ${colors.neutral[95]}`,
                        cursor: 'pointer',
                    }}
                    onClick={() => window.location.href = 'https://www.letscareer.co.kr/program'}
                />

                {/* 자기소개서 - 서류전형 진행중 */}
                <Stack spacing="16px" direction="row">
                    {/* 서류전형 - 자기소개서 */}
                    <Introduce />
                    {/* 중간전형 - 회고보드 */}
                    {/* <MidReview/> */}


                    {/*핵심경험*/}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '290px',
                            height: '317px',
                            padding: '16px',
                            gap: '15px',
                            borderRadius: '12px',
                            border: isCareerMenuVisible ? `1px solid ${colors.primary[30]}` : `1px solid ${colors.neutral[85]}`,
                            backgroundColor: isCareerMenuVisible ? colors.primary[10] : colors.neutral[100],
                        }}
                    >
                        <Box display="flex" flexDirection="row" gap="8px" alignItems="center">
                            <Typography color={colors.neutral[10]} style={typography.smallBold}>
                                핵심경험
                            </Typography>
                            <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
                                어필할 핵심 경험을 추가해보세요.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {selectedCareerCards.map((card, index) => (
                                <ExperienceBox key={index} card={card} onClick={() => {}} />
                            ))}
                            <ExperienceBox onClick={handleExperienceBoxClick} />
                        </Box>
                    </Box>

                    {isCareerMenuVisible && (
                        <CareerMenu
                            onClose={() => setIsCareerMenuVisible(false)}
                            onComplete={handleCompleteButtonClick}
                        />
                    )}
                </Stack>
            </Stack>

            {/* 토스트 */}
            {toastMessage && (
                <Toast
                    message="핵심 경험 등록을 완료했어요!"
                    description="정리된 상세 내용을 자세히 보시려면 각 커리어를 클릭해서 확인해보세요."
                    onClose={() => setToastMessage('')}
                />
            )}
        </Box>
    );
};

export default StepDetailPage;

import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DropdownItem } from '../../components/Dropdown';
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
import CoreExperience from './components/CoreExperience';

// 헤더 드롭다운
const items: DropdownItem[] = [
    { text: '공고 진행중', color: '#4D55F5' },
    { text: '최종 합격', color: '#4D55F5' },
    { text: '최종 불합격', color: '#FF566A' },
];



const StepDetailPage: React.FC = () => {
    const { scheduleId } = useParams<{ scheduleId: string }>();
    const [scheduleData, setScheduleData] = useState<any>(null);
    // const [StageData, setStageData ] = useState<any>(null);
    // const [IntroQnAs, setIntroQnAs] = useState<{ question: string; answer: string }[]>([{ question: '', answer: '' }]);
    const [toastMessage, setToastMessage] = useState('');
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
                <ReadyState />
                {/* 배너 */}
                <img
                    src={banner}
                    alt="Banner"
                    style={{
                        width: '1043px',
                        height: '55px',
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
                    <CoreExperience />
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

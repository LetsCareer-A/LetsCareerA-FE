import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DropdownItem } from '../../components/Dropdown';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Chip from '../../components/Chips';
import Dropdown from '../../components/Dropdown';
import notebook from '../../assets/notebook.png';
import banner from '../../assets/banner.png';
import Toast from '../../components/Toast';
import ReadyState from './components/ReadyState';
import MidReview from './components/MidReview';
import { useParams, useNavigate } from 'react-router-dom';
import { getSchedules } from '../../api/StepDetail/getSchedules';
import Introduce from './components/Introduce';
import CoreExperience from './components/CoreExperience';
import useScheduleStore from '../../store/useScheduleStore';
import { putProgress } from '../../api/StepDetail/putProgress';


const items: DropdownItem[] = [
    { text: '공고 진행중', color: '#4D55F5' },
    { text: '최종 합격', color: '#4D55F5' },
    { text: '최종 불합격', color: '#FF566A' },
];

const progressMapping: { [key: string]: string } = {
    '공고 진행중': 'DO',
    '최종 합격': 'PASS',
    '최종 불합격': 'FAIL'
};

const StepDetailPage: React.FC = () => {
    const { scheduleId } = useParams<{ scheduleId: string }>();
    const [scheduleData, setScheduleData] = useState<any>(null);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null); 
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate(); 

    const { schedule, setSchedule, selectedStageId, selectedStageType } = useScheduleStore();

    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const response = await getSchedules(Number(scheduleId));
                console.log('Fetched data:', response);
                setSchedule(response.data);
            } catch (error) {
                console.error('Failed to fetch schedule data:', error);
                setScheduleData('');
            }
        };

        if (scheduleId) {
            fetchScheduleData();
        }
    }, [scheduleId, setSchedule]);


    const handleGoBack = () => {
        navigate(-1); 
    };

    const handleDropdownSelect = async (item: DropdownItem) => {
        console.log('Selected item:', item);
        setSelectedItem(item); 
      
        if (scheduleId) {
            const progress = progressMapping[item.text] || '';
            console.log(progress)
            await putProgress(scheduleId, progress);
            console.log(progress)
            setToastMessage('진행 상태가 업데이트되었습니다.');
        }
  
      };
      

    const getDefaultChipBackgroundColor = () => {
        const progressText = schedule?.progress || '';
        const matchingItem = items.find(item => item.text === progressText);
        return matchingItem ? matchingItem.color : '#4D55F5'; 
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Stack spacing="16px" direction="row" alignItems="center" sx={{ position: 'relative' }}>
                {/* 헤더 */}
                <ArrowBackIosNewIcon onClick={handleGoBack} style={{ cursor: 'pointer' }} />
                <Chip
                    text="D-4"
                    backgroundColor="rgba(81, 119, 255, 0.10)"
                    textColor={colors.primary.normal}
                    image={notebook}
                    imageWidth="16px"
                    imageHeight="16px"
                />
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    {schedule?.company || '회사명 없음'}
                </Typography>
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    |
                </Typography>
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    {schedule?.department || '부서명 없음'}
                </Typography>
                <Dropdown
                    buttonText={selectedItem?.text || '진행 상태 없음'}
                    items={items}
                    alwaysShowChip={true} 
                    defaultChipText={schedule?.progress}
                    defaultChipBackgroundColor={getDefaultChipBackgroundColor()} 
                    renderItem={(item) => 
                        <Chip
                            text={item.text}
                            backgroundColor={item.color}
                        />
                    }
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
                    onClick={() => navigate('/program')} // navigate로 변경
                />
                {/* 자기소개서 - 서류전형 진행중 */}
                <Stack spacing="16px" direction="row">

                {selectedStageType === '서류' && (
                    <Introduce scheduleId={Number(scheduleId)} stageId={selectedStageId || 0} />
                )}

                {selectedStageType === '중간' && (
                    <MidReview scheduleId={Number(scheduleId)} stageId={Number(selectedStageId) || 0} />
                )}

                {selectedStageType === '면접' && (
                    <MidReview scheduleId={Number(scheduleId)} stageId={Number(selectedStageId) || 0} />
                )}

                {/*핵심경험*/}

                {(selectedStageType === '서류' || selectedStageType === '면접')&& (
                    <CoreExperience scheduleId={Number(scheduleId)} stageId={Number(selectedStageId) || 0} />
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

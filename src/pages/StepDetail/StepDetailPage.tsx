import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DropdownItem } from '../../components/Dropdown';
import { useParams } from 'react-router-dom';
import CareerMenu from '../../components/CareerMenu';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Chip from '../../components/Chips';
import Dropdown from '../../components/Dropdown';
import notebook from '../../assets/notebook.png';
import AddIcon from '@mui/icons-material/Add';
import banner from '../../assets/banner.png';
import fileImage from '../../assets/ill_file.png';
import Toast from '../../components/Toast';
import IntroduceBox from './components/IntroduceBox'; // IntroduceBox 컴포넌트 불러오기


const items: DropdownItem[] = [
    { text: '공고 진행중', color: '#4D55F5' },
    { text: '최종 합격', color: '#4D55F5' },
    { text: '최종 불합격', color: '#FF566A' },
];

const Stateitems: DropdownItem[] = [
    { text: '진행중'},
    { text: '진행완료'},
    { text: '합격'},
    { text: '불합격'},
];


interface ExperienceBoxProps {
    card?: { chipText: string; title: string };
    onClick: () => void;
}

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

const StepDetailPage = () => {
    const { scheduleId } = useParams<{ scheduleId: string }>();

    const [selectedChip, setSelectedChip] = useState<DropdownItem | null>(null);
    const [introduceBoxes, setIntroduceBoxes] = useState<{ question: string; answer: string }[] >([{ question: '', answer: '' }]);
    const [isCareerMenuVisible, setIsCareerMenuVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedCareerCards, setSelectedCareerCards] = useState<{ chipText: string; title: string }[]>([]);

    const handleQuestionTextFieldChange = (index: number) => (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
        const updatedBoxes = [...introduceBoxes];
        updatedBoxes[index].question = event.target.value;
        setIntroduceBoxes(updatedBoxes);
    };

    const handleAnswerTextFieldChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
    ) => {
    const updatedBoxes = [...introduceBoxes];
    updatedBoxes[index].answer = event.target.value;
    setIntroduceBoxes(updatedBoxes);
    };

    const handleAddIntroduceBox = () => {
        setIntroduceBoxes([...introduceBoxes, { question: '', answer: '' }]);
      };
    const handleDeleteIntroduceBox = (index: number) => {
    setIntroduceBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== index));
    };
    
    const handleExperienceBoxClick = () => {
        setIsCareerMenuVisible((prev) => !prev);
    };

    const handleCompleteButtonClick = (selectedCards: { chipText: string; title: string }[]) => {
        setSelectedCareerCards((prevCards) => [...prevCards, ...selectedCards]);
        setToastMessage('핵심경험이 추가되었습니다!');
        setTimeout(() => setToastMessage(''), 3000);
        setIsCareerMenuVisible(false);
    };

    useEffect(() => {
        fetch(`/api/schedules/${scheduleId}`)
            .then((response) => response.json())
            .then((data) => {
                setQuestionTextFieldValue(data.question || '');
                setAnswerTextFieldValue(data.answer || '');
            })
            .catch((error) => console.error('데이터 로드 오류:', error));
    }, [scheduleId]);

    const handleDropdownSelect = (item: DropdownItem) => {
        setSelectedChip(item);
    };

    const handleDropdownStateSelect = (Stateitems: DropdownItem) => {
        setSelectedChip(Stateitems);
    };

    // const handleQuestionTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setQuestionTextFieldValue(event.target.value);
    // };

    // const handleAnswerTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAnswerTextFieldValue(event.target.value);
    // };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', left: '40px', top: '40px', position: 'relative' }}>
            <Stack spacing="16px" direction="row" alignItems="center" sx={{ position: 'relative' }}>
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
                        renderItem={(item) => <Chip text={item.text} backgroundColor={item.color} />}
                        onSelect={handleDropdownSelect}
                    />
                </Box>
            </Stack>

            <Stack spacing="16px" mt={3}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '1043px',
                        height: '273px',
                        flexDirection: 'column',
                        padding: '25px',
                        borderRadius: '12px',
                        border: `1px solid ${colors.neutral[85]}`,
                        backgroundColor: colors.neutral[100],
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            content: '""',
                            position: 'absolute',
                            top: '0px',
                            left: '50px',
                            width: '96px',
                            height: '3px',
                            backgroundColor: colors.primary[80],
                            borderRadius: '12px',
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100px',
                            paddingBottom: '4px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            marginLeft: '23px',
                            marginTop: '15px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: 100,
                                height: 100,
                                padding: '3px 3px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '8px',
                                bgcolor: colors.primary[80],
                            }}
                        >
                            <img src={fileImage} alt="file" style={{ width: '100%', height: '100%' }} />
                        </Box>
                        <Typography color={colors.neutral[10]} style={typography.xSmallMed}>
                            서류전형
                        </Typography>
                        <Typography color={colors.neutral[40]} style={typography.xxSmallReg}>
                            24.08.30
                        </Typography>
                        <Dropdown
                            buttonText="진행중"
                            items={Stateitems}
                            renderItem={(Stateitems) => (
                                <div
                                    className={`flex items-center rounded-md px-3 py-1`}
                                    style={{color: colors.primary.normal }}
                                >
                                    {Stateitems.text}
                                </div>
                            )}
                            onSelect={handleDropdownStateSelect}
                            sx={{bgcolor:`${colors.primary[10]}`, color: `${colors.primary.normal}`}}
                        />
                    </Box>
                </Box>

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

                <Stack spacing="16px" direction="row">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '737px',
                            padding: '16px',
                            gap: '10px',
                            border: `1px solid ${colors.neutral[85]}`,
                            backgroundColor: colors.neutral[100],
                        }}
                    >
                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" gap="16px">
                            <Box display="flex" flexDirection="row" gap="16px" alignItems="center">
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
                                    alignSelf: 'flex-end',
                                    width: '123px',
                                    height: '32px',
                                    padding: '8px 8px',
                                    gap: '8px',
                                    border: '1px solid transparent',
                                    borderRadius: '8px',
                                    bgcolor: colors.primary[10],
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    lineHeight: '20px',
                                    letterSpacing: '-0.21px',
                                    color: colors.primary.normal,
                                    boxShadow: 'none',
                                    marginRight: '0px !important',
                                    '&:hover': {
                                        border: `1px solid ${colors.primary.normal}`,
                                        bgcolor: colors.primary[10],
                                        boxShadow: 'none',
                                    },
                                }}
                                endIcon={<AddIcon />}
                                onClick={handleAddIntroduceBox}
                                
                                >
                                문항 추가하기
                            </Button>
                        </Box>
          <Box gap="8px" display="flex" flexDirection="column">
          {introduceBoxes.map((box, index) => (
              <IntroduceBox
                key={index}
                boxNumber={index + 1}
                questionTextFieldValue={box.question}
                handleQuestionTextFieldChange={handleQuestionTextFieldChange(index)}
                answerTextFieldValue={box.answer}
                handleAnswerTextFieldChange={handleAnswerTextFieldChange(index)}
                handleRemoveIntroduceBox={() => handleDeleteIntroduceBox(index)} // 삭제 핸들러 전달
                />
            ))}
          </Box>
          </Box>

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
                            <ExperienceBox onClick={handleExperienceBoxClick} />
                            <ExperienceBox onClick={handleExperienceBoxClick} />
                            <ExperienceBox onClick={handleExperienceBoxClick} />
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

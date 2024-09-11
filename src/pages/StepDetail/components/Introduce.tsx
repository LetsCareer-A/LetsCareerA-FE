import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import IntroQnA from './IntroQnA';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import AddIcon from '@mui/icons-material/Add';
import { putIntroduction } from '../../../api/StepDetail/putIntroduction'; 

const Introduce = ({ scheduleId, stageId }: { scheduleId: number; stageId: number; }) => {
    const [IntroQnAs, setIntroQnAs] = useState<{ question: string; answer: string }[]>([{ question: '', answer: '' }]);

    // 자기소개서 관련 이벤트
    const handleQuestionTextFieldChange = (index: number) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updatedBoxes = [...IntroQnAs];
        updatedBoxes[index].question = event.target.value;
        setIntroQnAs(updatedBoxes);
    };

    const handleAnswerTextFieldChange = (index: number) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updatedBoxes = [...IntroQnAs];
        updatedBoxes[index].answer = event.target.value;
        setIntroQnAs(updatedBoxes);
    };

    const handleAddIntroQnAs = () => {
        setIntroQnAs([...IntroQnAs, { question: '', answer: '' }]);
    };

    const handleDeleteIntroQnAs = (index: number) => {
        setIntroQnAs((prevQnAs) => prevQnAs.filter((_, i) => i !== index));
    };

    // 자동 저장 함수
    const saveIntroduction = async () => {
        const selfIntros = IntroQnAs.map((item, index) => ({
            sequence: index + 1,
            title: item.question,
            content: item.answer
        }));
        try {
            await putIntroduction(scheduleId, stageId, selfIntros);
            // await putIntroduction(50, 50, selfIntros);
        } catch (error) {
            console.error('Failed to save introduction:', error);
        }
    };

    // useEffect를 사용하여 입력이 변경될 때마다 자동 저장
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            saveIntroduction();
        }, 1000); // 1초 지연 후 저장

        // 클린업 함수: 컴포넌트 언마운트 또는 입력 변경 시 타임아웃 취소
        return () => clearTimeout(timeoutId);
    }, [IntroQnAs]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '737px',
                padding: '16px',
                gap: '10px',
                border: `1px solid ${colors.neutral[85]}`,
                backgroundColor: colors.neutral[100],
                justifyContent: 'center'
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
                    onClick={handleAddIntroQnAs}
                >
                    문항 추가하기
                </Button>
            </Box>
            <Box gap="8px" display="flex" flexDirection="column">
                {IntroQnAs.map((box, index) => (
                    <IntroQnA
                        key={index}
                        boxNumber={index + 1}
                        questionTextFieldValue={box.question}
                        handleQuestionTextFieldChange={handleQuestionTextFieldChange(index)}
                        answerTextFieldValue={box.answer}
                        handleAnswerTextFieldChange={handleAnswerTextFieldChange(index)}
                        handleRemoveIntroQnAs={() => handleDeleteIntroQnAs(index)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Introduce;

import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Chip from '../../components/Chips';
import Dropdown from '../../components/Dropdown';
import notebook from '../../assets/notebook.png';
import { DropdownItem } from '../../components/Dropdown';
import Textfield from '../../components/Textfield';
import AddIcon from '@mui/icons-material/Add';
import banner from '../../assets/banner.png';
import fileImage from '../../assets/ill_file.png';

interface DetailProps {
    chipText: string;
    chipBackgroundColor: string;
    chipTextColor: string;
    title: string;
    summary: string; // summary 추가됨
    onClick: () => void;
}

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
            maxRows={10}
            sx={{ height: '270px' }}
        />
    </Box>
);

const ExperinceBox = () => (
    <Box sx={{ display: 'flex', width: '260px', height: '55px', padding: '16px 8px', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', border: `1px solid ${colors.neutral[85]}`, bgcolor: `${colors.neutral[100]}` }}>
        <AddIcon sx={{ width: '24px', height: '24px' }} />
    </Box>
);

const StepDetailPage: React.FC<DetailProps> = ({ chipText, chipBackgroundColor, chipTextColor, title, summary, onClick }) => {
    const [selectedChip, setSelectedChip] = useState<DropdownItem | null>(null);
    // const [typeChip, typeChip] = useState<DropdownItem | null>(null);

    const [questionTextFieldValue, setQuestionTextFieldValue] = useState('');
    const [answerTextFieldValue, setAnswerTextFieldValue] = useState('');

    const dropdownItems: DropdownItem[] = [
        { text: '공고진행중', color: colors.primary.normal },
        { text: '공고진행예정', color: colors.secondary[30] },
        { text: '공고마감', color: colors.neutral[70] }
    ];

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
                    text={chipText}  // chipText 사용
                    backgroundColor={chipBackgroundColor}  // chipBackgroundColor 사용
                    textColor={chipTextColor}  // chipTextColor 사용
                    image={notebook}
                    imageWidth="16px"
                    imageHeight="16px"
                />
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    {title}  // title 사용
                </Typography>
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    |
                </Typography>
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    직무
                </Typography>
                <Box sx={{ position: 'absolute', right: '0' }}>
                    <Dropdown
                        buttonText={selectedChip ? selectedChip.text : '공고상태'}
                        items={dropdownItems}
                        onSelect={handleDropdownSelect}
                        renderItem={(item) => (
                            <Box display="flex" alignItems="center">
                                {item.image && <img src={item.image} alt="" style={{ width: '16px', height: '16px', marginRight: '8px' }} />}
                                {item.text}
                            </Box>
                        )}
                        sx={{ minWidth: '150px' }}
                    />
                </Box>
            </Stack>

            <Stack spacing={'16px'} mt={3}>
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
                            buttonText={selectedChip ? selectedChip.text : '공고상태'}
                            items={dropdownItems}
                            onSelect={handleDropdownSelect}
                            renderItem={(item) => (
                                <Box display="flex" alignItems="center">
                                    {item.image && <img src={item.image} alt="" style={{ width: '16px', height: '16px', marginRight: '8px' }} />}
                                    {item.text}
                                </Box>
                            )}
                            sx={{ minWidth: '150px' }}
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

                <Stack spacing={'16px'} direction={'row'}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '737px', height: '394px', padding: '16px', gap: '10px', border: `1px solid ${colors.neutral[85]}`, backgroundColor: colors.neutral[100] }}>
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'16px'}>
                            <Typography color={colors.neutral[10]} style={typography.smallBold}>
                                자기소개서
                            </Typography>
                            <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
                                준비하는 기업의 자기소개서를 미리 써봐요.
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    width: '123px',
                                    height: '32px',
                                    padding: '8px 8px',
                                    gap: '8px',
                                    borderRadius: '8px',
                                    bgcolor: `${colors.primary[10]}`,
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    lineHeight: '20px',
                                    letterSpacing: '-0.21px',
                                    color: `${colors.primary.normal}`,
                                    marginRight: '0px !important'
                                }}
                                endIcon={<AddIcon />}
                                onClick={onClick}  // onClick 사용
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

                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '290px', height: '317px', padding: '16px', gap: '15px', borderRadius: '12px', border: `1px solid ${colors.neutral[85]}`, backgroundColor: colors.neutral[100] }}>
                        <Box display={'flex'} flexDirection={'row'} gap={'8px'} alignItems={'center'}>
                            <Typography color={colors.neutral[10]} style={typography.smallBold}>
                                핵심경험
                            </Typography>
                            <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
                                어필할 핵심 경험을 추가해보세요.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <ExperinceBox />
                            <ExperinceBox />
                            <ExperinceBox />
                            <ExperinceBox />
                        </Box>
                    </Box>
                </Stack>
            </Stack>

            {/* summary를 화면에 표시 */}
            <Box sx={{ marginTop: '24px' }}>
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    Summary
                </Typography>
                <Typography color={colors.neutral[45]} style={typography.xSmall2Reg}>
                    {summary}  {/* summary 사용 */}
                </Typography>
            </Box>
        </Box>
    );
};

export default StepDetailPage;

import React, { useState } from 'react';
<<<<<<< HEAD
import { Box, Button, Stack, Typography } from '@mui/material';
=======
import { Box, Stack, Typography } from '@mui/material';
>>>>>>> 9258f94 (#37 [Chore] conflict 해결)
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Chip from '../../components/Chips';
import Dropdown from '../../components/Dropdown';
import notebook from '../../assets/notebook.png';
<<<<<<< HEAD
import { DropdownItem } from '../../components/Dropdown'; 
import Textfield from '../../components/Textfield';
import AddIcon from '@mui/icons-material/Add';
import banner from '../../assets/banner.png'

const IntroduceBox = ({ questionTextFieldValue, handleQuestionTextFieldChange, answerTextFieldValue, handleAnswerTextFieldChange }) => (
    <Box gap={'8px'} display={'flex'} flexDirection={'column'}>
        <Typography color={colors.neutral[10]} style={typography.xSmallBold}>
            문항 1
        </Typography>
        <Textfield
            placeholder="문항의 제목 또는 기업에서 제시한 문항을 적어주세요"
            value={questionTextFieldValue}  // 문항 텍스트 필드 값 바인딩
            onChange={handleQuestionTextFieldChange}  // 문항 필드 onChange 핸들러 설정
            showCharCount={true}
            fullWidth={true}
            maxLength={40}
            height="44px"
        />
        <Textfield
            placeholder="해당 문항에 대한 답변 또는 자기소개 내용을 적어주세요."
            value={answerTextFieldValue}  // 답변 텍스트 필드 값 바인딩
            onChange={handleAnswerTextFieldChange}  // 답변 필드 onChange 핸들러 설정
            showCharCount={true}
            fullWidth={true}  // fullWidth는 false로 설정
            maxLength={1500}
            multiline  // 여러 줄 입력을 허용
            rows={10}  // 초기 4줄을 표시
            maxRows={10}  // 최대 10줄까지 확장
            sx={{ height: '270px' }}  
        />
    </Box>
);
=======
import { DropdownItem } from '../../components/Dropdown'; // Ensure this import is correct
>>>>>>> 9258f94 (#37 [Chore] conflict 해결)

const StepDetailPage: React.FC<DetailProps> = ({ chipText, chipBackgroundColor, chipTextColor, title, summary, onClick }) => {
    const [selectedChip, setSelectedChip] = useState<DropdownItem | null>(null);

    // Define dropdown items
    const dropdownItems: DropdownItem[] = [
        { text: '공고진행중', color: colors.primary.normal },
        { text: '공고진행예정', color: colors.secondary[30] },
        { text: '공고마감', color: colors.neutral[70]}
    ];

    const handleDropdownSelect = (item: DropdownItem) => {
        setSelectedChip(item);
    };

<<<<<<< HEAD
const ExperinceBox = () => (
    <Box sx={{ display: 'flex', width: '260px', height: '55px', padding: '16px 8px', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', border: `1px solid ${colors.neutral[85]}`, bgcolor: `${colors.neutral[100]}` }}>
        <AddIcon sx={{ width: '24px', height: '24px' }} />
    </Box>
);

const StepDetailPage: React.FC<DetailProps> = ({ chipText, chipBackgroundColor, chipTextColor, title, summary, onClick }) => {
    const [selectedChip, setSelectedChip] = useState<DropdownItem | null>(null);

    // 각 텍스트 필드에 대해 별도의 상태 관리
    const [questionTextFieldValue, setQuestionTextFieldValue] = useState('');  // 문항 1의 상태
    const [answerTextFieldValue, setAnswerTextFieldValue] = useState('');  // 답변 필드의 상태

    // Define dropdown items
    const dropdownItems: DropdownItem[] = [
        { text: '공고진행중', color: colors.primary.normal },
        { text: '공고진행예정', color: colors.secondary[30] },
        { text: '공고마감', color: colors.neutral[70] }
    ];

    const handleDropdownSelect = (item: DropdownItem) => {
        setSelectedChip(item);
    };

    // 각 필드의 상태 변경 핸들러
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
                    image={notebook}
                    text='D-4'
                    backgroundColor="rgba(81, 119, 255, 0.1)"
                    textColor={colors.primary.normal}
                    imageWidth="16px"
                    imageHeight="16px"
                />
                <Typography color={colors.neutral[10]} style={typography.mediumBold}>
                    삼성전자
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
                        sx={{ minWidth: '150px' }}  // 드롭다운 너비 조정
                    />
                </Box>
            </Stack>
        
=======
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', left: '40px', top: '40px', position: 'relative' }}>
        <Stack spacing={'16px'} direction={'row'} alignItems="center">
          <ArrowBackIosNewIcon />
          <Chip
            image={notebook}
            text='D-4'
            backgroundColor="rgba(81, 119, 255, 0.1)"
            textColor={colors.primary.normal}
            imageWidth="16px"
            imageHeight="16px"
          />
          <Typography color={colors.neutral[10]} style={typography.mediumBold}>
            삼성전자
          </Typography>
          <Typography color={colors.neutral[10]} style={typography.mediumBold}>
            |
          </Typography>
          <Typography color={colors.neutral[10]} style={typography.mediumBold}>
            직무
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
          />
        </Stack>
      
>>>>>>> 9258f94 (#37 [Chore] conflict 해결)
            <Stack spacing={'16px'} mt={3}>
                {/* 서류 전형 단계 박스 */}
                <Box sx={{ display: 'flex', width: '1043px', height: '273px', flexDirection: 'column', padding: '25px', borderRadius: '12px', border: `1px solid ${colors.neutral[85]}`, backgroundColor: colors.neutral[100] }}>
                    <Stack spacing={'4px'} direction={'column'}>
                        <Box sx={{ width: 95, height: 95, marginLeft: '25px', marginTop: '31px', backgroundColor: `${colors.purple}` }}></Box>
                        <Typography color={colors.neutral[10]} style={typography.xSmallMed}>
                            서류전형
                        </Typography>
                        <Typography color={colors.neutral[40]} style={typography.xxSmallReg}>
                            24.08.30
                        </Typography>
                    </Stack>
                </Box>
<<<<<<< HEAD
                <Box
                    sx={{
                        width: '1043px',
                        height: '55px',
                        backgroundImage: `url(${banner})`,
                        border: `1px solid ${colors.neutral[95]}`,
                        cursor: 'pointer'  // 클릭 가능한 커서 모양 추가
                    }}
                    onClick={() => window.location.href = 'https://www.letscareer.co.kr/program'}  // 클릭 시 URL로 이동
                />
=======
>>>>>>> 9258f94 (#37 [Chore] conflict 해결)

                {/* 배너 및 컨텐츠 */}
                <Stack spacing={'16px'} direction={'row'}>
                    {/* 자기소개서 */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '737px', height: '394px', padding: '16px', gap: '10px', border: `1px solid ${colors.neutral[85]}`, backgroundColor: colors.neutral[100] }}>
<<<<<<< HEAD
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={'16px'}>
=======
                        <Box gap={'16px'}>
>>>>>>> 9258f94 (#37 [Chore] conflict 해결)
                            <Typography color={colors.neutral[10]} style={typography.smallBold}>
                                자기소개서
                            </Typography>
                            <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
                                준비하는 기업의 자기소개서를 미리 써봐요.
                            </Typography>
<<<<<<< HEAD
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
                                    marginRight: '0px !important'  // 오른쪽 여백 강제 제거
                                }}
                                endIcon={<AddIcon />}
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
=======
                        </Box>
                        <Box gap={'8px'} display={'flex'} flexDirection={'column'}>
                            <Typography color={colors.neutral[10]} style={typography.xSmallBold}>
                                문항 1
                            </Typography>
                            {/* 텍스트 필드 추가 */}
                        </Box>
                        {/* 텍스트 필드 추가 */}
>>>>>>> 9258f94 (#37 [Chore] conflict 해결)
                    </Box>

                    {/* 핵심경험 */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '290px', height: '317px', padding: '16px', gap: '15px', borderRadius: '12px', border: `1px solid ${colors.neutral[85]}`, backgroundColor: colors.neutral[100] }}>
<<<<<<< HEAD
                        <Box display={'flex'} flexDirection={'row'} gap={'8px'} alignItems={'center'}>
=======
                        <Box gap={'8px'}>
>>>>>>> 9258f94 (#37 [Chore] conflict 해결)
                            <Typography color={colors.neutral[10]} style={typography.smallBold}>
                                핵심경험
                            </Typography>
                            <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
<<<<<<< HEAD
                                어필할 핵심 경험을 추가해보세요.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <ExperinceBox />
                            <ExperinceBox />
                            <ExperinceBox />
                            <ExperinceBox />
=======
                                준비하는 기업의 자기소개서를 미리 써봐요.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {/* Card box 추가 */}
>>>>>>> 9258f94 (#37 [Chore] conflict 해결)
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default StepDetailPage;

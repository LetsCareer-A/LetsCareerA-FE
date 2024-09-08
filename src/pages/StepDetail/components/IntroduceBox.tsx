import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Textfield from '../../../components/Textfield';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import RemoveIcon from '@mui/icons-material/Remove'; // RemoveIcon 추가

interface IntroduceBoxProps {
  questionTextFieldValue: string;
  handleQuestionTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  answerTextFieldValue: string;
  handleAnswerTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  boxNumber: number;
  handleRemoveIntroduceBox: () => void; // IntroduceBox 삭제 핸들러
}

const IntroduceBox: React.FC<IntroduceBoxProps> = ({
  questionTextFieldValue,
  handleQuestionTextFieldChange,
  answerTextFieldValue,
  handleAnswerTextFieldChange,
  boxNumber,
  handleRemoveIntroduceBox,
}) => (
  <Box gap="8px" display="flex" flexDirection="column">
    {/* 문항 번호와 버튼 렌더링 */}
    <Box display="flex" justifyContent="space-between">
      <Typography color={colors.neutral[10]} style={typography.xSmallBold}>
        문항 {boxNumber}
      </Typography>
      {boxNumber > 1 && (
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
            bgcolor: colors.neutral[90],
            fontSize: '13px',
            fontWeight: '500',
            lineHeight: '20px',
            letterSpacing: '-0.21px',
            color: colors.neutral[20],
            boxShadow: 'none',
            '&:hover': {
              border: `1px solid ${colors.neutral[20]}`,
              boxShadow: 'none',
            },
          }}
          endIcon={<RemoveIcon />}
          onClick={handleRemoveIntroduceBox} // 버튼 클릭 시 박스 삭제
        >
          {boxNumber === 1 ? '문항 추가하기' : '문항 삭제하기'}
        </Button>
      )}
    </Box>

    {/* 질문 입력 필드 */}
    <Textfield
      placeholder="문항의 제목 또는 기업에서 제시한 문항을 적어주세요"
      value={questionTextFieldValue}
      onChange={handleQuestionTextFieldChange}
      showCharCount
      fullWidth
      maxLength={40}
      height="44px"
    />

    {/* 답변 입력 필드 */}
    <Textfield
      placeholder="해당 문항에 대한 답변 또는 자기소개 내용을 적어주세요."
      value={answerTextFieldValue}
      onChange={handleAnswerTextFieldChange}
      showCharCount
      fullWidth
      maxLength={1500}
      multiline
      rows={10}
      sx={{ width: '705px', height: '226px' }} // 필드 크기를 705px * 226px로 설정
    />
  </Box>
);

export default IntroduceBox;

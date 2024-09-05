import { Box, Stack, Typography,  } from '@mui/material';
import typograpy from '../../styles/typography';
import colors from '../../styles/colors';
import { purple } from '@mui/material/colors';


const StepDetailPage = () => {
    return (
        <Box sx={{display: 'flex', left: '40px', top: '40px'}}>
            {/* title */}
            <Stack spacing={16}>
                {/* backicon */}
                {/* chip */}
                <Typography color={colors.neutral[10]} style={typograpy.mediumBold}>삼성전자</Typography>
                <Typography color={colors.neutral[10]} style={typograpy.mediumBold}>|</Typography>
                <Typography color={colors.neutral[10]} style={typograpy.mediumBold}>직무</Typography>
                {/* input togle */}
            </Stack>

            <Stack spacing={16} top={25}> 
                {/* 서류 전형 단계 박스 */}
                <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', padding: '25px 25px', borderRadius: '12px', border: `1px solid ${colors.neutral[85]}`, bgcolor: `${colors.neutral[100]}`}}>
                    <Stack spacing={'4px'} direction={'column'}><Box sx={{width: 95, height:95, marginLeft: '25px', marginTop:'31px', bgcolor: `${purple}`}}></Box>
                    <Typography color={colors.neutral[10]} style={typograpy.xSmallMed}>서류전형</Typography>
                    <Typography color={colors.neutral[40]} style={typograpy.xxSmallReg}>24.08.30</Typography>
                    </Stack>
                    {/* chip */}
                </Box>
                {/* 배너 */}
                <Box>

                </Box>
                {/* 컨텐츠 */}
                <Stack spacing={'16px'} direction={'row'}>
                    {/* 자기소개서 */}
                    <Box sx={{display: 'inline-flex', padding: '16px', alignItems: 'center', gap: '10px', border: `1px solid ${colors.neutral[85]}`, bgcolor: `${colors.neutral[100]}`}}>
                        <Box gap={'16px'}>
                            <Typography color={colors.neutral[10]} style={typograpy.smallBold}>자기소개서</Typography>
                            <Typography color={colors.neutral[45]} style={typograpy.xSmall2Med}>준비하는 기업의 자기소개서를 미리 써봐요.</Typography>
                            {/* 문항추가하기 버튼 추가 */}
                        </Box>
                        <Box gap={'8px'} display={'flex'} flexDirection={'column'}>
                            <Typography color={colors.neutral[10]} style={typograpy.xSmallBold}>문항1</Typography>
                            {/* 텍스트필드 추가 */}
                        </Box>
                        {/* 텍스트필드 추가 */}
                    </Box>
                    {/* 핵심경험 */}
                    <Box sx={{display: 'inline-flex', padding: '16px 15px', flexDirection: 'column', justifyContent: 'center', alignItems:'flex-start', gap: '15px', borderRadius:'12px', border: `1px solid ${colors.neutral[85]}`, bgcolor: `${colors.neutral[100]}`}}>
                        <Box gap={'8px'}>
                            <Typography color={colors.neutral[10]} style={typograpy.smallBold}>핵심경험</Typography>
                            <Typography color={colors.neutral[45]} style={typograpy.xSmall2Med}>준비하는 기업의 자기소개서를 미리 써봐요.</Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px'}}>
                            {/* card box 추가 */}
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default StepDetailPage;
import { Box, Stack, Typography,  } from '@mui/material';
import typograpy from '../../styles/typography';
import colors from '../../styles/colors';
import document from 'public/images/document.svg';
import banner from 'public/images/banner.png';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { purple } from '@mui/material/colors';
import Chip from '../../components/Chips';


const StepDetailPage = () => {
    return (
        <Box sx={{display: 'flex', flexDirection:'column', left: '40px', top: '40px'}}>
            {/* 타이틀 */}
            <Stack spacing={'16px'} direction={'row'}>
                <ArrowBackIosNewIcon/>
                <Chip> 
                    
                </Chip>
                <Typography color={colors.neutral[10]} typography={typograpy.mediumBold}>삼성전자</Typography>
                <Typography color={colors.neutral[10]} typography={typograpy.mediumBold}>|</Typography>
                <Typography color={colors.neutral[10]} typography={typograpy.mediumBold}>직무</Typography>
                {/* input togle */}
            </Stack>

            <Stack spacing={'16px'} top={25}> 
                {/* 서류 전형 단계 박스 */}
                <Box sx={{display: 'flex', width: '1043px', height: '273px', flexDirection: 'column', padding: '25px 25px', borderRadius: '12px', border: `1px solid ${colors.neutral[85]}`, bgcolor: `${colors.neutral[100]}`}}>
                    <Stack spacing={'4px'} direction={'column'}><Box sx={{width: 95, height:95, marginLeft: '25px', marginTop:'31px', bgcolor: `${purple}`}}></Box>
                    <Typography color={colors.neutral[10]} typography={typograpy.xSmallMed}>서류전형</Typography>
                    <Typography color={colors.neutral[40]} typography={typograpy.xxSmallReg}>24.08.30</Typography>
                    </Stack>
                    {/* chip */}
                </Box>
                {/* 배너 */}
                <Box>

                </Box>
                {/* 컨텐츠 */}
                <Stack spacing={'16px'} direction={'row'}>
                    {/* 자기소개서 */}
                    <Box sx={{display: 'flex', flexDirection: 'column', width: '737px', height:'394px',  padding: '16px', gap: '10px', border: `1px solid ${colors.neutral[85]}`, bgcolor: `${colors.neutral[100]}`}}>
                        <Box gap={'16px'}>
                            <Typography color={colors.neutral[10]} typography={typograpy.smallBold}>자기소개서</Typography>
                            <Typography color={colors.neutral[45]} typography={typograpy.xSmall2Med}>준비하는 기업의 자기소개서를 미리 써봐요.</Typography>
                            {/* 문항추가하기 버튼 추가 */}
                        </Box>
                        <Box gap={'8px'} display={'flex'} flexDirection={'column'}>
                            <Typography color={colors.neutral[10]} typography={typograpy.xSmallBold}>문항1</Typography>
                            {/* 텍스트필드 추가 */}
                        </Box>
                        {/* 텍스트필드 추가 */}
                    </Box>
                    {/* 핵심경험 */}
                    <Box sx={{display: 'inline-flex', width: '290px', height: '317px', padding: '16px 15px', flexDirection: 'column', alignItems:'flex-start', gap: '15px', borderRadius:'12px', border: `1px solid ${colors.neutral[85]}`, bgcolor: `${colors.neutral[100]}`}}>
                        <Box gap={'8px'}>
                            <Typography color={colors.neutral[10]} typography={typograpy.smallBold}>핵심경험</Typography>
                            <Typography color={colors.neutral[45]} typography={typograpy.xSmall2Med}>준비하는 기업의 자기소개서를 미리 써봐요.</Typography>
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
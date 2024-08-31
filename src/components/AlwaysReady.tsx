import React from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import colors from '../styles/colors';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const ReadyTextStyles = {
    colors : `${colors.neutral[10]}`,
    fontFamily: 'Pretendard',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '-0.096px',
}

const StyledReadyBoard = {
    display: 'flex',
    weight: '100%',
    height: 84,
    padding: '12px 12px',
    border: `1px solid ${colors.neutral[85]}`,
    borderRadius: '8px',
    justifyContent: 'space-betwwen',
    gap: '8px',
    backgroundColor: 'white',
}

const ReadyBoardItem = ({company, department, status}) => ( //API 연결할 때 이 변수 쓰면 됨
        <Box sx={ {...StyledReadyBoard, flexDirection: 'column'}}>
            <Box sx={{display: 'flex', gap:'8px', flexDirection: 'row', marginTop: '5px'}}>
                <Typography sx={ReadyTextStyles}>{company}</Typography>
                <Typography sx={ReadyTextStyles}>|</Typography>
                <Typography sx={ReadyTextStyles}>{department}</Typography>
            </Box>
            <Box sx={{display:'flex', height: '28px', gap:'8px', padding: '0px 12px'}}>
                <CreateOutlinedIcon sx={{width: '16px', 'hegiht': '16px', color: `${colors.primary.normal}`}}/>
                <Typography sx={{color: `${colors.primary.normal}`, fontSize:'14px', letterSpacing: '-0/21px'}}>{status}</Typography>
            </Box>
        </Box>
)

const AlwaysReady = () => {
    const readyBoardData=[
        {company: '삼성전자', department: '마케팅', status:'준비진행중'},
    ];

    return (
        <Box sx={{width: 370, height: 594, flexShrink: 0, borderRadius: '12px', border: `1px solid ${colors.neutral[85]}`, background: `${colors.neutral[100]}`, boxShadow:'0px 0px 25px 0px rgba(0, 0, 0, 0.02)'}}>
            <Box sx={{gap: 16, marginLeft: '16px', marginTop: '16px', flexDirection:'row' }}>
                <Box sx={{gap:'4px'}}>
                    <Typography sx={{color: `${colors.neutral[10]}`, fontSize: '18px', letterSpacing: '-0.022px', fontFamily: 'Pretendard', fontStyle: 'normal'}}>
                        상시 준비 보드
                    </Typography>
                    <Typography sx={{color: `${colors.neutral[40]}`, fontSize: '12px', letterSpacing: '-0.3px', fontFamily: 'Pretendard', fontStyle: 'normal'}}>
                        마감 기한이 없는 채용 공고나 채용 공고가 뜨지 않은 준비 건이에요. 
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', width: 338, height: 452, flexDirection: 'column', gap: '8px'}}>
                    {readyBoardData.map((item, index) => (
                        <ReadyBoardItem
                            key={index}
                            company={item.company}
                            department={item.department}
                            status={item.status}
                        />
                    ))}
                </Box>
                    <Pagination count={5} color="primary" />
            </Box>
        </Box>
    );
};

export default AlwaysReady;

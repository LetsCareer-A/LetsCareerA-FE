import React, { useEffect, useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import colors from '../.././../styles/colors';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import typography from '../../../styles/typography';
import { getAlways } from '../../../api/Dashboard/getAlways'; 
import completeIcon from '../../../assets/complete.svg';

const ReadyTextStyles = {
    colors: `${colors.neutral[10]}`,
    fontFamily: 'Pretendard',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '-0.096px',
};

const StyledReadyBoard = {
    display: 'flex',
    width: '100%',
    height: 84,
    padding: '12px 12px',
    border: `1px solid ${colors.neutral[85]}`,
    borderRadius: '8px',
    justifyContent: 'space-between',
    gap: '8px',
    backgroundColor: 'white',
};

interface ReadyBoardItemProps {
    company: string;
    department: string;
    status: string;
}

const ReadyBoardItem: React.FC<ReadyBoardItemProps> = ({ company, department, status }) => (
    <Box padding='12px' sx={{ ...StyledReadyBoard, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'row' }}>
            <Typography sx={ReadyTextStyles}>{company}</Typography>
            <Typography sx={ReadyTextStyles}>|</Typography>
            <Typography sx={ReadyTextStyles}>{department}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {status === '준비 진행 중' ? (
                <CreateOutlinedIcon sx={{ width: '16px', color: `${colors.primary.normal}` }} />
            ) : (
                <img src={completeIcon} alt='complete'/>
            )}
            <Typography sx={{ color: `${colors.primary.normal}`, display: 'flex', alignItems: 'center' }} style={typography.xSmall2Med}>
                {status}
            </Typography>
        </Box>
    </Box>
);

const AlwaysReady = () => {
    const [readyBoardData, setReadyBoardData] = useState<{ company: string; department: string; status: string }[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAlways();
                if (response.code === 200) {
                    const alwaysData = response.data.always.map((item: { company: string; department: string; status: string }) => ({
                        company: item.company,
                        department: item.department,
                        status: item.status,
                    }));
                    setReadyBoardData(alwaysData);
                    setTotalPages(Math.ceil(response.data.size / 4)); 
                }
            } catch (error) {
                console.error('Failed to fetch always ready data:', error);
            }
        };

        fetchData();
    }, [page]);

    return (
        <Box sx={{ 
            width: '370px', 
            height: '594px', 
            borderRadius: '12px', 
            border: `1px solid ${colors.neutral[85]}`, 
            background: 'white', 
            boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.02)', 
            padding: '16px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
        }}>
            <Box>
                <Typography style={typography.small2Bold}>상시 준비 보드</Typography>
                <Typography mt="4px" mb="16px" style={typography.xxSmallReg} color="#7A7D84">
                    마감 기한 없는 채용이나 채용 공고가 뜨지 않은 준비 건이에요.
                </Typography>
                <Box sx={{ display: 'flex', width: 338, flexDirection: 'column', gap: '8px' }}>
                    {readyBoardData.map((item, index) => (
                        <ReadyBoardItem key={index} company={item.company} department={item.department} status={item.status} />
                    ))}
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={totalPages}
                    color="primary"
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            fontSize: '14px',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default AlwaysReady;

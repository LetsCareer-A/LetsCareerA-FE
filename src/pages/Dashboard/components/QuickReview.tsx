import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import ReactPaginate from 'react-paginate';
import { useTheme } from '@mui/material';
import '../../../styles/pagination.css'; // CSS 파일 임포트

// 예시 아이템 데이터
const items = Array.from({ length: 10 }, (_, index) => `아이템 ${index + 1}`);

const QuickReview: React.FC = () => {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        setPage(event.selected);
    };

    // 현재 페이지에 맞는 아이템들만 필터링
    const currentItems = items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <Box 
            p='12px' 
            width='181px' 
            sx={{
                background: colors.primary[10],
                borderRadius: '12px',
                border: `1px solid ${colors.primary[30]}`,
                boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.02)'
            }}
        >
            <Box display='flex' gap='8px' alignItems='center'>
                <Typography style={typography.small2Bold} color='#2A2D34'>빠른 회고</Typography>
                <Typography 
                    style={typography.xSmallBold}
                    sx={{ color: theme.palette.primary.main }}
                >
                    {items.length}건
                </Typography>
            </Box>
            <Typography 
                style={typography.xSmall2Med} 
                color='#5C5F66' 
                sx={{ marginBottom: '8px' }}
            >
                면접 또는 중간 전형 당일부터 3일 후까지 보여드려요.
            </Typography>
            {/* 아이템 목록 */}
            <Box>
                {currentItems.map((item, index) => (
                    <Box
                    key={index} 
                    height='62px'
                    sx={{
                        background: 'white',
                        display: 'flex',
                        flexDirection: 'column', 
                        gap: '8px', 
                        borderRadius: '12px',
                        mb: '8px'
                    }}
                >
                    <Typography 
                        key={index} 
                        style={typography.xSmallMed} 
                        color='#2A2D34'
                        sx={{ marginBottom: '4px' }}
                    >
                        {item}
                    </Typography>
                    </Box>
                ))}
            </Box>
            {/* 페이지네이션 */}
            <Box display='flex' justifyContent='center' mt='16px' width='100%'>
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                    disabledClassName={'disabled'}
                    previousLabel={<span>&lt;</span>} // 이전 페이지 텍스트
                    nextLabel={<span>&gt;</span>}     // 다음 페이지 텍스트
                />
            </Box>
        </Box>
    );
};

export default QuickReview;

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import ReactPaginate from 'react-paginate';
import { useTheme } from '@mui/material';
import '../../../styles/pagination.css';
import { getFastReview } from '../../../api/Dashboard/getFastReview';
import Edit from '../../../assets/edit_pencil.png';
import WritingModal from '../../Reviews/components/WritingModal';
import Toast from '../../../components/Toast';

const QuickReview: React.FC = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [fastReviews, setFastReviews] = useState<any[]>([]); 
    const itemsPerPage = 4; 
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<any>(null); 
    const [showToast, setShowToast] = useState(false); 
    const [toastMessage, setToastMessage] = useState(''); 
    const [toastDescription, setToastDescription] = useState(''); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFastReview(page + 1, itemsPerPage); 
                if (response && response.data) {
                    setFastReviews(response.data.fastReviews || []); 
                    setTotalPages(Math.ceil(response.data.total / itemsPerPage)); 
                    setTotal(response.data.total);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setFastReviews([]);
            }
        };
        fetchData();
    }, [page]);

    useEffect(() => {
        if (!modalOpen) {
            // 모달이 닫히면 데이터를 다시 불러옵니다.
            const fetchData = async () => {
                try {
                    const response = await getFastReview(page + 1, itemsPerPage); 
                    if (response && response.data) {
                        setFastReviews(response.data.fastReviews || []); 
                        setTotalPages(Math.ceil(response.data.total / itemsPerPage)); 
                        setTotal(response.data.total);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setFastReviews([]);
                }
            };
            fetchData();
        }
    }, [modalOpen, page]);

    const handlePageClick = (event: { selected: number }) => {
        setPage(event.selected); 
    };

    const handleEditClick = (review: any) => {
        setSelectedReview(review); 
        setModalOpen(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);  
    };

    const handleConfirm = async () => {
        if (selectedReview) {
            console.log(selectedReview)
            try {
                const reviewType = selectedReview.type === '면접' ? '면접 회고' : '중간 전형 회고'; 
                setToastMessage(`'${selectedReview.company} ${selectedReview.department}' ${reviewType}를 완료했어요!`);
                setToastDescription('조금 더 성장에 한 걸음 가까워졌어요 :)');

                setModalOpen(false);
                setShowToast(true); 
                
            } catch (error) {
                console.error('회고 제출 오류:', error);
            }
        } else {
            console.error('Selected review is missing');
        }
    };

    return (
        <Box 
            p='12px' 
            width='181px' 
            height='432px'
            sx={{
                background: colors.primary[10],
                borderRadius: '12px',
                border: `1px solid ${colors.primary[30]}`,
                boxShadow: '0px 0px 25px 0px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box display='flex' gap='8px' alignItems='center'>
                <Typography style={typography.small2Bold} color='#2A2D34'>빠른 회고</Typography>
                <Typography 
                    style={typography.xSmallBold}
                    sx={{ color: theme.palette.primary.main }}
                >
                    {total}건
                </Typography>
            </Box>
            <Typography 
                style={typography.xSmall2Med} 
                color='#5C5F66' 
                sx={{ marginBottom: '8px' }}
            >
                면접 또는 중간 전형 당일부터 3일 후까지 보여드려요.
            </Typography>
            <Box display='flex' flexDirection='column' gap='8px' flexGrow={1}>
                {fastReviews.length > 0 ? (
                    fastReviews.map((review, index) => (
                        <Box key={index}>
                            <Box
                                height='62px'
                                sx={{
                                    background: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',  
                                    borderRadius: '12px',
                                    p: '8px'
                                }}
                            >
                                <Box display='flex' gap='22px' alignItems='center' justifyContent='space-between'>
                                    <Box>
                                        <Typography 
                                            style={typography.xSmallMed} 
                                            color='#2A2D34'
                                            sx={{
                                                whiteSpace: 'nowrap',      
                                                overflow: 'hidden',       
                                                textOverflow: 'ellipsis',   
                                                width: '99px'  
                                            }}
                                        >
                                            {review.company}
                                        </Typography>
                                        <Typography 
                                            style={typography.xSmall2Reg} 
                                            color='#7A7D84' 
                                            sx={{
                                                whiteSpace: 'nowrap',     
                                                overflow: 'hidden',       
                                                textOverflow: 'ellipsis',
                                                width: '99px'   
                                            }}
                                        >
                                            {review.department}
                                        </Typography>
                                    </Box>
                                    <img 
                                        src={Edit} 
                                        style={{width: '20px', height: '20px', cursor: 'pointer'}} 
                                        onClick={() => handleEditClick(review)} 
                                        alt='Edit'
                                    />       
                                </Box>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography
                        style={typography.xSmallBold} 
                        color='#7A7D84' 
                        textAlign='center'
                    >
                        데이터가 없습니다.
                    </Typography>
                )}
            </Box>
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
                    previousLabel={<span>&lt;</span>} 
                    nextLabel={<span>&gt;</span>}    
                />
            </Box>

            <WritingModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                reviewType={selectedReview ? (selectedReview.type === '면접' ? '면접 회고' : '중간 전형 회고') : null}
                onConfirm={handleConfirm}
                selectedReview={selectedReview}
            />
            {showToast && (
                <Toast
                    message={toastMessage}
                    description={toastDescription}
                    onClose={handleCloseToast}
                />
            )}
        </Box>
    );
};

export default QuickReview;

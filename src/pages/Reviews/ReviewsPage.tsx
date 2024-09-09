import { useState, useEffect } from 'react';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import { Box, Typography, Stack, Pagination, Modal } from '@mui/material';
import BoardGather from './components/BoardGather';
import ReviewModal from './components/ReviewModal';
import { getReviews } from '../../api/Reviews/getReviews';

interface Review {
  type: string;
  freeReview: string;
}

interface Company {
  company: string;
  department: string;
  reviews: Review[];
}

const ReviewPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleOpen = (company: Company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCompany(null);
  };

  const fetchCompanyData = async (pageNumber: number) => {
    try {
      const response = await getReviews(pageNumber, 3); // 페이지와 사이즈는 필요에 따라 조정
      const { total, companies } = response.data;

      // 페이지 수 계산
      const totalPageCount = Math.ceil(total / 5); // size를 5로 설정

      // 데이터 변환
      const transformedData: Company[] = companies.map((company: any) => {
        const reviews: Review[] = [
          ...company.interviewReviews.map((review: any) => ({
            type: '면접 회고',
            freeReview: review.isReviewed ? `면접 회고가 있습니다. (기한: ${review.deadline})` : '면접 회고가 없습니다.',
            department: review.department
          })),
          ...company.midtermReviews.map((review: any) => ({
            type: '중간 전형 회고',
            freeReview: review.isReviewed ? `중간 전형 회고가 있습니다. (기한: ${review.deadline})` : '중간 전형 회고가 없습니다.',
            department: review.department
          }))
        ];

        return {
          company: company.company,
          department: reviews.length > 0 ? reviews[0].department : '',
          reviews
        };
      });

      setCompanyData(transformedData);
      setTotalPages(totalPageCount); // 페이지 수 업데이트
    } catch (error) {
      console.error('Error fetching company data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData(page);
  }, [page]);

  if (loading) {
    return <p>Loading...</p>; // 로딩 상태 처리
  }

  return (
    <Box>
      {/* 페이지 상단의 제목 및 설명 */}
      <Stack spacing={4}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '32px',
            marginTop: '40px',
            marginLeft: '40px',
            gap: '16px',
            alignItems:'center'
          }}
        >
          <Typography sx={{ typography: typography.mediumBold, marginLeft: '12px' }}>회고 관리</Typography>
          <Typography sx={{ typography: typography.small2Reg, color: colors.neutral[40] }}>
            기업별로 진행한 회고를 볼 수 있어요
          </Typography>
        </Box>

        {/* 회고록 박스 나열 */}
        <Stack direction="row" spacing={2}>
          {companyData.map((item, index) => (
            <Box key={index} onClick={() => handleOpen(item)}>
              <BoardGather
                company={item.company}
                department={item.department}
                reviews={item.reviews}
              />
            </Box>
          ))}
        </Stack>
      </Stack>

      {/* 페이지 네이션 중앙 정렬 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '14px',
              alignItems: 'center',
            },
          }}
        />
      </Box>

      {/* 모달 창 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ReviewModal companyData={selectedCompany} handleClose={handleClose} />
      </Modal>
    </Box>
  );
};

export default ReviewPage;

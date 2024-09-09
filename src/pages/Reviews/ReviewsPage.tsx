import { Box, Typography, Pagination, Modal } from '@mui/material';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import BoardGather from './components/BoardGather';
import ReviewModal from './components/ReviewModal';
import { getReviews } from '../../api/Reviews/getReviews';
import { useState, useEffect } from 'react';

interface Review {
  type: string;
  freeReview: string;
  isReviewed: boolean;
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
      const response = await getReviews(pageNumber, 3);
      const { total, companies } = response.data;

      const totalPageCount = Math.ceil(total / 3);

      const transformedData: Company[] = companies.map((company: any) => {
        const reviews: Review[] = [
          ...company.interviewReviews.map((review: any) => ({
            type: '면접 회고',
            freeReview: review.isReviewed ? (
              `${review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 면접입니다.`
            ) : (
              <>
                {review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 면접입니다.
                <br />
                아직 진행되지 않은 회고입니다.
              </>
            ),
            isReviewed: review.isReviewed
          })),
          ...company.midtermReviews.map((review: any) => ({
            type: '중간 전형 회고',
            freeReview: review.isReviewed ? (
              `${review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 중간 전형입니다.`
            ) : (
              <>
                {review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 중간 전형입니다.
                <br />
                아직 진행되지 않은 회고입니다.
              </>
            ),
            isReviewed: review.isReviewed
          }))
        ];

        return {
          ...company,
          reviews
        };
      });

      setCompanyData(transformedData);
      setTotalPages(totalPageCount);
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
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '32px',
          gap: '16px',
          alignItems: 'center'
        }}
      >
        <Typography sx={{ typography: typography.mediumBold}}>회고 관리</Typography>
        <Typography sx={{ typography: typography.small2Reg, color: colors.neutral[40] }}>
          기업별로 진행한 회고를 볼 수 있어요
        </Typography>
      </Box>

      <Box
        display='grid'
        gridTemplateColumns='repeat(3, 1fr)'
        gap='16px'
        mt='32px'
        height='auto' 
      >
        {companyData.map((item, index) => (
          <Box key={index} onClick={() => handleOpen(item)}>
            <BoardGather
              company={item.company}
              department={item.department}
              reviews={item.reviews}
              onClick={() => handleOpen(item)}
            />
          </Box>
        ))}
      </Box>

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

      {/* Modal Component */}
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

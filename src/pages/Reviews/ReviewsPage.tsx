import { Box, Typography, Pagination } from '@mui/material';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import BoardGather from './components/BoardGather';
import { useEffect } from 'react';
import useReviewStore from '../../store/useReviewStore';

const ReviewPage = () => {
  const { companyData, totalPages, page, fetchCompanyData, setPage } = useReviewStore();


  useEffect(() => {
    fetchCompanyData(page);
  }, [page]);


  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '1048px',
          height: '32px',
          gap: '16px',
          alignItems: 'center'
        }}
      >
        <Typography sx={{ typography: typography.mediumBold }}>회고 관리</Typography>
        <Typography sx={{ typography: typography.small2Reg, color: colors.neutral[40] }}>
          기업별로 진행한 회고를 볼 수 있어요
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="16px"
        mt="32px"
        height="auto"
      >
        {companyData.map((item, index) => (
          <Box key={index}>
            <BoardGather
              company={item.company}
              department={item.department}
              reviews={item.reviews}
            />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '14px',
              alignItems: 'center'
            }
          }}
        />
      </Box>

    </Box>
  );
};

export default ReviewPage;

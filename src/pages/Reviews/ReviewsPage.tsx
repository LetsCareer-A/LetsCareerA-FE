import { Box, Typography, Pagination, Modal } from '@mui/material';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import BoardGather from './components/BoardGather';
import ReviewModal from './components/ReviewModal';
import { useEffect, useState } from 'react';
import useReviewStore from '../../store/useReviewStore';

const ReviewPage = () => {
  const { companyData, totalPages, page, fetchCompanyData, setPage } = useReviewStore();
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleOpen = (company: Company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCompany(null);
  };

  useEffect(() => {
    fetchCompanyData(page);
  }, [page]);


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
              alignItems: 'center'
            }
          }}
        />
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <ReviewModal companyData={selectedCompany} handleClose={handleClose} />
      </Modal>
    </Box>
  );
};

export default ReviewPage;

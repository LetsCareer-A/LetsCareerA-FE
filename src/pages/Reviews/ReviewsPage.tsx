import { useState } from 'react';
import typography from '../../styles/typography';
import colors from '../../styles/colors';
import { Box, Typography, Stack, Pagination, Modal } from '@mui/material';
import BoardGather from './components/BoardGather';
import ReviewModal from './components/ReviewModal';

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

  const companyData = [
    { company: '네이버', department: 'UI 엔지니어', reviews: [{ type: '중간 전형 회고', freeReview: '이 회사의 UI 엔지니어는 매우 만족스럽습니다.' }] },
    { company: '삼성', department: '프론트엔드', reviews: [{ type: '면접 회고', freeReview: '프론트엔드 개발 환경이 불편했습니다.' }] },
    { company: '엘지', department: '백엔드', reviews: [{ type: '중간 전형 회고', freeReview: '백엔드 업무가 매우 힘들었습니다.' }] }
  ];

  const handleOpen = (company: Company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCompany(null);
  };

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
            gap: '16px'
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
          count={5}
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

import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';
import colors from '../../../styles/colors';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  company: string;
  department: string;
  reviews: Array<{ type: string; freeReview: string }>;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, company, department, reviews }) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '400px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>{company} - {department}</Typography>
        {reviews.map((review, index) => (
          <Box key={index} sx={{ marginBottom: '16px' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{review.type}</Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[50] }}>{review.freeReview}</Typography>
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ReviewModal;

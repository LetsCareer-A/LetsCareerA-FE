// MidReview.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';

import ReviewQuestion from './ReviewQuestion';
import UploadReview from './UploadReview';

import { getMidDetail } from '../../../api/StepDetail/getMidDetail'; // 중간 전형 단계 API 호출 함수 import
import { getIntDetail } from '../../../api/StepDetail/getIntDetail';
import useScheduleStore from '../../../store/useScheduleStore';
import { getSchedules } from '../../../api/StepDetail/getSchedules';


interface MidReviewProps {
  scheduleId: number;
  stageId: number;
}

const MidReview: React.FC<MidReviewProps> = ({ scheduleId, stageId }) => {
  const [reviewAvailable, setReviewAvailable] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewMid, setReviewMid] = useState<any>(null);
  const [reviewInt, setReviewInt] = useState<any>(null);
  const { schedule, setSchedule, selectedStageId, selectedStageType } = useScheduleStore();

  {/* 로직 */}
  {/* 로직 */}

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (selectedStageType === '중간') { 
          const response = await getMidDetail(Number(scheduleId), stageId);
          console.log("중간 api", response.data)
          if (response.data) {
            setReviewAvailable(response.data.reviewAvailable);
            if (response.data.review) {
              setReviewMid(response.data.review); // 중간 전형 회고 데이터 설정
            }
          }
        } else if (selectedStageType === '면접') {
          const response = await getIntDetail(scheduleId, stageId);
          if (response.data) {
            setReviewAvailable(response.data.reviewAvailable);
            if (response.data.review) {
              setReviewInt(response.data.review); // 면접 전형 회고 데이터 설정
              setReviews(response.data.appealCareers || []); // 어필 커리어 목록 설정
            }
          }
        } else { 
          console.warn('알 수 없는 전형 타입:', selectedStageType);
        }
      } catch (error) {
        console.error('회고 데이터 불러오기 실패:', error);
      }
    };
    fetchDetails();
  }, [scheduleId, stageId, selectedStageType]);

  console.log(reviewMid,'midReview')

  return ( 
    <Box display="flex" flexDirection="column" justifyContent="space-between" gap="16px">
      <Box display="flex" flexDirection="row" gap="16px" alignItems="center">
        <Typography color={colors.neutral[10]} style={typography.smallBold}>
          회고보기
        </Typography>
        <Typography color={colors.neutral[45]} style={typography.xSmall2Med}>
          {reviewAvailable ==false ? '작성된 회고를 확인해보세요.' : '아직 회고를 진행하지 않았어요.'}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '737px',
          height: '384px',
          borderRadius: '8px',
          border: `1px solid ${colors.neutral[85]}`,
          bgcolor: colors.neutral[100],
          overflowY: 'auto',
        }}
      >
        <Box display="flex" flexDirection="column" gap="32px" padding="15px 24px">
          {reviewAvailable ==false ? (
            <>
              {selectedStageType === '중간' && reviewMid ? (
                <ReviewQuestion review={reviewMid} stageType="중간" />
              ) : selectedStageType === '면접' && reviewInt ? (
                <ReviewQuestion review={reviewInt} stageType="면접" />
              ) : (
                <UploadReview
                  scheduleId={scheduleId}
                  stageId={stageId}
                  reviewAvailable={reviewAvailable}
                  setReviewAvailable={setReviewAvailable} // 상태 변경 함수를 전달
                  selectedStageType={selectedStageType==='중간' ? '중간 전형 회고' : '면접 회고' }
                />
              )}
            </>
          ) : (
            <UploadReview
              scheduleId={scheduleId}
              stageId={stageId}
              reviewAvailable={reviewAvailable}
              setReviewAvailable={setReviewAvailable} // 상태 변경 함수를 전달
              selectedStageType={selectedStageType==='중간' ? '중간 전형 회고' : '면접 회고' }
              />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MidReview;

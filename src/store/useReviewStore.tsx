import create from 'zustand';
import { getReviews } from '../api/Reviews/getReviews';

export interface Review {
  type: string;
  freeReview: string;
  isReviewed: boolean;
  scheduleId: number;
  stageId: number;
  reviewId: number | null;
}
interface Company {
  company: string;
  department: string;
  reviews: Review[];
}

interface ReviewStore {
  companyData: Company[];
  totalPages: number;
  page: number;
  fetchCompanyData: (pageNumber: number) => Promise<void>;
  setPage: (page: number) => void;
}

const useReviewStore = create<ReviewStore>((set) => ({
  companyData: [],
  totalPages: 1,
  page: 1,

  fetchCompanyData: async (pageNumber: number) => {
    try {
      const response = await getReviews(pageNumber, 3);
      const { total, companies } = response.data;

      const totalPageCount = Math.ceil(total / 3);

      const transformedData: Company[] = companies.map((company: any) => {
        const reviews: Review[] = [
          ...company.interviewReviews.map((review: any) => ({
            type: '면접 회고',
            freeReview: `${review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 면접입니다.`,

            isReviewed: review.isReviewed,
            scheduleId: review.scheduleId,
            stageId: review.stageId,
            reviewId: review.reviewId,
          })),
          ...company.midtermReviews.map((review: any) => ({
            type: '중간 전형 회고',
            freeReview: `${review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 중간 전형입니다.`,
            isReviewed: review.isReviewed,
            scheduleId: review.scheduleId,
            stageId: review.stageId,
            reviewId: review.reviewId
          }))
        ];

        return {
          company: company.company,
          department: company.department,
          reviews
        };
      });

      set({ companyData: transformedData, totalPages: totalPageCount });
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  },

  setPage: (page: number) => set({ page })
}));

export default useReviewStore;

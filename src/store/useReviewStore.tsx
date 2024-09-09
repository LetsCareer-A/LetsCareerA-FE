import create from 'zustand';
import { getReviews } from '../api/Reviews/getReviews';

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

interface ReviewStore {
  companyData: Company[];
  totalPages: number;
  loading: boolean;
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
            freeReview: review.isReviewed
              ? `${review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 면접입니다.`
              : `${review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 면접입니다. 아직 진행되지 않은 회고입니다.`,
            isReviewed: review.isReviewed
          })),
          ...company.midtermReviews.map((review: any) => ({
            type: '중간 전형 회고',
            freeReview: review.isReviewed
              ? `${review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 중간 전형입니다.`
              : `${review.deadline ? review.deadline : '날짜가 설정되지 않은 일자'}에 진행된 중간 전형입니다. 아직 진행되지 않은 회고입니다.`,
            isReviewed: review.isReviewed
          }))
        ];

        return {
          ...company,
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

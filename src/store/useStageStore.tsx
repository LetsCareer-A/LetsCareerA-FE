import create from 'zustand';

// 스테이지 데이터 타입 정의
interface Stage {
  stageId: number;
  order?: number;
  type: string;
  mid_name?: string;
  status: string; // "준비 진행 중", "진행 완료"
  date: string;
  dday?: string;
}

// 스토어 인터페이스 정의
interface StageStore {
  stages: Stage[]; // 여러 단계 정보 관리
  setStages: (newStages: Stage[]) => void; // 상태 초기화
  updateStageStatus: (stageId: number, newStatus: string) => void; // 스테이지 상태 업데이트
}

const useStageStore = create<StageStore>((set) => ({
  stages: [], // 초기 스테이지 상태 (빈 배열)
  
  // 스테이지 초기화 함수 (API 호출 후 설정)
  setStages: (newStages) => set({ stages: newStages }),
  
  // 특정 스테이지의 상태를 업데이트하는 함수
  updateStageStatus: (stageId, newStatus) => 
    set((state) => ({
      stages: state.stages.map(stage => 
        stage.stageId === stageId 
          ? { ...stage, status: newStatus } 
          : stage
      )
    })),
}));


export default useStageStore;

// // 사용하는 컴포넌트
// const StageManager = () => {
//   const { stages, setStages, updateStageStatus } = useStageStore();

//   // API 데이터로 스테이지 초기화 (가정)
//   const initializeStages = () => {
//     const apiResponse = {
//       data: {
//         stages: [
//           {
//             stageId: 1,
//             order: 1,
//             type: '서류',
//             mid_name: '',
//             status: '진행 완료',
//             date: '2024-08-30',
//             dday: '3',
//           },
//           {
//             stageId: 2,
//             order: 2,
//             type: '중간',
//             mid_name: '직무적성검사',
//             status: '준비 진행 중',
//             date: '2024-09-03',
//             dday: '5',
//           },
//         ],
//       },
//     };

//     // 스테이지 데이터를 상태로 설정
//     setStages(apiResponse.data.stages);
//   };

//   // 스테이지 상태 업데이트 예시
//   const handleChangeStatus = (stageId: number, newStatus: string) => {
//     updateStageStatus(stageId, newStatus);
//     // 여기에 API로 업데이트된 상태를 전송하는 로직 추가 가능
//     console.log(`Stage ID ${stageId}의 상태가 ${newStatus}(으)로 변경되었습니다.`);
//   };

//   return (
//     <div>
//       <button onClick={initializeStages}>스테이지 초기화</button>
//       {stages.map((stage) => (
//         <div key={stage.stageId}>
//           <h3>{stage.type} - {stage.status}</h3>
//           <button onClick={() => handleChangeStatus(stage.stageId, '진행 완료')}>
//             상태를 '진행 완료'로 변경
//           </button>
//           <button onClick={() => handleChangeStatus(stage.stageId, '준비 진행 중')}>
//             상태를 '준비 진행 중'으로 변경
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StageManager;

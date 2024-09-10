import { FaInstagram } from "react-icons/fa";
import { FaMicroblog } from "react-icons/fa";
import Logo from '../assets/Logo.svg'


const Footer = () => {
    return (
        <div className="w-full h-96 bg-[#efefef] justify-center items-center inline-flex">
        <div className="flex flex-col items-start self-stretch justify-start gap-8 px-5 pt-10 pb-6 h-96">
          <div className="flex flex-col items-start self-stretch justify-start h-72 gap-7">
            <div className="inline-flex items-start self-stretch justify-start gap-48">
              <div className="inline-flex flex-col items-start justify-start gap-5 w-80">
                <div className="flex flex-col items-center justify-start">
                  <div className="w-32 h-9 justify-start items-center gap-1.5 inline-flex">
                    <div className="relative w-8 h-8" />
                    <img className="w-32 h-9" src={Logo} alt="Logo" />
                    <div className="relative w-20 h-9" />
                  </div>
                </div>
                <div className="flex flex-col items-start self-stretch justify-start gap-2 h-44">
                  <div className="inline-flex items-start justify-start gap-2">
                    <div className="text-[#989ba2] text-xs font-medium font-['Pretendard'] leading-none">아이앤지 사업자 정보</div>
                  </div>
                  <div className="inline-flex items-start self-stretch justify-start gap-2">
                    <div className="text-[#989ba2] text-xs font-medium font-['Pretendard'] leading-none">대표자: 송다예</div>
                      <div className="relative w-px h-4">
                        <div className="w-px h-2.5 left-0 top-[3.60px] absolute flex-col justify-center items-center inline-flex">
                          <div className="w-px grow shrink basis-0 bg-[#d7d7d7]" />
                        </div>
                      </div>
                    <div className="text-[#989ba2] text-xs font-medium font-['Pretendard'] leading-none">사업자등록번호: 871-11-02629</div>
                  </div>
                  <div className="inline-flex items-start self-stretch justify-start gap-2">
                    <div className="text-[#989ba2] text-xs font-medium font-['Pretendard'] leading-none">통신판매업신고번호 제 2024-서울마포-2221호</div>
                      <div className="relative w-px h-4">
                        <div className="w-px h-2.5 left-0 top-[3.60px] absolute flex-col justify-center items-center inline-flex">
                          <div className="w-px grow shrink basis-0 bg-[#d7d7d7]" />
                        </div>
                      </div>
                    </div>
                  
                    <div className="inline-flex flex-col items-start self-stretch justify-start gap-2">
                    <div className="flex items-center justify-start h-4 gap-2">
                      <div className="text-[#989ba2] text-xs font-medium font-['Pretendard'] leading-none">주소: 서울특별시 마포구 독막로 9길 18, 서홍빌딩 3층 A9호</div>
                      <div className="relative w-px h-4">
                        <div className="w-px h-2.5 left-0 top-[3.60px] absolute flex-col justify-center items-center inline-flex">
                          <div className="w-px grow shrink basis-0 bg-[#d7d7d7]" />
                        </div>
                      </div>
                      </div>
                      <div className="flex items-center justify-start h-4 gap-2">
                      <div className="text-[#989ba2] text-xs font-medium font-['Pretendard'] leading-none">이메일: official@letscareer.co.kr</div>
                      <div className="relative w-px h-4">
                        <div className="w-px h-2.5 left-0 top-[3.60px] absolute flex-col justify-center items-center inline-flex">
                          <div className="w-px grow shrink basis-0 bg-[#d7d7d7]" />
                        </div>
                      </div>
                      </div>
                      <div className="flex items-center justify-start h-4 gap-2">
                        <div className="text-[#989ba2] text-xs font-medium font-['Pretendard'] leading-none">고객센터: 0507-0178-8541</div>
                        <div className="relative w-px h-4">
                          <div className="w-px h-2.5 left-0 top-[3.60px] absolute flex-col justify-center items-center inline-flex">
                            <div className="w-px grow shrink basis-0 bg-[#d7d7d7]" />
                          </div>
                        </div>
                      </div>
                      <div className="text-[#989ba2] text-xs font-medium font-['Pretendard'] leading-none">Copyright© 2024 아이앤지. All rights reserved</div>
                    </div>
                  </div>
                </div>
              <div className="flex items-start justify-end gap-24 grow shrink basis-0 h-44">
                <div className="inline-flex flex-col items-end justify-start gap-3">
                  <div className="flex flex-col items-start justify-start h-20 gap-3">
                    <div className="self-stretch text-[#27272d] text-sm font-medium font-['Pretendard'] leading-tight">렛츠커리어 스토리</div>
                    <div className="self-stretch text-[#27272d] text-sm font-medium font-['Pretendard'] leading-tight">프로그램</div>
                    <div className="self-stretch text-[#27272d] text-sm font-medium font-['Pretendard'] leading-tight">블로그</div>
                  </div>
                </div>
                <div className="inline-flex flex-col items-end justify-start gap-3 grow shrink basis-0">
                  <div className="flex flex-col items-start self-stretch justify-start gap-3 h-44">
                    <div className="self-stretch text-[#27272d] text-sm font-medium font-['Pretendard'] leading-tight">공지사항</div>
                    <div className="self-stretch text-[#27272d] text-sm font-medium font-['Pretendard'] leading-tight">자주 묻는 질문</div>
                    <div className="flex flex-col items-start self-stretch justify-start gap-2 h-28">
                      <div className="text-[#27272d] text-sm font-medium font-['Pretendard'] leading-tight">고객센터</div>
                      <div className="flex flex-col items-start self-stretch justify-start h-20 gap-2">
                        <div className="self-stretch text-[#27272d]/60 text-sm font-normal font-['Pretendard'] leading-snug">1:1 채팅 상담: 우측 하단 [문의하기] 클릭<br/>- 평일 및 주말 09:00-21:00 상담 가능<br/>전화 상담: 채팅 상담을 통해 신청 가능<br/>이메일 상담: official@letscareer.co.kr</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center self-stretch justify-start gap-5">
              <div className="flex items-start justify-start gap-4">
                <div className="h-5 flex-col justify-center items-center gap-2.5 inline-flex">
                  <div className="flex flex-col items-center justify-center grow shrink basis-0">
                    <div className="flex flex-col items-center justify-center grow shrink basis-0">
                      <div className="flex flex-col items-center justify-center grow shrink basis-0">
                        <div className="absolute top-0 left-0 w-5 h-5" />
                        <div className="flex flex-col items-start justify-start grow shrink basis-0">
                          <div className="grow shrink basis-0 origin-top-left rotate-[-36.87deg] flex-col justify-center items-center flex">
                            <div className="w-px grow shrink basis-0 origin-top-left rotate-[-30deg]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-5 flex-col justify-center items-center gap-2.5 inline-flex">
                  <div className="flex flex-col items-center justify-center grow shrink basis-0">
                    <div className="flex flex-col items-center justify-center grow shrink basis-0">
                      <div className="flex flex-col items-center justify-center grow shrink basis-0">
                        <div className="absolute top-0 left-0 w-5 h-5" />
                        <div className="flex flex-col items-start justify-start grow shrink basis-0">
                          <div className="grow shrink basis-0 origin-top-left rotate-[-36.87deg] flex-col justify-center items-center flex">
                            <div className="w-px grow shrink basis-0 origin-top-left rotate-[-30deg]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-end gap-6">
                <FaInstagram />
                <FaMicroblog />
                <div className="text-[#27272d]/60 text-sm font-medium font-['Pretendard'] leading-tight">서비스 이용약관</div>
                <div className="text-[#27272d]/60 text-sm font-medium font-['Pretendard'] leading-tight">개인정보처리방침</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch justify-start h-10 gap-5">
            <div className="self-stretch" />
          </div>
        </div>
      </div>
    );
};

export default Footer;

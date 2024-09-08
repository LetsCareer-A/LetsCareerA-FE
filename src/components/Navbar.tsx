import React from 'react';
import { CgProfile } from "react-icons/cg";
import { BsList } from "react-icons/bs";
import Logo from '../assets/Logo.svg'

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-[70px] px-10 bg-white border-b border-gray-200">
      {/* 왼쪽 사이드 - 로고&메뉴 */}
      <div className="flex items-center gap-[32px] ml-[120px]">
        <img src={Logo} className="w-[79px] h-auto" alt="Logo" />
        <div className="text-lg font-medium text-gray-500">렛츠커리어 스토리</div>
        <div className="text-lg font-medium text-gray-500">프로그램</div>
        <div className="text-lg font-medium text-gray-500">블로그</div>
        <div className="text-lg font-bold text-black">대시보드</div> {/* 해당 페이지일 땐 black표시 */}
      </div>

      {/* 오른쪽 사이드 - 사용자정보&메뉴 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="text-lg font-medium text-black">김렛츠 님</div>
          <div className="relative w-7 h-7">
          </div>
        </div>
        <CgProfile className='w-[28px] h-[28px]'/>
        <BsList className='w-[32px] h-[32px]'/>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';
import { CgProfile } from "react-icons/cg";
import { BsList } from "react-icons/bs";

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full h-16 px-10 bg-white border-b border-gray-200">
      {/* Left Side: Logo and Menu */}
      <div className="flex items-center gap-[32px] ml-[120px]">
        <img src="public/Logo.svg" className="w-[79px] h-auto" alt="Logo" />
          <div className="text-lg font-medium text-gray-500">렛츠커리어 스토리</div>
          <div className="text-lg font-medium text-gray-500">프로그램</div>
          <div className="text-lg font-medium text-gray-500">블로그</div>
          <div className="text-lg font-bold text-black">대시보드</div>
      </div>

      {/* Right Side: User Info */}
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

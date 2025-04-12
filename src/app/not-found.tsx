import { IconHome } from "@/components/icons";
import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex flex-col items-center justify-center p-4 text-white">
      <img
        src="https://source.unsplash.com/featured/?education"
        alt="ZunoHub"
        className="w-3/4 md:w-2/5 max-w-xs md:max-w-md rounded-lg shadow-2xl mb-8"
      />

      <h1 className="font-extrabold drop-shadow-lg text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        404
      </h1>
      <h2 className="mt-4 mb-6 font-semibold text-xl sm:text-2xl md:text-3xl">
        Oops! Không tìm thấy trang
      </h2>
      <p className="mb-10 text-base sm:text-lg text-center max-w-md">
        Có vẻ như trang bạn tìm kiếm không tồn tại. Hãy quay lại trang chủ và
        tiếp tục hành trình học tập của bạn.
      </p>

      <Link
        href="/"
        className="flex items-center gap-3 bg-white text-blue-700 px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:bg-gray-200 transition"
      >
        <IconHome className="w-5 h-5" />
        <span>Trang chủ</span>
      </Link>
    </div>
  );
};

export default PageNotFound;

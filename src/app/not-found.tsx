import { IconHome } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex flex-col items-center justify-center p-4 text-white">
      {/* Ảnh nền minh họa */}
      <div className="relative w-4/5 sm:w-2/3 md:w-1/3 aspect-[4/3] mb-6">
        <Image
          src="https://source.unsplash.com/featured/?education"
          alt="ZunoHub"
          fill
          className="object-cover rounded-xl shadow-2xl"
          priority
        />
      </div>

      {/* Mã lỗi */}
      <h1 className="text-6xl md:text-7xl font-black drop-shadow-md">404</h1>

      {/* Thông điệp chính */}
      <h2 className="mt-3 mb-4 text-lg sm:text-xl md:text-2xl font-semibold text-center">
        Oops! Không tìm thấy trang bạn yêu cầu.
      </h2>

      {/* Mô tả ngắn */}
      <p className="mb-8 text-sm sm:text-base text-center max-w-lg text-white/90">
        Có thể đường dẫn không chính xác hoặc nội dung đã bị xóa. Hãy trở về
        trang chủ để tiếp tục hành trình học tập của bạn cùng ZunoHub nhé!
      </p>

      {/* Nút trở về */}
      <Link
        href="/"
        className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-md hover:bg-gray-100 transition font-medium text-sm sm:text-base"
      >
        <IconHome className="w-4 h-4" />
        <span>Quay về trang chủ</span>
      </Link>
    </div>
  );
};

export default PageNotFound;

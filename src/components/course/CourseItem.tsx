import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconEye from "../icons/IconEye";
import { IconStar } from "../icons";
import IconClock from "../icons/IconClocks";

const courseInfor = [
  {
    title: "3000",
    icon: (className?: string) => <IconEye className={className}></IconEye>,
  },
  {
    title: "5.0",
    icon: (className?: string) => <IconStar className={className}></IconStar>,
  },
  {
    title: "30h25p",
    icon: (className?: string) => <IconClock className={className}></IconClock>,
  },
];
const CourseItem = () => {
  return (
    <div>
      <div className="bg-white border border-gray-200 p-4 rounded-2xl dark:bg-grayDarker dark:border-opacity-10">
        <Link href="#" className="block h-[180px] relative">
          <Image
            src="https://images.unsplash.com/photo-1742599968125-a790a680a605?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-lg"
            sizes="@media (min-width:640px) 300px,100vw"
            priority
          ></Image>
          <span className="absolute inline-block px-3 py-1 rounded-full top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">
            New
          </span>
        </Link>
        <div className="py-3">
          <h3 className="font-bold text-lg mb-3">
            Khóa học nextjs pro xây dựng E-learning system hoàn chỉnh
          </h3>
          <div className="flex items-center gap-3 mb-5 text-xs dark:text-grayDark">
            {courseInfor.map((item, index) => (
              <div className="flex items-center gap-1" key={index}>
                {item.icon("size-4")}
                <span>{item.title}</span>
              </div>
            ))}
            <span className="font-bold text-white text-base ml-auto dark:!font-bold ">
              799.000
            </span>
          </div>
        </div>
        <Link
          href="#"
          className=" w-full flex items-center justify-center rounded-lg text-white font-bold bg-primary p-3"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;

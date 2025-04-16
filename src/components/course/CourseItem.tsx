import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconEye from "../icons/IconEye";
import { IconStar } from "../icons";
import IconClock from "../icons/IconClocks";
import { ICourse } from "@/database/course.model";
import path from "path";

const CourseItem = ({ data }: { data: ICourse }) => {
  const courseInfor = [
    {
      title: data.views,
      icon: (className?: string) => <IconEye className={className}></IconEye>,
    },
    {
      title: data.rating[0],
      icon: (className?: string) => <IconStar className={className}></IconStar>,
    },
    {
      title: "30h26",
      icon: (className?: string) => (
        <IconClock className={className}></IconClock>
      ),
    },
  ];
  return (
    <div>
      <div className="bg-white border border-gray-200 p-4 rounded-2xl dark:bg-grayDarker dark:border-opacity-10">
        <Link
          href={`/course/${data.slug}`}
          className="block h-[180px] relative"
        >
          <Image
            src={data.image}
            alt=""
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-lg"
            sizes="@media (min-width:640px) 300px,100vw"
            priority
          ></Image>
          {/* <span className="absolute inline-block px-3 py-1 rounded-full top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">
            New
          </span> */}
        </Link>
        <div className="py-3">
          <h3 className="font-bold text-lg mb-3">{data.title}</h3>
          <div className="flex items-center gap-3 mb-5 text-xs dark:text-grayDark">
            {courseInfor.map((item, index) => (
              <div className="flex items-center gap-1" key={index}>
                {item.icon("size-4")}
                <span>{item.title}</span>
              </div>
            ))}
            <span className="font-bold dark:text-white text-base ml-auto dark:!font-bold text-primary">
              {data.price.toLocaleString()}đ
            </span>
          </div>
        </div>
        <Link
          href={`/course/${data.slug}`}
          className=" w-full flex items-center justify-center rounded-lg text-white font-bold bg-primary p-3"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;

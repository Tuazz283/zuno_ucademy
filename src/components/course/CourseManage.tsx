"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import Image from "next/image";
import { commonClassNames, courseLevel, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import { IconEdit, IconExplore, IconRemove, IconEye, IconBook } from "../icons";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui/input";

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const handelDeleteCourse = (slug: string) => {
    Swal.fire({
      title: "Bạn có muốn xóa không",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Xóa khóa học thành công");
      }
    });
  };
  const handelChangeStatus = (slug: string, status: ECourseStatus) => {
    try {
      Swal.fire({
        title: "Bạn có muốn đổi trạng thái  không",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status: ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link
        href="/manage/course/new"
        className="size-8 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      <div className="flex lg:items-center justify-between mb-10 flex-col lg:flex-row gap-5">
        <Heading>Quản lý khóa học</Heading>
        <div className="lg:w-[300px] w-full">
          <Input placeholder="Tìm kiếm khóa học"></Input>
        </div>
      </div>

      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá khóa học</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((course) => (
              <TableRow key={course.slug}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      alt=""
                      src={course.image}
                      width={80}
                      height={80}
                      className="flex-shrink-0 size-16 rounded-lg object-cover"
                    ></Image>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold lg:text-base text-sm whitespace-nowrap">
                        {course.title}
                      </h3>
                      <h4 className="text-xs lg:text-sm text-slate-500">
                        {new Date(course.created_at).toLocaleDateString(
                          "vi-VI"
                        )}
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold lg:text-base text-sm ">
                    {course.price.toLocaleString()}đ
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className={cn(
                      commonClassNames.status,
                      courseStatus.find((item) => item.value === course.status)
                        ?.className
                    )}
                    onClick={() =>
                      handelChangeStatus(course.slug, course.status)
                    }
                  >
                    {
                      courseStatus.find((item) => item.value === course.status)
                        ?.title
                    }
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/manage/course/update-content?slug=${course.slug}`}
                      className={commonClassNames.action}
                    >
                      <IconBook></IconBook>
                    </Link>
                    <Link
                      href={`/course/${course.slug}`}
                      className={commonClassNames.action}
                    >
                      <IconEye></IconEye>
                    </Link>
                    <Link
                      href={`/manage/course/update?slug=${course.slug}`}
                      className={commonClassNames.action}
                    >
                      <IconEdit></IconEdit>
                    </Link>
                    <button
                      onClick={() => handelDeleteCourse(course.slug)}
                      className={commonClassNames.action}
                    >
                      <IconRemove></IconRemove>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button className={commonClassNames.pagination}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button className={commonClassNames.pagination}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default CourseManage;

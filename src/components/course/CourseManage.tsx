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
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <Heading className="mb-10">Quản lý khóa học</Heading>
      <Table>
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
                      <h3 className="font-bold text-base">{course.title}</h3>
                      <h4 className="text-sm text-slate-500">
                        {new Date(course.created_at).toLocaleDateString(
                          "vi-VI"
                        )}
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-base">
                    {course.price.toLocaleString()}đ
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      commonClassNames.status,
                      courseStatus.find((item) => item.value === course.status)
                        ?.className
                    )}
                  >
                    {
                      courseStatus.find((item) => item.value === course.status)
                        ?.title
                    }
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/manage/course/update?slug=${course.slug}`}
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
    </div>
  );
};

export default CourseManage;

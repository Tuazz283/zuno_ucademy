import CourseManage from "@/components/course/CourseManage";
import { getAllCourse } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
  const course = await getAllCourse();
  return (
    <div>
      <CourseManage
        courses={course ? JSON.parse(JSON.stringify(course)) : []}
      ></CourseManage>
    </div>
  );
};

export default page;

import CourseGrid from "@/components/common/CourseGrid";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import { getAllCourse } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
  const courses = (await getAllCourse()) || [];

  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses.length > 0 &&
          courses.map((item) => (
            <CourseItem key={item.slug} data={item}></CourseItem>
          ))}
      </CourseGrid>
    </div>
  );
};

export default page;

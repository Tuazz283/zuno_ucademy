import { CourseGrid } from "@/components/common";
import Heading from "@/components/common/Heading";
import CourseItem from "@/components/course/CourseItem";

import React from "react";

const page = () => {
  return (
    <div>
      <Heading>Khu vực học tập</Heading>
      <CourseGrid>
        {" "}
        {/* <CourseItem d></CourseItem>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem> */}
      </CourseGrid>
    </div>
  );
};

export default page;

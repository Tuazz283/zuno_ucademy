import CourseGrid from "@/components/common/CourseGrid";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import createUser from "@/lib/actions/user.action";
import React from "react";

const page = async () => {
  // const user = await createUser({
  //   clerkId: "clerk_123",
  //   username: "tuantd",
  //   email: "trinhdangtuan2005@gmail.com",
  // });
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
      </CourseGrid>
    </div>
  );
};

export default page;

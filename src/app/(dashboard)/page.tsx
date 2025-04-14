import CourseGrid from "@/components/common/CourseGrid";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import createUser from "@/lib/actions/user.action";
import React from "react";

const page = async () => {
  const user = await createUser({
    clerkId: "clerk_41222122",
    username: "Trịnh Đăng1333",
    email: "trinhdangtuan02080233@gmail.com",
    name: "Trịnh Đăng Tuấn",
  });
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

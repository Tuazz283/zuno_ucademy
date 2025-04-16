import Heading from "@/components/common/Heading";
import CourseUpdate from "@/components/course/CourseUpdate";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug });
  if (!findCourse) return <div>Không tìm thấy khóa học</div>;

  return (
    <div>
      <Heading className="mb-8">Cập nhật khóa học</Heading>
      <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))} />
    </div>
  );
};

export default page;

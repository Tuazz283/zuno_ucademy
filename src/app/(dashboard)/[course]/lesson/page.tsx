import PageNotFound from "@/app/not-found";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLesson, getLessonBySlug } from "@/lib/actions/lesson.actions";
import { useRouter } from "next/router";
import React from "react";
import LessonNavigation from "./LessonNavigation";
import { TUpdateCourseLecture } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "@/components/lesson/LessonItem";
import Heading from "@/components/common/Heading";
import LessonContent from "@/components/lesson/LessonContent";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const course = params.course;
  const slug = searchParams.slug;

  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lessonDetails = await getLessonBySlug({
    slug,
    course: courseId || "",
  });
  const lessonList = await findAllLesson({ course: courseId || "" });
  if (!lessonDetails) return;
  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === lessonDetails.slug) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const previosLesson = lessonList?.[currentLessonIndex - 1];

  function extractYouTubeVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  const videoId = lessonDetails.video_url
    ? extractYouTubeVideoId(lessonDetails.video_url)
    : null;
  const lectures = findCourse.lectures || "";
  return (
    <div className="grid lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className="flex items-center justify-between mb-5">
          <LessonNavigation
            nextLesson={
              !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
            }
            previosLesson={
              !previosLesson
                ? ""
                : `/${course}/lesson?slug=${previosLesson?.slug}`
            }
          ></LessonNavigation>
          <div></div>
        </div>
        <Heading className="mb-10">{lessonDetails.title}</Heading>
        <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}
          ></div>
        </div>
      </div>
      <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto ">
        <div className="h-2 w-full rounded-full border borderDarkMode bgDarkMode mb-3">
          <div className="w-0 h-full rounded-full bg-primary"></div>
        </div>
        <LessonContent
          lectures={lectures}
          course={course}
          slug={slug}
        ></LessonContent>
      </div>
    </div>
  );
};

export default page;

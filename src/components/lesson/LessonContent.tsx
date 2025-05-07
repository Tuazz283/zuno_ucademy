import { TUpdateCourseLecture } from "@/types";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "./LessonItem";
const LessonContent = ({
  lectures,
  course,
  slug,
}: {
  lectures: TUpdateCourseLecture[];
  course: string;
  slug: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lectures: TUpdateCourseLecture) => (
        <Accordion type="single" collapsible key={lectures._id}>
          <AccordionItem value={lectures._id.toString()}>
            <AccordionTrigger>
              <div className="flex items-center gap-3 justify-between w-full pr-5">
                <div className="line-clamp-1">{lectures.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="!bg-transparent border-none p-0">
              {lectures.lessons.map((lesson) => (
                <LessonItem
                  key={lesson._id}
                  lesson={lesson}
                  url={!course ? "" : `/${course}/lesson?slug=${lesson.slug}`}
                  isActive={!slug ? false : lesson.slug === slug}
                ></LessonItem>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default LessonContent;

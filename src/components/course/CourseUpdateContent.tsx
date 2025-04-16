"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassNames } from "@/constants";
import { IconEdit, IconRemove } from "../icons";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";

const CourseUpdateContent = ({ course }: { course: any }) => {
  const lectures = course.lectures;
  const handelAddNewLecture = async () => {};
  return (
    <div>
      {lectures.map((lectures: any) => (
        <Accordion type="single" collapsible key={lectures._id}>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-3 justify-between w-full pr-5">
                <div>Chương 1: Giới thiệu khóa học</div>
                {/* <div className="w-full">
                     <Input placeholder="Tên chương"></Input>
                   </div> */}
                <div className="flex  gap-2">
                  <span className={commonClassNames.action}>
                    <IconEdit></IconEdit>
                  </span>
                  <span className={commonClassNames.action}>
                    <IconRemove></IconRemove>
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      {lectures.length <= 0 && (
        <Button onClick={handelAddNewLecture}>Thêm chương mới</Button>
      )}
    </div>
  );
};

export default CourseUpdateContent;

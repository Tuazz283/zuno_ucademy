"use client";
import React, { MouseEvent, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassNames } from "@/constants";
import {
  IconCancel,
  IconCheck,
  IconCheck2,
  IconEdit,
  IconRemove,
} from "../icons";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { createLecture, updateLecture } from "@/lib/actions/lecture.action";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ILecture } from "@/database/lecture.model";
import { TCourseUpdateParams, TUpdateCourseLecture } from "@/types";
import { useImmer } from "use-immer";
import { cn } from "@/lib/utils";
import { createLesson, updateLesson } from "@/lib/actions/lesson.actions";
import slugify from "slugify";
import { ILesson } from "@/database/lesson.model";
import LessonItemUpdate from "../lesson/LessonItemUpdate";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const [lectureEdit, setLectureEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const [lectureIdEit, setLectureIdEit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");

  const lectures = course.lectures;
  const handelAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: lectures.length + 1,
        path: `/manage/course/update-content?slug=${course.slug}`,
      });
      if (res?.success) {
        toast.success("Thêm chương mới thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      Swal.fire({
        title: "Bạn có muốn xóa không",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
              path: `/manage/course/update-content?slug=${course.slug}`,
            },
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handelUpdateLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Cập nhật thành công!");
        setLectureEdit("");
        setLectureIdEit("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        path: `/manage/course/update-content?slug=${course.slug}`,
        lecture: lectureId,
        course: courseId,
        title: "Tiêu đề bài học mới",
        slug: `tieu-de-bai-hoc-moi-${new Date()
          .getTime()
          .toString()
          .slice(-3)}`,
      });
      if (res?.success) {
        toast.success("Thêm bài học mới thành công!");
        return;
      }
      toast.error("Thêm bài học mới thất bại!");
    } catch (error) {
      console.log(error);
    }
  };

  const handelUpdateLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        path: `/manage/course/update-content?slug=${course.slug}`,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[*+~.()'"!:@]/g,
          }),
        },
      });
      if (res?.success) {
        toast.success("Cập nhật bài học thành công!");
        setLessonEdit("");
        setLessonIdEdit("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lectures: TUpdateCourseLecture, index) => (
          <div key={lectures._id}>
            <Accordion type="single" collapsible={!lectureIdEit}>
              <AccordionItem value={lectures._id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-3 justify-between w-full pr-5">
                    {lectures._id === lectureIdEit ? (
                      <>
                        <div className="w-full">
                          <Input
                            placeholder="Tên chương"
                            defaultValue={lectures.title}
                            onChange={(e) => setLectureEdit(e.target.value)}
                          ></Input>
                        </div>
                        <div className="flex  gap-2">
                          <span
                            className={cn(
                              `${commonClassNames.action}`,
                              "text-green-500"
                            )}
                            onClick={(e) =>
                              handelUpdateLecture(e, lectures._id)
                            }
                          >
                            <IconCheck2></IconCheck2>
                          </span>
                          <span
                            className={cn(
                              `${commonClassNames.action}`,
                              "text-red-500"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLectureIdEit("");
                            }}
                          >
                            <IconCancel></IconCancel>
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{lectures.title}</div>
                        <div className="flex  gap-2">
                          <span
                            className={cn(
                              `${commonClassNames.action}`,
                              "text-blue-500"
                            )}
                          >
                            <IconEdit
                              onClick={(e) => {
                                e.stopPropagation();
                                setLectureIdEit(lectures._id);
                              }}
                            ></IconEdit>
                          </span>
                          <span
                            className={cn(
                              `${commonClassNames.action}`,
                              "text-red-500"
                            )}
                            onClick={(e) =>
                              handelDeleteLecture(e, lectures._id)
                            }
                          >
                            <IconRemove></IconRemove>
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none !bg-transparent">
                  <div className="flex flex-col gap-5">
                    {lectures.lessons.map((lesson: ILesson) => (
                      <Accordion
                        type="single"
                        collapsible={!lessonEdit}
                        key={lesson._id}
                      >
                        <AccordionItem value={lesson._id}>
                          <AccordionTrigger>
                            <div className="flex items-center gap-3 justify-between w-full pr-5">
                              {lesson._id === lessonIdEdit ? (
                                <>
                                  <div className="w-full">
                                    <Input
                                      placeholder="Tên bài học"
                                      defaultValue={lesson.title}
                                      onChange={(e) =>
                                        setLessonEdit(e.target.value)
                                      }
                                    ></Input>
                                  </div>
                                  <div className="flex  gap-2">
                                    <span
                                      className={cn(
                                        `${commonClassNames.action}`,
                                        "text-green-500"
                                      )}
                                      onClick={(e) =>
                                        handelUpdateLesson(e, lesson._id)
                                      }
                                    >
                                      <IconCheck2></IconCheck2>
                                    </span>
                                    <span
                                      className={cn(
                                        `${commonClassNames.action}`,
                                        "text-red-500"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonEdit("");
                                      }}
                                    >
                                      <IconCancel></IconCancel>
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>{lesson.title}</div>
                                  <div className="flex  gap-2">
                                    <span
                                      className={cn(
                                        `${commonClassNames.action}`,
                                        "text-blue-500"
                                      )}
                                    >
                                      <IconEdit
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setLessonIdEdit(lesson._id);
                                        }}
                                      ></IconEdit>
                                    </span>
                                    <span
                                      className={cn(
                                        `${commonClassNames.action}`,
                                        "text-red-500"
                                      )}
                                      // onClick={(e) =>
                                      //   handelDeleteLesson(e, lectures._id)
                                      // }
                                    >
                                      <IconRemove></IconRemove>
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <LessonItemUpdate
                              lesson={lesson}
                            ></LessonItemUpdate>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              onClick={() => handelAddNewLesson(lectures._id, course._id)}
              className="mt-5 ml-auto w-fit block"
            >
              Thêm bài học
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <Button onClick={handelAddNewLecture}>Thêm chương mới</Button>
      </div>
    </div>
  );
};

export default CourseUpdateContent;

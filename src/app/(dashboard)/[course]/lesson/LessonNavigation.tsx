"use client";

import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ILesson } from "@/database/lesson.model";
import { useRouter } from "next/navigation";

import React from "react";

const LessonNavigation = ({
  nextLesson,
  previosLesson,
}: {
  nextLesson: string;
  previosLesson: string;
}) => {
  const route = useRouter();
  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-3"
        onClick={() => (!previosLesson ? null : route.push(previosLesson))}
        disabled={!previosLesson}
      >
        <IconArrowLeft></IconArrowLeft>
      </Button>
      <Button
        className="size-10 p-3"
        onClick={() => (!nextLesson ? null : route.push(nextLesson))}
        disabled={!nextLesson}
      >
        <IconArrowRight></IconArrowRight>
      </Button>
    </div>
  );
};

export default LessonNavigation;

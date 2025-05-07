import React from "react";
import { IconPlay } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";

const LessonItem = ({
  lesson,
  url,
  isActive = false,
  isChecked = false,
}: {
  lesson: {
    title: string;
    duration: number;
  };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 bgDarkMode borderDarkMode rounded-lg p-3 text-sm mb-3",
        isActive ? "text-primary font-semibold pointer-events-none" : ""
      )}
    >
      {url && (
        <Checkbox
          defaultChecked={isChecked}
          className="w-4 h-4 flex-shrink-0 data-[state=checked]:bg-primary data-[state=checked]:text-white"
        />
      )}

      <IconPlay className="size-4 flex-shrink-0"></IconPlay>
      {url ? (
        <Link href={url} className="line-clamp-1">
          {lesson.title}
        </Link>
      ) : (
        <h4>{lesson.title}</h4>
      )}

      {/* <span className="ml-auto text-xs font-semibold">
        {lesson.duration} phút
      </span> */}
      <span className="ml-auto text-xs font-semibold whitespace-nowrap">
        {lesson.duration}&nbsp;phút
      </span>
    </div>
  );
};

export default LessonItem;

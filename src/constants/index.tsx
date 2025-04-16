// file chỉ mục

import {
  IconBook,
  IconCart,
  IconComment,
  IconExplore,
  IconPlay,
  IconUser,
} from "@/components/icons";

import { TMenuItem } from "@/types";
import { ECourseLevel, ECourseStatus } from "@/types/enums";

export const menuItem: TMenuItem[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconPlay className="size-5"></IconPlay>,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconExplore className="size-5"></IconExplore>,
  },
  {
    url: "/manage/course",
    title: "Quản lý khóa học",
    icon: <IconBook className="size-5"></IconBook>,
  },
  {
    url: "/manage/member",
    title: "Quản lý thành viên",
    icon: <IconUser className="size-5"></IconUser>,
  },
  {
    url: "/manage/order",
    title: "Quản lý đơn hàng",
    icon: <IconCart className="size-5"></IconCart>,
  },
  {
    url: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <IconComment className="size-5"></IconComment>,
  },
];

export const courseStatus: {
  title: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: ECourseStatus.APPROVED,
    className: "text-green-500 bg-green-400 bg-opacity-10",
  },
  {
    title: "Chờ duyệt",
    value: ECourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500 bg-opacity-10",
  },
  {
    title: "Từ chối",
    value: ECourseStatus.REJECTED,
    className: "text-red-500 bg-red-500 bg-opacity-10 ",
  },
];
export const courseLevel: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: "Dễ",
    value: ECourseLevel.BEGINNER,
  },
  {
    title: "Trung bình",
    value: ECourseLevel.INTERMEDIATE,
  },
  {
    title: "Khó",
    value: ECourseLevel.ADVANCE,
  },
];

export const courseTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Dễ",
  [ECourseLevel.INTERMEDIATE]: "Trung bình",
  [ECourseLevel.ADVANCE]: "Khó",
};

export const commonClassNames = {
  status:
    "border border-current rounded-md font-medium px-3 py-1 text-xs dark:text-white",
  action:
    "size-8 !rounded-md border !border-primary !flex !items-center !p-2 hover:bg-white dark:bg-transparent dark:text-white",
};

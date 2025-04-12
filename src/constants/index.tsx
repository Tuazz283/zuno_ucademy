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

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
import type { ControllerRenderProps } from "react-hook-form";
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
    "border border-current rounded-md font-medium px-3 py-1 text-xs dark:text-white whitespace-nowrap",
  action:
    "size-8 !rounded-md border !border-primary !flex !items-center !p-2 hover:bg-white dark:bg-transparent dark:text-white hover:text-gray-500 dark:hover:text-white",
  pagination:
    "size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary",
};

// export const editorOptions = (field: any, theme: any) => ({
//   initialValue: "",
//   onBlur: field.onBlur,
//   onEditorChange: (content: any) => field.onChange(content),
//   init: {
//     codesample_global_prismjs: true,
//     skin: theme === "dark" ? "oxide-dark" : "oxide",
//     height: 300,
//     menubar: false,
//     plugins: [
//       "advlist",
//       "autolink",
//       "lists",
//       "link",
//       "image",
//       "charmap",
//       "preview",
//       "anchor",
//       "searchreplace",
//       "visualblocks",
//       "codesample",
//       "fullscreen",
//       "insertdatetime",
//       "media",
//       "table",
//       "heading",
//     ],
//     toolbar:
//       "undo redo | " +
//       "codesample | bold italic forecolor | alignleft aligncenter |" +
//       "alignright alignjustify | bullist numlist |" +
//       "image |" +
//       "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
//       "link",
//     content_style:
//       "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };",
//   },
// });

type ThemeMode = "light" | "dark";

export const editorOptions = (
  field: ControllerRenderProps<Record<string, unknown>, string>,
  theme: ThemeMode
) => ({
  initialValue: "",
  onBlur: field.onBlur,
  onEditorChange: (content: string) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === "dark" ? "oxide-dark" : "oxide",
    height: 300,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "codesample",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "heading",
    ],
    toolbar:
      "undo redo | codesample | bold italic forecolor | alignleft aligncenter |" +
      "alignright alignjustify | bullist numlist | image |" +
      "h1 h2 h3 h4 h5 h6 | preview | fullscreen | link",
    content_style:
      "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');" +
      "body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height:2; padding-bottom:32px; }" +
      "img { max-width:100%; height:auto; display:block; margin:0 auto; };",
  },
});

import { ICourse } from "@/database/course.model";

export type TActiveLinkProp = {
  url: string;
  children: React.ReactNode;
};
export type TMenuItem = {
  url: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
};
//USER

export type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

//Course
export type TCreateCourseParams = {
  title: string;
  slug: string;
  author?: string;
};

export type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
  path?: "";
};

//Lecture

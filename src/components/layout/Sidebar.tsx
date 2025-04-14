"use client";
import React from "react";
import { menuItem } from "@/constants";

import { TMenuItem } from "@/types";
import { ActiveLink } from "../common";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import Link from "next/link";
import { IconUser } from "../icons";

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="p-5 border-r border-r-gray-200 bg-white flex flex-col dark:bg-grayDarkest dark:border-opacity-10">
      <a href="/" className="logo font-bold text-3xl inline-block mb-5">
        <span className="text-primary"> Z</span>
        uno
        <span className="text-primary">H</span>
        ub
      </a>
      <ul className="flex flex-col gap-2">
        {menuItem.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          ></MenuItem>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle></ModeToggle>
        {!userId ? (
          <Link href={"sign-in"}>
            <IconUser className="size-8 bg-primary text-white flex items-center justify-center p-1 rounded-lg"></IconUser>
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};

function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon} {title}
      </ActiveLink>
    </li>
  );
}
export default Sidebar;

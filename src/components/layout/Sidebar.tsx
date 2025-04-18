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
    <div className=" hidden p-5 border-r lg:flex flex-col  fixed top-0 left-0 bottom-0 w-[300px] borderDarkMode bgDarkMode">
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

export function MenuItem({ url = "/", title = "", icon, onlyIcon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon} {onlyIcon ? null : title}
      </ActiveLink>
    </li>
  );
}
export default Sidebar;

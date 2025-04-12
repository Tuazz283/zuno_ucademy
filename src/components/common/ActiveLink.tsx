"use client";
import { TActiveLinkProp } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({ url, children }: TActiveLinkProp) => {
  const pathname = usePathname();
  const isActive = url === pathname;
  return (
    <div>
      <Link
        href={url}
        replace
        className={`p-3 rounded-md flex items-center dark:text-grayDark gap-3 transition-all ${
          isActive
            ? "!text-white bg-primary svg-animate "
            : "hover:!text-primary hover:!bg-primary hover:!bg-opacity-10"
        }`}
      >
        {children}
      </Link>
    </div>
  );
};

export default ActiveLink;

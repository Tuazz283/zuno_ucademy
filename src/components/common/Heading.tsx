import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div>
      <h1 className={cn("font-bold text-sm lg:text-base", className)}>
        {children}
      </h1>
    </div>
  );
};

export default Heading;

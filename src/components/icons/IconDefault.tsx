import React, { ComponentProps } from "react";

const IconDefault = (props: ComponentProps<"svg">) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        {...props}
      ></svg>
    </div>
  );
};

export default IconDefault;

import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{children}</h1>
    </div>
  );
};

export default Heading;

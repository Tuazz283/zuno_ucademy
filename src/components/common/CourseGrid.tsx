import React from "react";

const CourseGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-8 mt-6 2xl:grid-cols-4 3xl:grid-cols-6 course-slider gap-4">
      {children}
    </div>
  );
};

export default CourseGrid;

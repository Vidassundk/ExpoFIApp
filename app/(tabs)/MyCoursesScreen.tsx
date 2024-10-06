import BookmarkedCoursesGrid from "@/features/courses/components/BookmarkedCoursesGrid";
import { useCourses } from "@/features/courses/hooks/useCourses";
import React from "react";

const MyCoursesScreen = () => {
  const { courses, loading, error } = useCourses();

  return (
    <BookmarkedCoursesGrid courses={courses} loading={loading} error={error} />
  );
};

export default MyCoursesScreen;

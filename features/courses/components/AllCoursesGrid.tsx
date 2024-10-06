/// HARDCODED

import React, { useEffect } from "react";
import { Course } from "@/features/courses/types";
import CoursesGrid from "@/components/CoursesGrid";
import { useBookmarksContext } from "../state/BookmarksContext";

interface AllCoursesGridProps {
  courses: Course[];
  loading: boolean;
  error: Error | null;
}

const AllCoursesGrid = ({ courses, loading, error }: AllCoursesGridProps) => {
  const { toggleBookmark, isBookmarked, setInitialBookmarks } =
    useBookmarksContext();

  useEffect(() => {
    setInitialBookmarks(courses);
  }, [courses]);

  return (
    <CoursesGrid
      horizontal
      sectionTitle="You Might Also Like"
      courses={courses}
      loading={loading}
      error={error}
      onPressCourse={(courseId: string) =>
        alert(`Course details for ${courseId}`)
      }
      onPressBookmark={toggleBookmark}
      isBookmarked={isBookmarked}
    />
  );
};

export default AllCoursesGrid;

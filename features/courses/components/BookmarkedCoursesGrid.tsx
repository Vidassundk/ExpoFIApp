import React from "react";
import { Course } from "@/features/courses/types";
import CoursesGrid from "@/components/CoursesGrid";
import { useBookmarksContext } from "../state/BookmarksContext";

interface BookmarkedCoursesGridProps {
  courses: Course[];
  loading: boolean;
  error: Error | null;
}

const BookmarkedCoursesGrid = ({
  courses,
  loading,
  error,
}: BookmarkedCoursesGridProps) => {
  const { toggleBookmark, isBookmarked } = useBookmarksContext();

  const bookmarkedCoursesList = courses.filter((course) =>
    isBookmarked(course.id)
  );

  return (
    <CoursesGrid
      sectionTitle="My Courses"
      courses={bookmarkedCoursesList}
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

export default BookmarkedCoursesGrid;

import React, { useEffect } from "react";
import { Course } from "@/features/courses/types";
import CoursesGrid from "@/components/CoursesGrid";
import { useBookmarksContext } from "../state/BookmarksContext";

interface ContinueLearningGridPros {
  courses: Course[];
  loading: boolean;
  error: Error | null;
}

const ContinieLearningGrid = ({
  courses,
  loading,
  error,
}: ContinueLearningGridPros) => {
  const { toggleBookmark, isBookmarked, setInitialBookmarks } =
    useBookmarksContext();

  useEffect(() => {
    setInitialBookmarks(courses);
  }, [courses]);

  return (
    <CoursesGrid
      hardCodedProgress
      horizontal
      sectionTitle="Continue Learning"
      courses={courses}
      loading={loading}
      size="large"
      error={error}
      onPressCourse={(courseId: string) =>
        alert(`Course details for ${courseId}`)
      }
      onPressBookmark={toggleBookmark}
      isBookmarked={isBookmarked}
    />
  );
};

export default ContinieLearningGrid;

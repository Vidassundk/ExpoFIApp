import React, { createContext, useContext, useState } from "react";
import { Course } from "@/features/courses/types";

interface BookmarksContextType {
  bookmarkedCourses: { [key: string]: boolean };
  toggleBookmark: (courseId: string) => void;
  isBookmarked: (courseId: string) => boolean;
  setInitialBookmarks: (courses: Course[]) => void;
}

const BookmarksContext = createContext<BookmarksContextType>({
  bookmarkedCourses: {},
  toggleBookmark: () => {},
  isBookmarked: () => false,
  setInitialBookmarks: () => {},
});

export const BookmarksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarkedCourses, setBookmarkedCourses] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleBookmark = (courseId: string) => {
    setBookmarkedCourses((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  const isBookmarked = (courseId: string) => bookmarkedCourses[courseId];

  const setInitialBookmarks = (courses: Course[]) => {
    const initialBookmarks: { [key: string]: boolean } = {};
    courses.forEach((course) => {
      initialBookmarks[course.id] = false; // Initially, no bookmarks
    });
    setBookmarkedCourses(initialBookmarks);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedCourses,
        toggleBookmark,
        isBookmarked,
        setInitialBookmarks,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarksContext = () => useContext(BookmarksContext);

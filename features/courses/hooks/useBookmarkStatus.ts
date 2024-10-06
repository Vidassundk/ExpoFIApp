import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useBookmarks } from "../hooks/useBookmarks";
import { Course } from "@/features/courses/types";

export const useBookmarkStatus = (courses: Course[], userId: string) => {
  const { handleAddBookmark, handleRemoveBookmark, checkIsBookmarked } =
    useBookmarks(userId);

  const [bookmarkedCourses, setBookmarkedCourses] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const checkBookmarks = async () => {
      const bookmarksStatus: { [key: string]: boolean } = {};
      for (let course of courses) {
        const isBookmarked = await checkIsBookmarked(course.id);
        bookmarksStatus[course.id] = isBookmarked;
      }
      setBookmarkedCourses(bookmarksStatus);
    };

    if (courses.length > 0) {
      checkBookmarks();
    }
  }, [courses]);

  const toggleBookmark = async (courseId: string) => {
    const isBookmarked = bookmarkedCourses[courseId];

    try {
      if (isBookmarked) {
        await handleRemoveBookmark(courseId);
        setBookmarkedCourses((prevState) => ({
          ...prevState,
          [courseId]: false,
        }));
        Alert.alert("Bookmark removed");
      } else {
        await handleAddBookmark(courseId);
        setBookmarkedCourses((prevState) => ({
          ...prevState,
          [courseId]: true,
        }));
        Alert.alert("Course bookmarked");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update bookmark");
    }
  };

  const isBookmarked = (courseId: string) => bookmarkedCourses[courseId];

  return { bookmarkedCourses, toggleBookmark, isBookmarked };
};

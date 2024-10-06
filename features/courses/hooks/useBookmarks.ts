import { useState } from "react";
import {
  addBookmark,
  removeBookmark,
  isCourseBookmarked,
} from "../api/coursesApi";

export const useBookmarks = (userId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Add bookmark function
  const handleAddBookmark = async (courseId: string) => {
    try {
      setLoading(true);
      await addBookmark(userId, courseId);
    } catch (err) {
      setError("Failed to add bookmark");
    } finally {
      setLoading(false);
    }
  };

  // Remove bookmark function
  const handleRemoveBookmark = async (courseId: string) => {
    try {
      setLoading(true);
      await removeBookmark(userId, courseId);
    } catch (err) {
      setError("Failed to remove bookmark");
    } finally {
      setLoading(false);
    }
  };

  // Check if course is bookmarked
  const checkIsBookmarked = async (courseId: string): Promise<boolean> => {
    try {
      setLoading(true);
      return await isCourseBookmarked(userId, courseId);
    } catch (err) {
      setError("Failed to check bookmark status");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleAddBookmark,
    handleRemoveBookmark,
    checkIsBookmarked,
    loading,
    error,
  };
};

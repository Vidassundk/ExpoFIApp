import apiClient from "../../../services/api/apiClient";
import { Course } from "../types";

// Fetch all courses
export const fetchCourses = async (): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>("/courses");
  return response.data;
};

// Fetch bookmarked courses
export const fetchBookmarkedCourses = async (
  userId: string
): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>(`/bookmarks?userId=${userId}`);
  return response.data;
};

// Add a bookmark
export const addBookmark = async (
  userId: string,
  courseId: string
): Promise<void> => {
  await apiClient.post("/bookmarks", { userId, courseId });
};

// Remove a bookmark
export const removeBookmark = async (
  userId: string,
  courseId: string
): Promise<void> => {
  await apiClient.delete("/bookmarks", { data: { userId, courseId } });
};

// Check if a course is bookmarked by a user
export const isCourseBookmarked = async (
  userId: string,
  courseId: string
): Promise<boolean> => {
  const response = await apiClient.get(
    `/bookmarks/check?userId=${userId}&courseId=${courseId}`
  );
  return response.data.isBookmarked;
};

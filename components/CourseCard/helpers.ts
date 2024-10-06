import { Lesson } from "@/features/courses/types";

export const sumAllLessonsLength = (lessons: Lesson[]) => {
  const totalDuration = lessons.reduce(
    (sum, lesson) => sum + lesson.duration,
    0
  );
  return totalDuration;
};

export const secondsToHMS = (seconds: number) => {
  const hours = seconds / 3600;
  return `${hours.toFixed(1)}h`;
};

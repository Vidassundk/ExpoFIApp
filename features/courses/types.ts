export interface Lesson {
  id: string;
  name: string;
  /** Estimated duration in seconds */
  duration: number;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  lessons: Lesson[];
  coverImage: string;
}

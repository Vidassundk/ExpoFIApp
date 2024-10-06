import React from "react";
import { useCourses } from "@/features/courses/hooks/useCourses";
import AllCoursesGrid from "@/features/courses/components/AllCoursesGrid";
import ContinieLearningGrid from "@/features/courses/components/ContinueLearningGrid";
import { View } from "react-native";
import Spacing from "@/features/theme/constants/spacing";

const HomeSreen = () => {
  const { courses, loading, error } = useCourses();

  return (
    <View style={{ gap: Spacing.lg }}>
      <ContinieLearningGrid
        courses={courses.slice(0, 1)}
        loading={loading}
        error={error}
      />
      <AllCoursesGrid courses={courses} loading={loading} error={error} />
    </View>
  );
};

export default HomeSreen;

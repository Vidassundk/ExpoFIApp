import React from "react";
import { FlatList, StyleProp, ViewStyle, View } from "react-native";
import Spacing from "@/features/theme/constants/spacing";
import { Course } from "@/features/courses/types";
import CourseCard from "@/components/CourseCard";
import { default as Text } from "../ThemedText";
import LoadingIndicator from "../LoadingIndicator";

interface CoursesGridUIProps {
  courses: Course[];
  loading: boolean;
  error: Error | null;
  numColumns?: number;
  columnWrapperStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onPressCourse: (courseId: string) => void;
  onPressBookmark: (courseId: string) => void;
  isBookmarked: (courseId: string) => boolean;
  sectionTitle?: string;
  horizontal?: boolean;
  size?: "small" | "large";
  hardCodedProgress?: boolean;
}

const CoursesGridUI = ({
  courses,
  loading,
  error,
  numColumns = 2,
  columnWrapperStyle,
  contentContainerStyle,
  onPressCourse,
  onPressBookmark,
  isBookmarked,
  sectionTitle,
  horizontal = false,
  size = "small",
  hardCodedProgress = false,
}: CoursesGridUIProps) => {
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (courses.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: Spacing.xl,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          No courses found, try bookmarking some courses from Home Page
        </Text>
      </View>
    );
  }

  return (
    <View>
      {sectionTitle && (
        <View
          style={{ paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md }}
        >
          <Text style={{ fontSize: 24 }}>{sectionTitle}</Text>
        </View>
      )}

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        numColumns={horizontal ? 1 : numColumns}
        horizontal={horizontal}
        columnWrapperStyle={
          !horizontal &&
          (columnWrapperStyle || { justifyContent: "space-between" })
        }
        contentContainerStyle={[
          {
            marginHorizontal: Spacing.lg,
            gap: Spacing.lg,
          },
          contentContainerStyle,
        ]}
        renderItem={({ item, index }) => (
          <CourseCard
            progressCompleted={hardCodedProgress ? 20 : undefined}
            key={item.id}
            description={item.description}
            coverImage={item.coverImage}
            lessons={item.lessons}
            onPress={() => onPressCourse(item.id)}
            onPressBookmark={() => onPressBookmark(item.id)}
            isBookmarked={isBookmarked(item.id)}
            large={size === "large"}
            buttonStyle={
              horizontal && index === courses.length - 1
                ? { marginRight: Spacing.lg * 2 }
                : {}
            }
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CoursesGridUI;

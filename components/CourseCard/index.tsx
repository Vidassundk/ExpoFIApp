import Spacing from "@/features/theme/constants/spacing";
import React from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { default as Text } from "../ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import { Course } from "@/features/courses/types";
import { secondsToHMS, sumAllLessonsLength } from "./helpers";
import CompletedIndicatorPill from "../CompletedIndicatorPill";
import { useTheme } from "@/features/theme/hooks/useTheme";
import IconButton from "../IconButton";

interface CourseCardProps {
  description: Course["description"];
  coverImage: Course["coverImage"];
  lessons: Course["lessons"];
  progressCompleted?: number;
  onPress: () => void;
  onPressBookmark: () => void;
  isBookmarked: boolean;
  buttonStyle?: TouchableOpacityProps["style"];
  large?: boolean;
}

const CourseCard = ({
  description,
  coverImage,
  lessons,
  progressCompleted,
  onPress,
  onPressBookmark,
  isBookmarked,
  buttonStyle,
  large = false,
}: CourseCardProps) => {
  const { width } = Dimensions.get("window");
  const smallCardSize = width / 2 - Spacing.lg - Spacing.lg / 2;
  const cardSize = large ? width / 2 : smallCardSize;
  const borderRadius = 20;
  const fullCourseLengthInSeconds = React.useMemo(
    () => sumAllLessonsLength(lessons),
    [lessons]
  );
  const { colors, theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        { width: cardSize, height: cardSize, borderColor: colors.text },
        buttonStyle,
      ]}
    >
      <View
        style={[
          styles.topSection,
          {
            borderRadius: borderRadius,
            justifyContent: progressCompleted ? "space-between" : "flex-end",
          },
        ]}
      >
        {progressCompleted && (
          <CompletedIndicatorPill percentNumber={progressCompleted} />
        )}
        <IconButton
          onPress={onPressBookmark}
          name={isBookmarked ? "bookmark" : "bookmark-o"}
          color={theme === "light" ? colors.primary : colors.text}
        />
      </View>
      <Image
        style={[
          styles.image,
          {
            borderTopRightRadius: borderRadius - 2,
            borderTopLeftRadius: borderRadius - 2,
          },
        ]}
        source={{ uri: coverImage }}
      />
      <View style={[styles.infoSection, { borderColor: colors.text }]}>
        <Text numberOfLines={1} style={styles.descriptionText}>
          {description}
        </Text>
        <View style={styles.row}>
          <FontAwesome name="clock-o" size={18} color={colors.text} />
          <Text style={styles.timeText}>
            {secondsToHMS(fullCourseLengthInSeconds)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  topSection: {
    position: "absolute",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
  },
  image: {
    flex: 1,
  },
  infoSection: {
    borderTopWidth: 2,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xxs,
  },
  descriptionText: {
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.xs,
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
  },
});

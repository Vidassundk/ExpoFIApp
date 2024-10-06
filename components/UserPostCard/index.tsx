import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { getInitialsFromAllWords, timeAgo } from "./helpers";
import { CommunityPost } from "@/features/comminuty/types";
import { default as Text } from "../ThemedText";
import { useTheme } from "@/features/theme/hooks/useTheme";
import IconButton from "../IconButton";

interface UserPostCardProps {
  userFullName: CommunityPost["userFullName"];
  description: CommunityPost["description"];
  createdAt: CommunityPost["postedAt"];
  isLiked: boolean;
  onPressLike: () => void;
}

const UserPostCard = ({
  userFullName,
  description,
  isLiked,
  onPressLike,
  createdAt,
}: UserPostCardProps) => {
  const timeAgoValue = useMemo(() => timeAgo(createdAt), [createdAt]);
  const initials = useMemo(
    () => getInitialsFromAllWords(userFullName),
    [userFullName]
  );
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderColor: colors.text }]}>
      <View style={styles.header}>
        <View style={[styles.initialsContainer, { borderColor: colors.text }]}>
          <Text style={styles.initialsText}>{initials}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userFullName}>{userFullName}</Text>
          <Text style={styles.timeAgo}>{timeAgoValue}</Text>
        </View>
      </View>
      <Text>{description}</Text>
      <IconButton
        onPress={onPressLike}
        color={isLiked ? colors.heart : colors.text}
        name={isLiked ? "heart" : "heart-o"}
      />
    </View>
  );
};

// Use React.memo to avoid unnecessary re-renders
export default React.memo(UserPostCard, (prevProps, nextProps) => {
  // Avoid re-rendering if props haven't changed
  return (
    prevProps.userFullName === nextProps.userFullName &&
    prevProps.description === nextProps.description &&
    prevProps.isLiked === nextProps.isLiked &&
    prevProps.createdAt === nextProps.createdAt
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    gap: 8,
  },
  initialsContainer: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  initialsText: {
    fontSize: 16,
  },
  userInfo: {
    gap: 2,
  },
  userFullName: {
    fontWeight: "bold",
  },
  timeAgo: {
    opacity: 0.7,
  },
});

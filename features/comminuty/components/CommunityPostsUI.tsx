import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import UserPostCard from "@/components/UserPostCard";
import LoadingIndicator from "@/components/LoadingIndicator";
import Spacing from "@/features/theme/constants/spacing";

interface CommunityPostsUIProps {
  displayedPosts: any[];
  toggleLike: (postId: string) => void;
  isLiked: (postId: string) => boolean;
  loadMorePosts: () => void;
  loading: boolean;
}

const CommunityPostsUI = ({
  displayedPosts,
  toggleLike,
  isLiked,
  loadMorePosts,
  loading,
}: CommunityPostsUIProps) => {
  if (displayedPosts.length === 0 && loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={displayedPosts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item: { userFullName, description, postedAt, id } }) => (
        <UserPostCard
          userFullName={userFullName}
          description={description}
          onPressLike={() => toggleLike(id)}
          isLiked={isLiked(id)}
          createdAt={postedAt}
        />
      )}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <LoadingIndicator /> : null}
      getItemLayout={(_, index) => ({
        length: 120,
        offset: 120 * index,
        index,
      })}
    />
  );
};

export default CommunityPostsUI;

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
    margin: Spacing.lg,
    paddingBottom: 50,
  },
  loadingContainer: { flex: 1, justifyContent: "center" },
});

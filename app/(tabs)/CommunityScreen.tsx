import React from "react";
import { View } from "react-native";
import { useCommunityPosts } from "@/features/comminuty/hooks/useCommunityPosts";
import { usePaginatedPosts } from "@/features/comminuty/hooks/usePaginatedPosts";
import { useToggleLike } from "@/features/comminuty/hooks/useToggleLike";
import LoadingIndicator from "@/components/LoadingIndicator";
import CommunityPostsUI from "@/features/comminuty/components/CommunityPostsUI";

const CommunityScreen = () => {
  const { communityPosts } = useCommunityPosts();
  const { displayedPosts, loadMorePosts, loading } = usePaginatedPosts(
    communityPosts,
    10
  );
  const { toggleLike, isLiked } = useToggleLike();

  if (communityPosts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <CommunityPostsUI
      displayedPosts={displayedPosts}
      toggleLike={toggleLike}
      isLiked={isLiked}
      loadMorePosts={loadMorePosts}
      loading={loading}
    />
  );
};

export default CommunityScreen;

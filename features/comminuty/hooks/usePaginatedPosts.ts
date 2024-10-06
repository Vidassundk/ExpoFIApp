import { useState, useEffect } from "react";
import { CommunityPost } from "../types";

export const usePaginatedPosts = (
  communityPosts: CommunityPost[],
  pageSize: number
) => {
  const [displayedPosts, setDisplayedPosts] = useState<CommunityPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (communityPosts.length > 0) {
      loadMorePosts();
    }
  }, [communityPosts]);

  const loadMorePosts = () => {
    if (loading || !hasMore) return;

    setLoading(true);

    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const newPosts = communityPosts.slice(startIndex, endIndex);

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage(page + 1);
      }

      setLoading(false);
    }, 2000);
  };

  return { displayedPosts, loadMorePosts, loading, hasMore };
};

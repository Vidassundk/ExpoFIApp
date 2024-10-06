import { useState, useEffect } from "react";
import { fetchCommunityPosts } from "../api/communityPostsApi";
import { CommunityPost } from "../types";

export const useCommunityPosts = () => {
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const posts = await fetchCommunityPosts();
        setCommunityPosts(posts);
      } catch (err) {
        setError("Failed to load community posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { communityPosts, loading, error };
};

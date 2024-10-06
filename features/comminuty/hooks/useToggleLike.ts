import { useLikes } from "@/features/comminuty/state/LikesContext";

export const useToggleLike = () => {
  const { addLike, removeLike, isLiked } = useLikes();

  const toggleLike = (postId: string) => {
    if (isLiked(postId)) {
      removeLike(postId);
    } else {
      addLike(postId);
    }
  };

  return { toggleLike, isLiked };
};

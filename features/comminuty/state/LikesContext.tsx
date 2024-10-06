import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LikesContextProps {
  likedPostIds: string[];
  addLike: (postId: string) => void;
  removeLike: (postId: string) => void;
  isLiked: (postId: string) => boolean;
}

const LikesContext = createContext<LikesContextProps | undefined>(undefined);

const LIKES_KEY = "likedPosts";

export const LikesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);

  useEffect(() => {
    const loadLikes = async () => {
      try {
        const storedLikes = await AsyncStorage.getItem(LIKES_KEY);
        if (storedLikes) {
          setLikedPostIds(JSON.parse(storedLikes));
        }
      } catch (error) {
        console.error("Failed to load likes from storage", error);
      }
    };

    loadLikes();
  }, []);

  useEffect(() => {
    const saveLikes = async () => {
      try {
        await AsyncStorage.setItem(LIKES_KEY, JSON.stringify(likedPostIds));
      } catch (error) {
        console.error("Failed to save likes to storage", error);
      }
    };

    if (likedPostIds.length > 0) {
      saveLikes();
    }
  }, [likedPostIds]);

  const addLike = (postId: string) => {
    setLikedPostIds((prevLikes) => [...prevLikes, postId]);
  };

  const removeLike = (postId: string) => {
    setLikedPostIds((prevLikes) => prevLikes.filter((id) => id !== postId));
  };

  const isLiked = (postId: string) => {
    return likedPostIds.includes(postId);
  };

  return (
    <LikesContext.Provider
      value={{ likedPostIds, addLike, removeLike, isLiked }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = (): LikesContextProps => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error("useLikes must be used within a LikesProvider");
  }
  return context;
};

import apiClient from "../../../services/api/apiClient";

export const fetchCommunityPosts = async () => {
  try {
    const response = await apiClient.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching community posts:", error);
    throw error;
  }
};

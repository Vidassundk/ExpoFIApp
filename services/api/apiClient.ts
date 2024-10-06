import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const getBaseUrl = () => {
  const expoConfig = Constants.expoConfig;
  const extra = expoConfig?.extra;

  if (__DEV__) {
    if (Platform.OS === "android") {
      return "http://10.0.2.2:3000"; // Android emulator
    } else {
      return extra?.devBaseUrl || "http://localhost:3000";
    }
  }

  return extra?.prodBaseUrl || "https://your-production-url.com";
};

// Create Axios instance
const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;

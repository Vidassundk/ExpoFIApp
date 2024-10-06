import { useTheme } from "@/features/theme/hooks/useTheme";
import React from "react";
import { ActivityIndicator } from "react-native";

const LoadingIndicator = () => {
  const { colors } = useTheme();
  return <ActivityIndicator size="large" color={colors.primary} />;
};

export default LoadingIndicator;

import { useTheme } from "@/features/theme/hooks/useTheme";
import React from "react";
import {
  Text as DefaultText,
  TextProps as DefaultTextProps,
} from "react-native";

interface ThemedTextProps extends DefaultTextProps {}

const ThemedText = ({ style, ...props }: ThemedTextProps) => {
  const { colors } = useTheme();

  return <DefaultText style={[{ color: colors.text }, style]} {...props} />;
};

export default ThemedText;

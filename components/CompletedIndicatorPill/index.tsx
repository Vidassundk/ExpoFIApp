import React from "react";
import { View, StyleSheet } from "react-native";
import { default as Text } from "../ThemedText";
import { useTheme } from "@/features/theme/hooks/useTheme";
import Spacing from "@/features/theme/constants/spacing";

interface CompletedIndicatorPillProps {
  percentNumber: number;
}

const CompletedIndicatorPill = ({
  percentNumber,
}: CompletedIndicatorPillProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.pillContainer,
        { backgroundColor: colors.pastelBackground, borderColor: colors.text },
      ]}
    >
      <Text style={{ fontSize: 10 }}>{`${percentNumber}% completed`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    alignItems: "center",
    alignSelf: "flex-start",
  },
});

export default CompletedIndicatorPill;

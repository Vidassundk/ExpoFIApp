import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";

type IconButtonProps = {
  onPress: () => void;
  color: string;
  name: React.ComponentProps<typeof FontAwesome>["name"];
  style?: StyleProp<TextStyle>;
};

const IconButton = ({ onPress, color, name, style }: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome
        size={20}
        color={color}
        style={[styles.icon, style]}
        name={name}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});

export default IconButton;

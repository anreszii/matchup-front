import {
  Button as NativeButton,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Text } from "ui/Text.js";
import Svg, {
  Path,
  Defs,
  G,
  ClipPath,
  Circle,
  Mask,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";
import { containerWidth } from "@/constants/sizes.js";

export function Button({
  onPress,
  title,
  style,
  bg,
  disabled,
  outline,
  width = containerWidth,
  height = 48,
}) {
  const viewBox = `0 0 ${width} ${height}`;
  const outlineStrokeWidth = 2;
  const disabledBg = "#464646";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        ...style,
        backgroundColor: "transparent",
      }}
      activeOpacity={disabled && 1}
    >
      <Svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Defs>
          <LinearGradient
            id="linear_button"
            x1={13}
            y1={0}
            x2={width}
            y2={height}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FF5A45" />
            <Stop offset={1} stopColor="#DC3E85" />
          </LinearGradient>
          <LinearGradient
            id="linear_button_outline"
            x1={10.2836}
            y1={-1.67595e-5}
            x2={267.089}
            y2={30.2825}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FF5A45" />
            <Stop offset={1} stopColor="#DC3E85" />
          </LinearGradient>
        </Defs>
        {disabled ? (
          <Rect width={width} height={height} rx={10} fill={disabledBg} />
        ) : outline ? (
          <>
            <Rect
              width={width}
              height={height}
              x={1}
              y={1}
              rx={9}
              fill="#D63A36"
              fillOpacity={0.2}
            />
            <Rect
              width={width - outlineStrokeWidth}
              height={height - outlineStrokeWidth}
              x={1}
              y={1}
              rx={9}
              strokeWidth={outlineStrokeWidth}
              stroke="url(#linear_button_outline)"
            />
          </>
        ) : (
          <Rect
            width={width}
            height={height}
            rx={10}
            fill={bg || "url(#linear_button)"}
          />
        )}
      </Svg>
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    maxWidth: containerWidth,
    height: 48,
    borderColor: "#fff",
    backgroundColor: "#464646",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#9E9E9E",
    color: "white",
    fontWeight: "600",
    position: "absolute",
  },
  textDisabled: {
    color: "#9E9E9E",
  },
});

import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import Svg, { Path, Defs, G, ClipPath, Circle, Mask, LinearGradient, Stop, Rect } from "react-native-svg"

const getPercentage = (progress, total) => {
  const percent = (100 / total) * progress;
  return parseInt(percent) || 0;
}

export function Progress({ total, progress, big, lineStyle = "default" }) {
  const [containerWidth, setContainerWidth] = useState(1);
  const [progressWidth, setProgressWidth] = useState("0%");
  const isSuccess = total === progress;
  const lineHeight = big ? 8 : 4;

  return (
    <View
      style={{
        ...styles.progressBarContainer,
        height: lineHeight,
      }}
      onLayout={({ nativeEvent }) => {
        setContainerWidth((nativeEvent.layout?.width - 2) || 1);
        setProgressWidth(
          getPercentage(progress, total) + "%"
        );
      }}
    >
       <Svg
        width={containerWidth}
        height={lineHeight}
        viewBox={`0 0 ${containerWidth} ${lineHeight}`}
        fill="none"
      >
        <Defs>
          <LinearGradient id="progress_default" x1="9.23583" y1="-1.39663e-06" x2="98.6581" y2="113.643" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FF5A45"/>
            <Stop offset="1" stopColor="#DC3E85"/>
          </LinearGradient>
          <LinearGradient id="progress_success" x1="11.603" y1="-1.39663e-06" x2="94.3799" y2="132.161" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#264617"/>
            <Stop offset="1" stopColor="#58C225"/>
          </LinearGradient>
          <LinearGradient id="progress_gold" x1="240" y1="2.00012" x2="-1.61749e-06" y2="1.99992" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFBA52"/>
            <Stop offset="1" stopColor="#FFBA52" stopOpacity="0"/>
          </LinearGradient>
          <LinearGradient id="progress_green" x1="226" y1="5.0003" x2="-1.52326e-06" y2="5.00023" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#58C225"/>
            <Stop offset="1" stopColor="#58C225" stopOpacity="0"/>
          </LinearGradient>
        </Defs>
        <Rect
          width={progressWidth}
          height={lineHeight}
          rx={big ? 4 : 2}
          fill={`url(#progress_${isSuccess ? "success" : lineStyle})`}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    paddingHorizontal: 1,
    width: "100%",
    flexShrink: 1,
    backgroundColor: "#0F151A",
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
  },
});

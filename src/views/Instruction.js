import { useState, useRef, useEffect } from "react";
import { View, SafeAreaView, ImageBackground, StyleSheet, Animated, Easing } from "react-native";
import { TextComponent } from "ui/Text.js";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg"
import { Button } from "ui/Button.js";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { containerWidth } from "@/constants/sizes.js";

import { useTranslation } from "react-i18next";

const AnimatedText = Animated.createAnimatedComponent(TextComponent); 

export function Instruction({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [carousel, setCarousel] = useState(null);
  const [dotWidth, dotHeight] = [68, 6];

  const {t} = useTranslation();

  const instructions = [
    {
      title: t("screens.instruction.s1.title"),
      description: t("screens.instruction.s1.description"),
    },
    {
      title: t("screens.instruction.s2.title"),
      description: t("screens.instruction.s2.description"),
    },
    {
      title: t("screens.instruction.s3.title"),
      description: t("screens.instruction.s3.description"),
    },
  ];

  const animations = [...Array(3)].map(_ => ({position: useRef(new Animated.Value(40)).current, opacity: useRef(new Animated.Value(0)).current}))

  const animate = (index) => {
    animations[index].position.setValue(40)
    animations[index].opacity.setValue(0)
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(animations[index].position, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(animations[index].opacity, {
          toValue: index == 1 ? 0.6 : 1,
          duration: 200,
          useNativeDriver: true
        })
      ]),
      Animated.timing(animations[index].position, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true
      }),
    ])
  }

  const renderItem = ({item, index}) => {
    const isLast = instructions.length -1 === index;

    Animated.sequence([...Array(3).keys()].map(index => animate(index))).start()

    return (
      <View style={{justifyContent: 'space-between', alignItems: 'center', height: 250}}>
        <View>
                  <AnimatedText style={[styles.instructionText, styles.instructionTitle]}>
          {item.title}
        </AnimatedText>
        </View>
        <View>
        <AnimatedText style={[styles.instructionText, styles.instructionDescription]}>
          {item.description}
        </AnimatedText>
        </View>

        <Animated.View>
          <Button
            title={isLast ? t("labels.start") : t("labels.continue")}
            width={155}
            onPress={() => {
              setActiveSlide(activeSlide + 1)
              if (isLast) {
                navigation.navigate("Welcome");
              } else {
                carousel.snapToNext();
              }
            }}
          />
        </Animated.View>
      </View>
    );
  };

  const renderDot = (activeIndex, total, context) => {
    return (
      [...Array(total)].map((_, index) => (
        <Svg
          width={dotWidth}
          height={dotHeight}
          viewBox={`0 0 ${dotWidth} ${dotHeight}`}
          fill="none"
          key={index}
          style={{
            marginRight: total - 1 === index ? 0 : 10,
          }}
        >
          <Defs>
            <LinearGradient id="linear_button" x1={13} y1={0} x2={dotWidth} y2={dotHeight} gradientUnits="userSpaceOnUse">
              <Stop stopColor="#FF5A45" />
              <Stop offset={1} stopColor="#DC3E85" />
            </LinearGradient>
          </Defs>
          {
            activeIndex === index
              ? <Rect width={dotWidth} height={dotHeight} rx={3} fill="url(#linear_button)" />
              : <Rect width={dotWidth} height={dotHeight} rx={3} fill="#3C4146" />
          }
        </Svg>
      ))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.backgroundContainerWrapper} source={require("assets/instruction-bg.png")} resizeMode="cover">
        <View style={styles.instructionContainer}>
          <Pagination
            dotsLength={instructions.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            renderDots={renderDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <Carousel
            scrollEnabled={false}
            ref={(carousel) => { setCarousel(carousel) }}
            data={instructions}
            renderItem={renderItem}
            sliderWidth={containerWidth}
            style={[styles.spacing]}
            itemWidth={containerWidth}
            sliderHeight={100}
            itemHeight={100}
            onSnapToItem={(index) => setActiveSlide(index) }
            containerCustomStyle={{flexGrow: 0, marginBottom: 50,}}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent:"flex-end",
  },
  backgroundContainerWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  paginationContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 40,
  },
  instructionContainer: {
    width: "90%",
    backgroundColor:"rgba(238, 238, 238, 0.1)",
    borderRadius: 24,
    borderWidth: 2,
    borderColor:"#2c3237",
    paddingTop: 20,
    paddingHorizontal: 5,
    alignItems: "center",
    marginBottom: 30,
    justifyContent: 'space-between'
  },
  instructionText: {
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
    justifyContent: 'flex-end'
  },
  instructionTitle: {
    fontWeight: "600",
    fontSize: 20,
  },
  instructionDescription: {
    opacity: 0.6,
    fontWeight: "500",
    fontSize: 16,
  },
  instructionButton: {
   marginTop: 'auto'
  },
  spacing: {
    justifyContent: 'space-between'
  }
});

import { Fragment, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import Svg, { Path } from "react-native-svg";

import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/store/layoutSlice.js";

import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Language() {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.layout.languages);
  const language = useSelector((state) => state.layout.language);
  const { i18n } = useTranslation();

  return (
    <View style={styles.languageWrapper}>
      <View style={styles.languageContainer}>
        <Svg
          style={{ marginRight: 6 }}
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.813 3.48a6.896 6.896 0 00-3.938 3.395h2.663c.164-.847.394-1.618.678-2.28a6.7 6.7 0 01.597-1.115zM6.35 8.125H3.384A6.88 6.88 0 003.125 10c0 .65.09 1.279.259 1.875H6.35c-.065-.602-.1-1.23-.1-1.875 0-.644.035-1.273.1-1.875zm1.258 3.75A15.99 15.99 0 017.5 10c0-.653.038-1.281.108-1.875h4.784c.07.594.108 1.222.108 1.875s-.038 1.281-.108 1.875H7.608zm-1.07 1.25H3.875a6.896 6.896 0 003.938 3.395 6.7 6.7 0 01-.597-1.114 11.302 11.302 0 01-.678-2.281zm5.649 3.395a6.896 6.896 0 003.938-3.395h-2.663a11.302 11.302 0 01-.678 2.28 6.693 6.693 0 01-.597 1.115zm0-3.395a9.772 9.772 0 01-.552 1.789c-.263.614-.56 1.07-.858 1.365-.295.291-.557.393-.777.393-.22 0-.482-.102-.777-.393-.298-.294-.595-.751-.858-1.365a9.772 9.772 0 01-.551-1.789h4.372zm1.463-1.25h2.966A6.88 6.88 0 0016.875 10c0-.65-.09-1.279-.259-1.875H13.65c.065.602.1 1.23.1 1.875 0 .644-.035 1.273-.1 1.875zm-.188-5h2.663a6.896 6.896 0 00-3.938-3.395c.224.33.423.707.597 1.114.284.663.514 1.434.678 2.281zm-1.276 0H7.814a9.771 9.771 0 01.55-1.789c.264-.614.56-1.07.859-1.365.295-.291.557-.393.777-.393.22 0 .482.102.777.393.298.295.595.751.858 1.365.22.514.408 1.118.551 1.789zm-2.186-5a8.125 8.125 0 100 16.25 8.125 8.125 0 000-16.25z"
            fill="#fff"
          />
        </Svg>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {languages.map((lang, index) => {
            return (
              <Fragment key={index}>
                <TouchableOpacity
                  style={styles.languageTextWrapper}
                  onPress={async () => {
                    i18n.changeLanguage(lang);
                    dispatch(setLanguage(lang));
                    await AsyncStorage.setItem('lang', lang)

                  }}
                >
                  <Text
                    style={[
                      styles.languageTextWrapper,
                      language == lang && styles.languageTextWrapperActive,
                    ]}
                  >
                    {lang}
                  </Text>
                </TouchableOpacity>
                {languages.length - 1 > index && (
                  <Text style={styles.languageLine}></Text>
                )}
              </Fragment>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  languageWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  languageContainer: {
    flexDirection: "row",
    width: 83,
    height: 30,
    backgroundColor: "#23292E",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  languageLine: {
    width: 1,
    backgroundColor: "#7b7f82",
    marginHorizontal: 4,
  },
  languageTextWrapper: {
    color: "#7b7f82",
  },
  languageTextWrapperActive: {
    color: "#fff",
  },
});

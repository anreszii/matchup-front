import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "ui/Text.js";
import { Input } from "ui/Input.js";
import { Button } from "ui/Button.js";
import { TextInput } from "react-native-paper";
import { BottomModal } from "@/components/Modals/BottomModal.js";
import { ArrowDown, CheckIcon } from "@/icons";
import { controlsStyles } from "@/styles/controls.js";
import { useTranslation } from "react-i18next";

export function RegionInput({
  mb,
  value,
  onChange,
  isCountry,
  error,
  errorText,
  hint,
}) {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempSelectedRegionIndex, setTempSelectedRegionIndex] = useState(-1);
  const regions = isCountry
    ? ["Россия", "Казахстан", "Китай"]
    : ["Азия", "Европа", "Америка"];
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(
    regions.findIndex((region) => region === value)
  );

  return (
    <>
      <View
        onTouchEnd={() => setIsModalVisible(true)}
        style={{ width: "100%", marginBottom: mb }}
      >
        <Input
          onViewPress={() => setIsModalVisible(true)}
          label={isCountry ? t("labels.country") : t("labels.region")}
          mb={10}
          right={
            <TextInput.Icon
              onPress={() => setIsModalVisible(true)}
              icon={() => (
                <View
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    paddingTop: 10,
                    opacity: 0.4,
                  }}
                >
                  <ArrowDown />
                </View>
              )}
            />
          }
          value={regions[selectedRegionIndex]}
          editable={false}
          error={error}
          wrapperStyle={{
            marginBottom: 0,
          }}
        />
        {error && errorText && (
          <Text
            style={{
              ...controlsStyles.inputError,
              alignSelf: "flex-start",
            }}
          >
            {errorText}
          </Text>
        )}
        {!!hint && <Text style={controlsStyles.inputHint}>{hint}</Text>}
      </View>
      <BottomModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        title={isCountry ? t("labels.country") : t("labels.region")}
      >
        <View>
          {regions.map((region, index) => {
            const isActive = index === tempSelectedRegionIndex;
            return (
              <TouchableOpacity
                key={region}
                onPress={() => setTempSelectedRegionIndex(index)}
                style={[styles.region, isActive && styles.regionActive]}
              >
                <Text style={styles.regionName}>{region}</Text>
                {isActive && <CheckIcon style={styles.regionIcon} />}
              </TouchableOpacity>
            );
          })}
          <Button
            title={t("labels.choose")}
            onPress={() => {
              setSelectedRegionIndex(tempSelectedRegionIndex);
              onChange(regions[tempSelectedRegionIndex]);
              setIsModalVisible(false);
            }}
            style={styles.button}
          />
        </View>
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  region: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
    minHeight: 40,
  },
  regionActive: {
    backgroundColor: "#33393D",
    borderRadius: 10,
  },
  regionName: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
  },
  button: {
    marginTop: 100,
    alignSelf: "center",
  },
});

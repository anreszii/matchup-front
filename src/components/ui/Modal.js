import { useState } from "react";
import { Modal as NativeModal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";

export function Modal({ visible, setVisible, useDefaultStyles, children, full, ...props }) {
  return (
    <NativeModal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setVisible && setVisible(!visible)}
      {...props}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {setVisible(false)}}
        style={[full && {height: "100%", backgroundColor: 'rgba(11, 18, 24, 0.8)'}]}
      >
        <TouchableWithoutFeedback>
          {children}
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </NativeModal>
  );
}

import { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'ui/Text.js';
import { TextInput } from 'react-native-paper';
import { Input } from 'ui/Input.js';
import { CrossIcon, ArrowDown } from '@/icons';

export function Select({
  label,
  isSearchable,
  value,
  setValue,
  options = [],
  ...props
}) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [showOptions, setShowOptions] = useState(false);

  const clear = () => {
    setValue('');
    setSelectedOptionIndex(-1);
  };
  return (
    <View
      onTouchEnd={() => {
        if (value) {
          clear();
        } else {
          setShowOptions(!showOptions);
        }
      }}
      style={styles.container}
    >
      <Input
        label={label}
        value={value}
        onChangeText={(value) => setValue(value)}
        right={
          <TextInput.Icon
            icon={() => (
              <TouchableOpacity
                style={styles.inputIcon}
                onPress={() => {
                  if (value) {
                    clear();
                  } else {
                    setShowOptions(!showOptions);
                  }
                }}
              >
                {!!value ? <CrossIcon /> : <ArrowDown />}
              </TouchableOpacity>
            )}
          />
        }
        editable={!!isSearchable}
        onFocus={() => setShowOptions(true)}
        {...props}
      />

      {showOptions && (
        <ScrollView
          style={[styles.options, { zIndex: 100 }]}
          keyboardShouldPersistTaps='always'
        >
          {options.map((option, index) => {
            const isActive = selectedOptionIndex === index;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.option, isActive && styles.optionActive]}
                onPress={() => {
                  setSelectedOptionIndex(index);
                  setValue(options[index]);
                  setShowOptions(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
  },
  inputIcon: {
    height: '100%',
    justifyContent: 'center',
    paddingTop: 10,
    opacity: 0.4,
  },
  options: {
    backgroundColor: '#32393E',
    borderRadius: 10,
    width: '100%',
    zIndex: 100,
    maxHeight: 138,
    marghinVertical: 5,
  },
  option: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  optionActive: {
    backgroundColor: '#4D555A',
  },
  optionText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: '#fff',
  },
});

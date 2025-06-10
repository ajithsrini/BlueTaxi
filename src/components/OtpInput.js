import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemeColors } from '../constant/Colors';
import { moderateScale, scale } from 'react-native-size-matters';

const OtpInput = ({ length = 4, value = '', onChange }) => {
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newValue = value.split('');
    newValue[index] = text.replace(/[^0-9]/g, '');
    onChange(newValue.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => (inputs.current[index] = ref)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          cursorColor={ThemeColors.primary}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },
  input: {
    width: scale(40),
    marginHorizontal:scale(5),
    borderBottomWidth:2,
    borderColor: ThemeColors.primary,
    textAlign: 'center',
    fontSize: moderateScale(25),
  },
});

export default React.memo(OtpInput);

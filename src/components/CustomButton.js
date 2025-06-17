import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ThemeColors} from '../constant/Colors';
import {scale, verticalScale} from 'react-native-size-matters';
import React from 'react';

function CustomButton({
  lable,
  marginT,
  marginB,
  onPress,
  width = '100%',
  bgColor = ThemeColors.primary,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={[
        style.mainWrapper,
        {
          marginTop: marginT,
          marginBottom: marginB,
          width: width,
          backgroundColor: bgColor,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={style.lable}>{lable || 'Button'}</Text>
    </TouchableOpacity>
  );
}
export default React.memo(CustomButton);

const style = StyleSheet.create({
  mainWrapper: {
    borderRadius: scale(10),
  },
  lable: {
    fontSize: scale(16),
    fontWeight: '500',
    color: ThemeColors.secondary,
    marginVertical: verticalScale(10),
    alignSelf: 'center',
  },
});

import {StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {ThemeColors} from '../../../constant/Colors';
import {XMarkIcon} from 'react-native-heroicons/outline';
import PromoIcon from '../../../assets/images/svg/promo.svg';
import CustomButton from '../../../components/CustomButton';
import { useState } from 'react';


function PromoCodeComponent({togglePromoModel,appliedPromo ,setAppliedPromo}) {
    
    const [enteredPromo, setEnteredPromo] = useState('');
  const onPress = ()=>{
    if(enteredPromo.trim().length >= 4 ){
        togglePromoModel()
        setAppliedPromo(enteredPromo)
        ToastAndroid.show("Promo Code Applied", ToastAndroid.SHORT);
    }else{
        ToastAndroid.show("Invalid Promo Code", ToastAndroid.SHORT);
    }
  }
  return (
    <View style={style.mainWrapper}>
      <View style={style.headerWrapper}>
        <Text style={style.headerText}>Promo Code</Text>
        <XMarkIcon
          size={moderateScale(25)}
          color={ThemeColors.text2}
          strokeWidth={2}
          style={{position: 'absolute', right: moderateScale(15)}}
          onPress={()=>togglePromoModel()}
        />
      </View>
      <View style={style.body}>
        <View style={style.textInputWrapper} >
          <PromoIcon height={moderateScale(25)} width={moderateScale(25)}  />
          <TextInput
            placeholder="Enter Promo Code"
            placeholderTextColor={ThemeColors.text2}
            value={enteredPromo}
            onChangeText={setEnteredPromo}
            cursorColor={ThemeColors.primary}
            style={style.textInput}
          />
        </View>
        <CustomButton lable={"Apply"} onPress={onPress} disabled={enteredPromo.length >=4 ? false : true} />
      </View>
    </View>
  );
}

export default PromoCodeComponent;

const style = StyleSheet.create({
  mainWrapper: {
    backgroundColor: ThemeColors.secondary,
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
  },
  headerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    position: 'relative',
    borderBottomWidth: 0.5,
    borderBottomColor: ThemeColors.text2,
    // backgroundColor: ThemeColors.lightGray,
    backgroundColor:ThemeColors.lightBlue,
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: ThemeColors.text1,
    letterSpacing: 1,
  },
  body: {
    paddingHorizontal:scale(15),
    gap:verticalScale(25),
    paddingVertical:verticalScale(25)
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: ThemeColors.text2,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),

  },
  textInput: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: ThemeColors.text1,
    marginLeft: scale(10),
    flex: 1,
    marginVertical: scale(3),
  },
});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import OtpInput from '../../components/OtpInput';
import { useCallback, useState } from 'react';
import CustomButton from '../../components/CustomButton';

function OtpVerify({navigation}) {
    const[otp,setOtp] = useState("")
    const navigateGoBack =useCallback(() => {
      navigation.goBack()
    },[navigation])

    const handleNavigation = ()=>{
      navigation.navigate("AppStack")
    }

  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.header}>
        <Image
          source={require('../../assets/images/png/flashBg.png')}
          style={{width: '100%', height: '80%'}}
          resizeMode="cover"
        />
        <View style={{position:"absolute",left:0,transform:[{translateY:-verticalScale(40)}]}}>
            <TouchableOpacity style={style.backIconWrapper} onPress={navigateGoBack}>
                <ChevronLeftIcon size={scale(30)} color={ThemeColors.primary} style={{margin:5}}/>
            </TouchableOpacity>
        <Text style={style.heaerText}>
            Phone Verification
        </Text>
        <Text style={style.headerSubText}>
        Enter your OTP code here

        </Text>
        </View>
      </View>
      <View style={style.body}>
        <OtpInput value={otp} onChange={setOtp} />
        <CustomButton 
        lable={'Verify Now'}
         marginT={verticalScale(25)}
         marginB={verticalScale(25)} 
         width='80%' 
         onPress={handleNavigation}
         bgColor={otp.length === 4 ?ThemeColors.primary : "lightgray"}
         disabled={otp.length === 4 ? false : true}
          />
          <Text style={style.resend}>
            Didn't get the code? <Text style={{fontWeight:"600",color:ThemeColors.primary}}>Resend</Text>
          </Text>
      </View>
    </SafeAreaView>
  );
}

export default OtpVerify;

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ThemeColors.primary,
  },
  header: {
    flex: 0.25,
    backgroundColor: ThemeColors.primary,
    justifyContent: 'flex-end',
    position:"relative"
  },
  body: {
    flex: 0.75,
    backgroundColor: ThemeColors.secondary,
    alignItems:"center",
    paddingTop:verticalScale(25)
  },
  heaerText: {
    fontSize: moderateScale(30),
    fontWeight: '600',
    color: ThemeColors.secondary,
    marginTop:verticalScale(10),
    marginLeft:scale(10)
  },
  backIconWrapper:{
    backgroundColor:ThemeColors.secondary,
    borderRadius:scale(50),
    alignSelf:"flex-start",
    justifyContent:"center",
    alignItems:"center",
    marginLeft:scale(10)
  },
  headerSubText: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: ThemeColors.secondary,
    marginTop:verticalScale(10),
    marginLeft:scale(10)
  },
  resend:{
    color:ThemeColors.text1,
    fontSize:moderateScale(14),
    fontWeight:"400"
  }
});

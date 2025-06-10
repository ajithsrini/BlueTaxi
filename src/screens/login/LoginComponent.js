import {StyleSheet, Text, View} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ThemeColors} from '../../constant/Colors';
import React, {useCallback} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

const loginValidationScema = Yup.object({
    phone:Yup.string()
    .trim()
    .required("phone number required")
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
})

function LoginComponent({navigation}) {
  const navigateToOTP = useCallback(() => {
    navigation.navigate('OtpVerify');
  }, [navigation]);

  return (
    <Formik
    initialValues={{phone:""}}
    validationSchema={loginValidationScema}
    onSubmit={(value)=>{
        navigateToOTP()
        console.log("login called")
    }}
    >
    {
        ({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
        })=><View style={style.formContainer}>
      <Text style={style.loginText}>Login with your phone number</Text>
      <CustomTextInput
        placeholder={'Enter mobile number'}
        marginV={verticalScale(20)}
        value={values.phone}
        onChangeText={handleChange("phone")}
        onBlur={handleBlur("phone")}
        error={touched.phone && errors.phone}
        keyboardType={"number-pad"}
      />
      <CustomButton
        lable={'Next'}
        marginT={verticalScale(10)}
        onPress={()=>handleSubmit(values)}
      />
    </View>
    }
    </Formik>
  );
}

export default React.memo(LoginComponent);

const style = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: ThemeColors.secondary,
    paddingHorizontal: scale(20),
    justifyContent: 'center',
  },
  loginText:{
    fontSize:moderateScale(14),
    fontWeight:"500",
    color:ThemeColors.text1
  }
});

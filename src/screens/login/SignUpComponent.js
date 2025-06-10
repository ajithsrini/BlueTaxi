import {StyleSheet, View} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {ThemeColors} from '../../constant/Colors';
import {scale, verticalScale} from 'react-native-size-matters';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  phone: Yup.string()
    .trim()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

function SignUpComponent({navigation}) {
  return (
    <Formik
      initialValues={{email: '', phone: ''}}
      validationSchema={SignUpSchema}
      onSubmit={values => console.log('form values', values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={style.formContainer}>
          <CustomTextInput
            placeholder={'Enter mail'}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && errors.email}
            marginV={verticalScale(5)}
            keyboardType={'email-address'}
          />
          <CustomTextInput
            placeholder={'Enter mobile number'}
            marginV={scale(20)}
            value={values.phone}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            error={touched.phone && errors.phone}
            keyboardType={'number-pad'}
          />
          <CustomButton
            lable={'Sign Up'}
            marginT={verticalScale(10)}
            onPress={() => handleSubmit(values)}
          />
        </View>
      )}
    </Formik>
  );
}

export default React.memo(SignUpComponent);

const style = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: ThemeColors.secondary,
    paddingHorizontal: scale(20),
    justifyContent: 'center',
  },
});

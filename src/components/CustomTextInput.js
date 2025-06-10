import { StyleSheet, Text, TextInput, View } from "react-native"
import { moderateScale, scale } from "react-native-size-matters"
import { ThemeColors } from "../constant/Colors"
import React from "react"

function CustomTextInput({placeholder,value,onChangeText,marginV,onBlur,error,keyboardType}){
    return(
        <View style={{marginVertical:marginV}}>
        <View style={style.mainWrapper}>
        <TextInput 
            placeholder={placeholder || "Enter text"}
            placeholderTextColor={ThemeColors.text2}
            style={style.textInput}
            value={value}
            onChangeText={onChangeText}
            cursorColor={ThemeColors.primary}
            onBlur={onBlur}
            keyboardType={keyboardType ||"default"}
        />
        

        </View>
        {error && <Text style={style.errorTxt}>{error}</Text>}
        </View>
        
    )
}

export default React.memo(CustomTextInput)

const style = StyleSheet.create({
    mainWrapper:{
        borderWidth:1,
        borderRadius:scale(10),
        borderColor:ThemeColors.text2,
    },
    textInput:{
        color:"black",
        fontSize:scale(14),
        paddingLeft:scale(10)
    },
    errorTxt:{
        fontSize:moderateScale(13),
        color:"red",
        marginTop:scale(2),
        
    }
})
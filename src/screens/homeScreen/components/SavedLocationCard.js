import { StyleSheet, Text, View } from "react-native"
import { HeartIcon } from "react-native-heroicons/solid"
import { ThemeColors } from "../../../constant/Colors"
import PastTime from "../../../assets/images/svg/pastTime.svg"
import { scale, verticalScale } from "react-native-size-matters"

function SavedLocationCard ({item}){

    return(
        <View style={style.mainWrapper}>
        <View style={style.imageWrapper}>
            <HeartIcon size={scale(18)} color={"#E53935"}  />
        </View>
        <View style={style.detailWrapper}>
            <Text style={style.name} numberOfLines={1}>{item.name}</Text>
            <Text style={style.address} numberOfLines={1}>{item.address}</Text>
        </View>
        {/* <View style={style.imageWrapper}>
            <PastTime height={scale(15)} width={scale(15)}/>
        </View> */}

        </View>
    )


}

export default SavedLocationCard

const style = StyleSheet.create({
    mainWrapper:{
        backgroundColor:"#F2F6FD",
        flexDirection:"row",
        marginHorizontal:scale(15),
        marginVertical:verticalScale(3.5),
        borderRadius:scale(10),
        borderWidth:0.4,
        borderColor:"lightgray",
        elevation:1
    },
    imageWrapper:{
        flex:1.5,
        justifyContent:"center",
        alignItems:"center"
    },
    detailWrapper:{
        flex:8.5,
        justifyContent:"center",
        gap:verticalScale(2),
        paddingVertical:verticalScale(7)
    },
    name:{
        fontSize:scale(13),
        fontWeight:"500",
        color:ThemeColors.text1,
        width:"90%"
    },
    address:{
        fontSize:scale(11),
        fontWeight:"400",
        color:"gray",
        width:"90%"
    }
})
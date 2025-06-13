import {Image, StyleSheet, Text, View} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { ThemeColors } from '../constant/Colors';

function VehicleListCard({data}) {
  return (
    <View style={style.mainWrapper}>
      <View style={style.vehicleWrapper}>
        <Image
        source={require("../assets/images/png/car.png")}
        style={style.image}
        resizeMode='contain'
         />
      </View>
      <View style={style.detailWrapper}>
        <Text style={style.carType}>{data.carType}</Text>
        <Text style={style.carDistance}>{data.distance}</Text>
      </View>
      <View style={style.priceWrapper}>
        <Text style={style.price}>{data.price}</Text>
        <Text style={style.arriveDuration}>{data.arriveTime}</Text>
      </View>
    </View>
  );
}

export default VehicleListCard;

const style = StyleSheet.create({
  mainWrapper: {
    backgroundColor:"white",
    flexDirection:"row",
    borderRadius:scale(15),
    borderColor:ThemeColors.primary,
    borderWidth:1,
    marginVertical:verticalScale(6),
    marginHorizontal:scale(15),
    paddingVertical:scale(3),
    paddingHorizontal:scale(15),
  },
  vehicleWrapper:{
    flex:20,
    justifyContent:"center",
    // alignItems:"center"
  },
  detailWrapper:{
    flex:50,
    justifyContent:"space-evenly",
    paddingLeft:scale(5)
  },
  carType:{
    fontSize:scale(15),
    fontWeight:"600",
    color:ThemeColors.text1
  },
  carDistance:{
    fontSize:scale(12),
    fontWeight:"500",
    color:ThemeColors.primary 
 },
  price:{
    fontSize:scale(14),
    fontWeight:"600",
    color:ThemeColors.text1
  },
  arriveDuration:{
    fontSize:scale(12),
    fontWeight:"400",
    color:"gray"
  },
  priceWrapper:{
    flex:30,
    justifyContent:"space-evenly",
    alignItems:"flex-end"
  },
  image:{
    height:scale(40),
    width:scale(40),
    marginVertical:verticalScale(5)
  }
});

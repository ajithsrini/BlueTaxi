import { Alert, Button, Linking, PermissionsAndroid, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeColors } from "../../constant/Colors";
import { useEffect } from "react";
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen() {
    const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; 
  };

  const checkGPS = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => resolve(true),
        (error) => {
          if (error.code === 2) resolve(false);
          else reject(error);
        },
        {enableHighAccuracy: true, timeout: 10000}
      );
    });
  };

  

  const handleLocationCheck = async () => {
    console.log("function running")
    const permissionGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (!permissionGranted) {
      const requested = await requestLocationPermission();
      if (!requested) {
        // Alert.alert('Permission Denied', 'Location access is required for this app.');
        // return;
      }
    }

    const gpsEnabled = await checkGPS();
    

   if(gpsEnabled){
     Geolocation.getCurrentPosition(
      (position) => {
        console.log('Location:', position.coords);
        
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    );
   }
  };

  useEffect(() => {
    setTimeout(() => {
        handleLocationCheck();
    }, 500);
  }, []);

  const getPickUp = async()=>{
    const response = await AsyncStorage.multiGet(['latitude','longitude'])
    console.log("pickup location","latitude",response[0][1],"longitude",response[1][1])

  }

    return (
        <SafeAreaView style={style.safeArea}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:20,fontWeight:"700",color:ThemeColors.primary}}>
                Home screen
            </Text>
            <Button title="Click" onPress={getPickUp} />
        </View>

        </SafeAreaView>
    );
}

export default HomeScreen

const style = StyleSheet.create({
    safeArea:{
        backgroundColor:ThemeColors.secondary,
        flex:1
    }
})
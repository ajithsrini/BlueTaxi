import React, {useEffect, useState,useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import PolyLineDecoder from '@mapbox/polyline';
import {GOOGLE_MAPS_APIKEY} from '../../utils/MapUtils';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeColors} from '../../constant/Colors';
import {
  moderateScale,
  s,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {
  BanknotesIcon,
  ChevronRightIcon,
  WalletIcon,
} from 'react-native-heroicons/outline';
import VehicleListCard from '../../components/VehicleListCard';
import {carData} from '../../constant/VehicleData';
import {MapPinIcon} from 'react-native-heroicons/solid';

const RideDetails = ({route}) => {
  const [routeCoords, setRouteCoords] = useState([]);

  const{pickupLocation,dropLocation} = route.params

  console.log("route params",pickupLocation,dropLocation)

  const mapRef = useRef(null);

  const origin = pickupLocation;
  const destination = dropLocation;

  const originName = pickupLocation.name;
  const destinationName = dropLocation.name;

  const apiKey = GOOGLE_MAPS_APIKEY;

  const fetchRoute = async () => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;

    const response = await fetch(url);
    const json = await response.json();
    if (json.routes.length) {
      const points = PolyLineDecoder.decode(
        json.routes[0].overview_polyline.points,
      );
      const coords = points.map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));
      setRouteCoords(coords);
    }
  };

  useEffect(() => {
    fetchRoute();
  }, []);
  useEffect(() => {
  if (routeCoords.length > 0 && mapRef.current) {
    mapRef.current.fitToCoordinates([origin, destination], {
      edgePadding: {
        top: 50,
        right: 70,
        bottom: 50,
        left: 70,
      },
      animated: true,
    });
  }
}, [routeCoords]);

  return (
    <View style={styles.mainWrapper}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <MapView
        ref={mapRef} 
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker coordinate={origin}>
            <View style={styles.markerWrapper}>
              <View style={styles.markertextWrapper}>
                <Text style={styles.markerText} numberOfLines={1}>{originName}</Text>
              </View>
              <MapPinIcon color={'red'} />
            </View>
          </Marker>
          <Marker coordinate={destination}>
             <View style={styles.markerWrapper}>
              <View style={styles.markertextWrapper}>
                <Text style={styles.markerText} numberOfLines={1}>{destinationName}</Text>
              </View>
              <MapPinIcon color={'green'} />
            </View>
          </Marker>
          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={4}
              strokeColor={ThemeColors.primary}
            />
          )}
        </MapView>
      </View>

      <View style={styles.bottomMainWrapper}>
        <View style={styles.availableVehiclesWrapper}>
          <Text style={styles.availableVehiclesText}>Available Vehicles</Text>
        </View>
        <FlatList
          data={carData.slice(0,10)}
          keyExtractor={(item, index) => `${item.distance}-${index}`}
          renderItem={({item}) => <VehicleListCard data={item} />}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.bookingWrapper}>
          <View style={styles.optionWrapper}>
            <View style={styles.paymentWrapper}>
              <View style={styles.logoTextWrapper}>
                <BanknotesIcon color={'green'} />
                <Text style={styles.paymentText}>Payment</Text>
              </View>
              <ChevronRightIcon
                size={scale(15)}
                color={ThemeColors.text1}
                strokeWidth={2.5}
              />
            </View>
            <View style={styles.promoWrapper}>
              <View style={styles.logoTextWrapper}>
                <WalletIcon color={ThemeColors.primary} />
                <Text style={styles.paymentText}>Promo code</Text>
              </View>
              <ChevronRightIcon
                size={scale(15)}
                color={ThemeColors.text1}
                strokeWidth={2.5}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.confirmBtn}>
            <Text style={styles.confirmText}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
  },
  bottomMainWrapper: {
    backgroundColor: ThemeColors.secondary,
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    maxHeight: '45%',
  },
  bookingWrapper: {
    backgroundColor: ThemeColors.lightGray,
    padding: scale(15),
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    marginTop: verticalScale(5),
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    backgroundColor: ThemeColors.lightGray,
  },
  paymentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'space-between',
    backgroundColor: ThemeColors.lightGray,
  },
  logoTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.lightGray,
  },
  promoWrapper: {
    flexDirection: 'row',
    flex: 0.5,
    borderLeftWidth: 1,
    borderLeftColor: 'gray',
    justifyContent: 'space-between',
    paddingLeft: scale(10),
    marginLeft: scale(10),
    backgroundColor: ThemeColors.lightGray,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginLeft: scale(7),
  },
  confirmBtn: {
    backgroundColor: ThemeColors.primary,
    borderRadius: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  confirmText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: ThemeColors.secondary,
    paddingVertical: verticalScale(10),
  },
  availableVehiclesText: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: ThemeColors.primary,
    marginVertical: verticalScale(4),
  },
  availableVehiclesWrapper: {
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: verticalScale(5),
  },
  markerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  markertextWrapper: {
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 10,
    maxWidth:scale(150)
  },
  markerText: {
    marginHorizontal: scale(8),
    marginVertical: verticalScale(2),
    fontWeight: '500',
    fontSize: scale(12),
  },
});

export default RideDetails;

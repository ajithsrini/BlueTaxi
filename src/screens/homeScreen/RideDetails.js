import React, {useEffect, useState, useRef} from 'react';
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
import {ThemeColors} from '../../constant/Colors';
import Gpay from '../../assets/images/svg/gPay.svg';
import Wallet from '../../assets/images/svg/wallet.svg';
import Promo from '../../assets/images/svg/promo.svg';
import Phonepe from '../../assets/images/svg/phonepe.svg';
import Paytm from '../../assets/images/svg/paytm.svg';
import Money from '../../assets/images/svg/money.svg';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import VehicleListCard from './components/VehicleListCard';
import {carData} from '../../constant/VehicleData';
import {MapPinIcon} from 'react-native-heroicons/solid';

import CustomModel from '../../components/CustomModel';
import PaymentModel from './components/PaymentComponent';
import PromoCodeComponent from './components/PromoCodeComponent';

const imageSource = {
  'BlueTaxi Wallet': <Wallet height={scale(22)} width={scale(22)} />,
  GPay: <Gpay height={scale(22)} width={scale(22)} />,
  Phonepe: <Phonepe height={scale(22)} width={scale(22)} />,
  Paytm: <Paytm height={scale(22)} width={scale(22)} />,
  Cash: <Money height={scale(22)} width={scale(22)} />,
};

const RideDetails = ({route}) => {
  const [routeCoords, setRouteCoords] = useState([]);
  const [cashModel, setCashModel] = useState(false);
  const [promoModel, setPromoModel] = useState(false);
  const [paymentType, setPaymentType] = useState('Cash');
  const [appliedPromo, setAppliedPromo] = useState('Promo Code');

  const {pickupLocation, dropLocation} = route.params;

  console.log('route params', pickupLocation, dropLocation);

  const mapRef = useRef(null);

  const origin = pickupLocation;
  const destination = dropLocation;
  const originName = pickupLocation.name;
  const destinationName = dropLocation.name;

  // const origin = {
  //   latitude: 11.9387014,
  //   longitude: 79.8320014,
  //   name: '30, Rue Kamatchi Amman Koil St',
  //   time: 1750067896722,
  // };

  // const destination = {
  //   latitude: 11.9457889,
  //   longitude: 79.790388,
  //   name: 'Shanmugapuram',
  //   time: 1750067901815,
  // };

  // const originName = origin.name;
  // const destinationName = destination.name;

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

  const toggleCashModel = () => {
    setCashModel(!cashModel);
  };
  const togglePromoModel = () => {
    setPromoModel(!promoModel);
  };

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
          <Marker coordinate={origin} >
            <View style={styles.markerWrapper}>
              <View style={styles.markertextWrapper}>
                <Text style={styles.markerText} numberOfLines={1}>
                  {originName}
                </Text>
              </View>
              <MapPinIcon color={'green'} />
            </View>
          </Marker>
          <Marker coordinate={destination} >
            <View style={styles.markerWrapper}>
              <View style={styles.markertextWrapper}>
                <Text style={styles.markerText} numberOfLines={1}>
                  {destinationName}
                </Text>
              </View>
              <MapPinIcon color={'red'} />
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
          data={carData.slice(0, 2)}
          keyExtractor={(item, index) => `${item.distance}-${index}`}
          renderItem={({item}) => <VehicleListCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: verticalScale(5)}}
        />
        <View style={styles.bookingWrapper}>
          <View style={styles.optionWrapper}>
            <TouchableOpacity
              style={styles.paymentWrapper}
              onPress={toggleCashModel}>
              <View style={styles.logoTextWrapper}>
                {imageSource[paymentType]}
                <Text style={styles.paymentText}>{paymentType}</Text>
              </View>
              <ChevronRightIcon
                size={scale(15)}
                color={ThemeColors.text1}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.promoWrapper}
              onPress={togglePromoModel}>
              <View style={styles.logoTextWrapper}>
                {/* <WalletIcon color={ThemeColors.primary} /> */}
                <Promo height={scale(22)} width={scale(22)} />
                <View style={{flex: 1}}>
                  <Text style={styles.paymentText} numberOfLines={1}>
                    {appliedPromo}
                  </Text>
                  {appliedPromo !== 'Promo Code' ? (
                    <Text style={styles.codeApplied} numberOfLines={1}>
                      Code applied
                    </Text>
                  ) : null}
                </View>
              </View>
              <ChevronRightIcon
                size={scale(15)}
                color={ThemeColors.text1}
                strokeWidth={2.5}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.confirmBtn}>
            <Text style={styles.confirmText}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomModel modelVisible={cashModel} setModelVisible={setCashModel}>
        <PaymentModel
          toggleCashModel={toggleCashModel}
          setPaymentMethod={setPaymentType}
          paymentMethod={paymentType}
        />
      </CustomModel>
      <CustomModel
        modelVisible={promoModel}
        setModelVisible={setPromoModel}
        justifyContent="flex-end"
        hasBackdrop={true}>
        <PromoCodeComponent
          togglePromoModel={togglePromoModel}
          appliedPromo={appliedPromo}
          setAppliedPromo={text => setAppliedPromo(text)}
        />
      </CustomModel>
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
    maxHeight: '50%',
  },
  bookingWrapper: {
    backgroundColor: ThemeColors.lightGray,
    padding: scale(15),
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    // marginTop: verticalScale(5),
    borderRadius: scale(20),
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
    flex: 1,
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
    color:ThemeColors.text1,
    width: '75%',
  },
  codeApplied: {
    fontSize: moderateScale(11),
    fontWeight: '400',
    marginLeft: scale(7),
    width: '75%',
    color:"gray"
  },
  confirmBtn: {
    backgroundColor: ThemeColors.primary,
    borderRadius: scale(10),
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
    // marginBottom: verticalScale(5),
  },
  markerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  markertextWrapper: {
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 10,
    maxWidth: scale(120),
  },
  markerText: {
    marginHorizontal: scale(8),
    marginVertical: verticalScale(2),
    fontWeight: '500',
    fontSize: scale(12),
  },
});

export default RideDetails;

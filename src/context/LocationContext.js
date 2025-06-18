import {createContext, useState} from 'react';

export const LocationContext = createContext();

const LocationProvider = ({children}) => {
  const [pickupCon, setPickupCon] = useState();
  const [pickupEdited, setPickupEdited] = useState(false);
  const [pickupSelectedFromList, setPickupSelectedFromList] = useState(false);

  return (
    <LocationContext.Provider
      value={{
        pickupCon,
        setPickupCon,
        pickupEdited,
        setPickupEdited,
        pickupSelectedFromList,
        setPickupSelectedFromList,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;

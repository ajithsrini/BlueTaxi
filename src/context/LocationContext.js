import { createContext, useState } from "react";

export const LocationContext = createContext()

const LocationProvider = ({children}) => {
    const [pickupCon,setPickupCon] = useState()
    const [dropCon,setDropCon] = useState()
    return (
        <LocationContext.Provider value={{pickupCon,dropCon,setPickupCon,setDropCon}}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationProvider
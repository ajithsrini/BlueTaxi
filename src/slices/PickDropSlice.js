import { createSlice } from "@reduxjs/toolkit";

const initialState={
    pickupName : "",
    dropName :"",
    origin :null,
    destination:null
}

const PickDropSlice = createSlice({
    name:"PickDrop",
    initialState,
    reducers:{
        setPickupName:(state,action)=>{
            state.pickupName = action.payload
        },
        setDropName:(state,action)=>{
            state.dropName = action.payload
        },
        setOrigin:(state,action)=>{
            state.origin = action.payload
        },
        setDestination:(state,action)=>{
            state.destination = action.payload
        },
        resetNames:(state)=>{
            state.pickupName = ""
            state.dropName = ""
        },
        resetCoordinates:(state)=>{
            state.origin = null
            state.destination = null
        }
    }
})

export const  {setPickupName,setDropName,setOrigin,setDestination,resetNames,resetCoordinates} = PickDropSlice.actions
export default PickDropSlice.reducer
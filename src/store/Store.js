import { configureStore } from "@reduxjs/toolkit";
import PickDropReducer from "../slices/PickDropSlice"

const Store = configureStore({
    reducer: {
        PickDrop : PickDropReducer
    },
});

export default Store
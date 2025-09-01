import { configureStore } from "@reduxjs/toolkit";
import mySlice from "../store/slice";

export default configureStore
({
    reducer: 
    {
        reduceSaver: mySlice
    }
})
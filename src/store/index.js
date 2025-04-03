import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice"; 
import userReducer from "./userSlice"
import walletReducer from "./walletSlice"

const store = configureStore({
  reducer: {
    user: userReducer ,
    transaction: transactionReducer, 
    wallet: walletReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductReducer from "./adminSlice/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
  },
});

export default store;

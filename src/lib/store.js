import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/lib/slices/userSlice";
import cartSlice from "@/lib/slices/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      cart: cartSlice,
    },
  });
};

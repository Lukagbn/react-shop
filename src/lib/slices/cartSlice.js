import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartProducts: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartProducts.find(
        (product) => product.id === action.payload.id,
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.cartProducts.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    deleteFromCart: (state, action) => {},
  },
});
export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;

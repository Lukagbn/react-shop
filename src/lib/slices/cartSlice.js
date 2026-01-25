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
        if (item.quantity < 10) {
          item.quantity += 1;
        }
      } else {
        state.cartProducts.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    deleteFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload,
      );
    },
    decreaseQuantity: (state, action) => {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id,
      );
      if (state.cartProducts[index].quantity < 2) {
        state.cartProducts[index].quantity = 1;
      } else {
        state.cartProducts[index].quantity -= 1;
      }
    },
  },
});
export const { addToCart, deleteFromCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;

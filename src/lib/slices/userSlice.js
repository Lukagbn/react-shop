import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: null,
  surname: null,
  age: null,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.username;
      state.surname = action.payload.name.lastname;
      state.age = action.payload.id;
      state.isLoggedIn = true;
    },
    deleteUser: (state, action) => {},
  },
});
export const { updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

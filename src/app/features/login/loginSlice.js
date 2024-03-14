import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    email: "",
    password: "",
    isLogged: localStorage.getItem("isLogged")
      ? JSON.parse(localStorage.getItem("isLogged"))
      : false,
  },
  reducers: {
    handleLogin(state, { payload: { key, value } }) {
      state[key] = value;
    },
    setLogged(state) {
      state.isLogged = !state.isLogged;
    },
  },
});
export const { handleLogin, setLogged } = loginSlice.actions;
export default loginSlice.reducer;
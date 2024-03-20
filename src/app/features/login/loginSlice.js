import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    handleLogin(state, { payload: { key, value } }) {
      state[key] = value;
    },
  },
});
export const { handleLogin, setLogged } = loginSlice.actions;
export default loginSlice.reducer;

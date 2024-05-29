import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: JSON.parse(localStorage.getItem('token')) || null,
  userInfos: JSON.parse(localStorage.getItem('userInfos')) || null,
  role: JSON.parse(localStorage.getItem('role')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userInfos = action.payload.userInfos;
      state.role = action.payload.role;

      // set values localstorage
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('userInfos', JSON.stringify(action.payload.userInfos));
      localStorage.setItem('role', JSON.stringify(action.payload.role));
    },
    logout: (state) => {
      state.token = null;
      state.userInfos = null;
      state.role = null;

      localStorage.clear()
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
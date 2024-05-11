import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  userName: string;
  email: string;
  password: string;
  department: string;
  post?: string;
}

export type IUserSlice = {
  isAuth: boolean;
  userInfo: IUser;
};

const initialState: IUserSlice = {
  isAuth: false,
  userInfo: {} as IUser,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuth = true;
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.isAuth = false;
      state.userInfo = {} as IUser;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

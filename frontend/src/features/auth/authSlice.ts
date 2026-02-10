import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Your full User type
export interface User {
  _id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  tagLine: string;
  consultantStatus: string;
  createdAt: string;
  lastOnline: string;
  level: string;
  type: string;
  price: number;
  fcmToken: string;
  balance: {
    minute: number;
    amount: number;
  };
  favorites: string[];
  history: string[];
  __v: number;
  qualification?: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

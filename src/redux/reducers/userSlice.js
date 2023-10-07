import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid'

const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      const { name, email, password } = action.payload;
      const user = {
        id: nanoid(),
        name,
        email,
        password,
        islogged: false,
      };
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          islogged: false,
        })
      );
      state.users.push(user);
    },
    loginUser: (state, action) => {
      const userId = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.islogged = true;
      }
    },
    logoutUser: (state, action) => {
      const userId = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.islogged = false;
      }
    },
  },
});

export const { addUsers, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

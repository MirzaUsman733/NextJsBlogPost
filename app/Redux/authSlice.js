// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: {
//       // Initialize with default user properties
//       uid: null,
//       displayName: null,
//       email: null,
//       // Add other necessary user data properties
//     },
//   },
//   reducers: {
//     setUser: (state, action) => {
//       // Update the user data
//       state.user = action.payload;
//     },
//   },
// });
// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: {
//       uid: null,
//       displayName: null,
//       email: null,
//     },
//   },
//   reducers: {
//     setUser: (state, action) => {
//       const { uid, displayName, email } = action.payload;
//       state.user.uid = uid;
//       state.user.displayName = displayName;
//       state.user.email = email;
//     },
//   },
// });

// // Rest of your code...

// export const { setUser } = authSlice.actions;
// // export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      uid: null,
      displayName: null,
      email: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      const { uid, displayName, email } = action.payload;
      state.user.uid = uid;
      state.user.displayName = displayName;
      state.user.email = email;
    },
  },
});

export const setUser = (user) => (dispatch) => {
  if (user) {
    dispatch({
      type: 'auth/setUser',
      payload: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      },
    });
  }
};

export default authSlice.reducer;

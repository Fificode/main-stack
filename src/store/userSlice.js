import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  user: null, // Initial state
  loading: false,
  error: null
};


export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    const response = await fetch("https://fe-task-api.mainstack.io/user");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });}
});


export default userSlice.reducer;

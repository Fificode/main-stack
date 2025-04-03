import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  wallet: null, // Initial state
  loading: false,
  error: null
};

export const fetchWallet = createAsyncThunk("user/fetchWallet", async () => {
    const response = await fetch("https://fe-task-api.mainstack.io/wallet");
    if (!response.ok) {
      throw new Error("Failed to fetch wallet data");
    }
    return response.json();
  });
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
  
  },
   extraReducers: (builder) => {
      builder
        .addCase(fetchWallet.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchWallet.fulfilled, (state, action) => {
          state.loading = false;
          state.wallet = action.payload;
        })
        .addCase(fetchWallet.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });}
});


export default walletSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  transactions: [], // Initial state
  loading: false,
  error: null
};

export const fetchTransactions = createAsyncThunk("user/fetchTransactions", async () => {
  const response = await fetch("https://fe-task-api.mainstack.io/transactions");
  if (!response.ok) {
    throw new Error("Failed to fetch transaction data");
  }
  return response.json();
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default transactionSlice.reducer;

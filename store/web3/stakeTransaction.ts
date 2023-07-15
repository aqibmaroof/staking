import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  txInProgress: false,
};

export const stakeTransactionSlice = createSlice({
  name: "stakeTransaction",
  initialState,
  reducers: {
    stakeTransactionCredential: (state: any, action: PayloadAction<any>) => {
      state.txInProgress = action?.payload.txInProgress;
    },
  },
});

export const { stakeTransactionCredential } = stakeTransactionSlice.actions;

export const stakeTransactionReducer = stakeTransactionSlice.reducer;

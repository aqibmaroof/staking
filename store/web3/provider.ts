import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  provider: {},
  address: "",
  signatureRequest: false,
};

export const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider: (state: any, action: PayloadAction<any>) => {
      state.address = action?.payload?.address;
      state.provider = action.payload.provider;
    },

    initiateSignRequest: (state: any, action: PayloadAction<boolean>) => {
      state.signatureRequest = action.payload;
    },
  },
});

export const { setProvider, initiateSignRequest } = providerSlice.actions;

export default providerSlice.reducer;

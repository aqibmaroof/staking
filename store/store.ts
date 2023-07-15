import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";

import providerReducer from './web3/provider'
import { stakeTransactionReducer } from './web3/stakeTransaction'
import connectedUserInfo from './web3/connectedUserInfo'
import selectedNetworkReducer from './web3/selectedNetwork'
import walletReducer from './web3/walletSlice'
import mainTabReducer from './mainTab/mainTab'

const reducers = combineReducers({
  user: connectedUserInfo,
  providerReducer,
  stakeTransactionReducer,
  network:selectedNetworkReducer,
  wallet: walletReducer,
  mainTabReducer
})
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','network','wallet'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer ,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: {
          // Ignore these action types
          ignoredActions: [
              FLUSH,
              REHYDRATE,
              PAUSE,
              PERSIST,
              PURGE,
              REGISTER,
              'nftSliceCreate/updateMedia',
              'collectionSliceCreate/updateFile',
              'nftSliceList/getAll/rejected',
              'nftSliceList/getAllNFTsByCategory/rejected',
              'nftSliceList/getAllNFTsByUser/rejected',
              'nftDetailSlice/getDetails/rejected',
              'bidSliceList/getAll/rejected',
              'bidSliceList/fetchMore/rejected',
              'tradingHistorySliceList/getAll/rejected',
              'searchSlice/searchByKeyword/rejected',
              'nftSliceList/getNFTFilterByCollection/rejected',
              'nftSliceList/getAllNFTsByUserIncollection/rejected',
          ],
          // Ignore these field paths in all actions
          // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
          // Ignore these paths in the state
          ignoredPaths: [
              'nftCreate.media.mainFile',
              'nftCreate.media.thumbnailFile',
              'collectionCreate.bannerFile',
              'collectionCreate.iconFile',
              'nftList.errorMessage',
              'nftDetail.errorMessage',
              'bidList.errorMessage',
              'tradingHistoryList.errorMessage',
              'search.errorMessage',
          ],
      },
  }),
  devTools: process.env.NODE_ENV !== 'production',
})


export type AppDispatch = typeof store.dispatch

export default store;

import type { AppProps } from "next/app";
import Head from "next/head";
import "../src/Styles/Global.scss";
import { ToastContainer } from "react-toastify";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import store from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Web3Provider } from "@ethersproject/providers";
import CommonProvider from "../Components/layout/common-provider";
import "react-toastify/dist/ReactToastify.css";

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  return library;
};
let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Head>
            <title>
              XANA is an EVM-based blockchain infrastructure and DApps platform
              for the Metaverse. Bridged with all major blockchains, compatible
              with all popular wallets, and already adopted by the major
              institutions and global brands.
            </title>
            <link
              rel="shortcut icon"
              href="https://ik.imagekit.io/qjxemaiij5/Xanalia/fav_UqmeQsRty"
              sizes="32x32"
            />
          </Head>
          <CommonProvider />
          <Component {...pageProps} />
          <ToastContainer />
        </Web3ReactProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

import { SupportedWallets } from "./constants/wallet";
import { SupportedChainId } from "./constants/chain";
// import metamask from './metamask'
// import binance from './binance'
// import walletconnect from './wallet-connect'
// import magiclink from './magic-link'

// export function getProxy(type?: SupportedWallets) {
//   if (typeof window === "undefined") return undefined;

//   if (type === SupportedWallets.ethereum) return metamask.getProxy();
//   if (type === SupportedWallets.binance) return binance.getProxy();
//   if (type === SupportedWallets.walletconnect) return walletconnect.getProxy();
//   if (type === SupportedWallets.magiclink) return magiclink.getProxyProvider();

//   return undefined;
// }

export function getWalletType(): SupportedWallets | undefined {
  if (typeof window === "undefined") return undefined;

  const { walletType } = window as any;

  if (!walletType) {
    let key = localStorage.getItem("walletType") as
      | SupportedWallets
      | undefined;
    key = key === null ? undefined : key;
    setWalletType(key);
    return key;
  }

  return walletType;
}

export function setWalletType(type?: SupportedWallets) {
  if (typeof window === "undefined") return;
  (window as any).walletType = type;

  if (!type) {
    localStorage.removeItem("walletType");
  } else {
    localStorage.setItem("walletType", type);
  }
}

export function getChainId(): SupportedChainId | undefined {
  if (typeof window === "undefined") return undefined;

  const { chainId } = window as any;

  if (!chainId) {
    const key = localStorage.getItem("chainId");
    const result =
      key === null ? undefined : (Number(key) as SupportedChainId | undefined);
    setChainId(result);
    return result;
  }

  return chainId;
}

export function setChainId(type?: SupportedChainId) {
  if (typeof window === "undefined") return;
  (window as any).chainId = type;
  localStorage.setItem("chainId", String(type) || "");
}

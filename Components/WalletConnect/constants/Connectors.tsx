import { useCallback } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useSelector } from "react-redux";
import {
  dataSwitchChainTestnet,
  dataSwitchChainMainnet,
} from "../../Configs/config";

function useConnector() {
  const chain = useSelector(
    (state: any) => state.wallet.chainId
  );
  const dataSwitchChain =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === "testnet"
    ? dataSwitchChainTestnet
    : dataSwitchChainMainnet;

  let connectorType = useCallback((type: string) => {
    const supportedChains = []
    const rpcObjs = {}
    for(let i=0;i< dataSwitchChain.length;i++){
      supportedChains.push(Number(dataSwitchChain[i].chainID))
      rpcObjs[Number(dataSwitchChain[i].chainID)] = dataSwitchChain[i].rpc 
    }
    
    if (type === "walletconnect") {
      return new WalletConnectConnector({
        rpc: {
          ...rpcObjs
        },
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
        supportedChainIds: [...supportedChains],
      });
    } else if (type === "inject") {
      return new InjectedConnector({
        supportedChainIds: [...supportedChains],
      });
    }
  }, []);

  return { connectorType };
}

export default useConnector;

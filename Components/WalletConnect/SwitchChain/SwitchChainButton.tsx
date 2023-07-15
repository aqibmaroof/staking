import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChainID as RDSetChainID,
  setModalNetwork
} from "../../../store/web3/walletSlice";
import { getChainId, setChainId } from "../wallet";
import SwitchChainModal from "./SwitchChainModal";
import {
  dataSwitchChainTestnet,
  dataSwitchChainMainnet,
} from "../../Configs/config";

const MultiWallet = () => {
  const dispatch = useDispatch();
  const dataSwitchChain =
    process.env.NEXT_PUBLIC_NETWORK_TYPE === "testnet"
      ? dataSwitchChainTestnet
      : dataSwitchChainMainnet;
      
  const { isModalNetwork, chainId } = useSelector(
    (state: any) => state.wallet
  );

  const onClickButton = () => {
    dispatch(setModalNetwork(true));
  };

  const getLogoChain = (chainId: any) => {
    let result = undefined;
    if (chainId) {
      for (let i = 0; i < dataSwitchChain.length; i++) {
        if (dataSwitchChain[i].key === Number(chainId)) {
          result = dataSwitchChain[i].logo;
          break;
        }
      }
    }
    return result;
  };

  useEffect(() => {
    if (chainId !== undefined) {
      setChainId(chainId);
    } else {
      let chain = getChainId();
      chain = chain
        ? Number(chain)
        : Number(process.env.NEXT_PUBLIC_CHAINID_XANA);
      dispatch(RDSetChainID(chain));
    }
  }, [chainId]);

  return (
    <>
      <img
        onClick={onClickButton}
        src={getLogoChain(chainId) || dataSwitchChain[0].logo}
        alt="Eth icon"
      />
      <SwitchChainModal />
    </>
  );
};
export default MultiWallet;

import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Modal } from "react-bootstrap";
import style from "./switchChain.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  setChainErrorMsg,
} from "../../../store/web3/selectedNetwork";
import {
  setChainID,
  setModalNetwork,
  setAddress
} from "../../../store/web3/walletSlice";

import {
  numberToHexadecimal,
  getSampleChain,
  SupportedChainId,
} from "../constants/chain";

import {
  setConnectedUser,
  walletCredentials,
} from "../../../store/web3/connectedUserInfo";
import { setProvider } from "../../../store/web3/provider";
import {
  dataSwitchChainTestnet,
  dataSwitchChainMainnet,
} from "../../Configs/config";

const MultiWallet = () => {
  const [clientOnly, setClientOnly] = useState(false);
  const dataSwitchChain =
    process.env.NEXT_PUBLIC_NETWORK_TYPE === "testnet"
      ? dataSwitchChainTestnet
      : dataSwitchChainMainnet;
  const dispatch = useDispatch();

  const { deactivate } = useWeb3React();

  const { userConnected } = useSelector(
    (state: any) => state.user
  );

  const { provider } = useSelector((state: any) => state.providerReducer);

  const { errorMessage } = useSelector(
    (state: any) => state.network
  );
  
  const { isModalNetwork, chainId } = useSelector(
    (state: any) => state.wallet
  );

  const switchNetwork = async (chainKey: any) => {
    if (chainKey !== chainId) {
      if (userConnected) {
        try {
          await provider?.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: numberToHexadecimal(chainKey),
              },
            ],
          });
          dispatch(setChainID(chainKey));
          dispatch(setModalNetwork(false));
          dispatch(setChainErrorMsg(""));
        } catch (switchError) {
          if (
            switchError.code === 4902 ||
            String(switchError).includes("wallet_addEthereumChain")
          ) {
            try {
              await provider?.request({
                method: "wallet_addEthereumChain",
                params: [getSampleChain(chainKey)],
              });
              switchNetwork(chainKey);
              dispatch(setChainErrorMsg(""));
            } catch (err) {
              if (err.code === 4001) {
              }
            }
          } else if (
            String(switchError).includes("request is not a function")
          ) {
            deactivate();
            localStorage.removeItem("walletconnect");
            dispatch(
              walletCredentials({
                userConnected: false,
                connectedWallet: "",
              })
            );
            dispatch(setAddress(undefined))
            dispatch(setConnectedUser(undefined));
            dispatch(
              setProvider({
                provider: {},
                address: "",
              })
            );
            localStorage.removeItem("token");
            localStorage.removeItem("refreshtoken");
            localStorage.clear();

            dispatch(setChainID(chainKey));
            dispatch(setModalNetwork(false));
            dispatch(setChainErrorMsg(""));
          }
        }
      } else {
        dispatch(setChainID(chainKey));
        dispatch(setModalNetwork(false));
        dispatch(setChainErrorMsg(""));
      }
    }
  };

  const hideChainModal = () => {
    if (!isActiveChain(chainId)) {
      return;
    }
    dispatch(setChainErrorMsg(""));
    dispatch(setModalNetwork(false));
  };

  function isActiveChain(chainId?: SupportedChainId | number | string) {
    for (let i = 0; i < dataSwitchChain.length; i++) {
      if (dataSwitchChain[i].key === Number(chainId)) return true;
    }

    return false;
  }

  useEffect(() => setClientOnly(true), []);

  return (
    <>
      <Modal
        show={clientOnly && (isModalNetwork || !isActiveChain(chainId))}
        classBody={style["switchNetwork"]}
        dialogClassName={style["switchNetwork_dialog"]}
        onHide={hideChainModal}
      >
        <Modal.Header
          className={`p-0 border-0 ${style["switchNetwork_header"]}`}
        >
          <h4>Switch Network</h4>
          <span onClick={hideChainModal}>
            <img src="https://ik.imagekit.io/qjxemaiij5/close-ico.svg" alt="close" />
          </span>
        </Modal.Header>
        <Modal.Body>
          <span className={`${style["switchNetwork_error"]}`}>
            {errorMessage}
          </span>
          <div className={style["switchNetwork_box-wrp"]}>
            <div className={style["switchNetwork_box"]}>
              {dataSwitchChain.map((chain, i) => (
                <div className={style["switchNetwork_items"]} key={i}>
                  <div
                    className={`
                            ${style["switchNetwork_ico"]} 
                            ${chain.key === Number(focus || 0) ? "focus" : ""}
                            ${
                              chain.key === Number(chainId || 0) ? "active" : ""
                            }
                          `}
                    key={i}
                    onClick={() => switchNetwork(chain.key)}
                  >
                    <img src={chain.logo} alt="Eth icon" />

                    <p className="heading--5">{chain.title}</p>
                    <span className={style["checked"]}>
                      <img
                        src="https://ik.imagekit.io/xanalia/xana/checked-ico.svg"
                        alt="checked"
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default MultiWallet;

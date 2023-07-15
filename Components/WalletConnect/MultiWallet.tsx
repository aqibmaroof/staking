import { useState, useEffect } from "react";
import useConnector from "./constants/Connectors";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { Button } from "react-bootstrap";

import WalletModal from "./WalletModal";
import { useDispatch, useSelector } from "react-redux";
import { setProvider, initiateSignRequest } from "../../store/web3/provider";
import DisConnect from "./DisConnect";
import Web3 from "web3";
import axios from "axios";
import {
  setConnectedUser,
  setConnectedUserXana,
  walletCredentials,
} from "../../store/web3/connectedUserInfo";
import { setChainErrorMsg } from "../../store/web3/selectedNetwork";
import {
  setChainID,
  setModalNetwork,
  setAddress,
} from "../../store/web3/walletSlice";

import { setAccessToken, setRefreshToken } from "../../services/sendRequest";
import SwitchChainBtn from "./SwitchChain/SwitchChainButton";
import { SupportedWallets, signMessageToken } from "./constants/wallet";

import {
  numberToHexadecimal,
  getSampleChain,
  SupportedChainId,
} from "./constants/chain";
import { setWalletType } from "./wallet";
import ToastShow from "../../Utils/toastShow";

import { setUser } from "../../store/web3/storage";
import { ethers } from "ethers";

declare var window: any;
let previousAccountDetect = new Date()

const MultiWallet = () => {
  const dispatch = useDispatch();

  const { connectedWallet, userConnected } = useSelector(
    (state: any) => state.user
  );

  const {
    address: addresses,
    signatureRequest,
    provider,
  } = useSelector((state: any) => state.providerReducer);

  const { chainId: RdChainId } = useSelector((state: any) => state.wallet);
  const { address: connectedAddress } = useSelector(
    (state: any) => state.wallet
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [chainChanged] = useState(false);
  const [walletName, setWalletName] = useState("");

  const { connectorType } = useConnector();

  const { activate, library, account, deactivate, chainId } = useWeb3React();

  const switchChain = async () => {
    try {
      await provider?.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: numberToHexadecimal(RdChainId),
          },
        ],
      });
    } catch (switchError) {
      if (
        switchError.code === 4902 ||
        String(switchError).includes("wallet_addEthereumChain")
      ) {
        try {
          await provider?.request({
            method: "wallet_addEthereumChain",
            params: [getSampleChain(RdChainId)],
          });
          switchChain();
        } catch (err) {
          if (
            err.code === 4001 ||
            String(err).includes("User rejected the request")
          ) {
            dispatch(setChainID(chainId));
          }
        }
      } else if (
        switchError.code === 4001 ||
        String(switchError).includes("User rejected the request")
      ) {
        dispatch(setChainID(chainId));
      }
    }
  };
  useEffect(() => {
    if (userConnected && chainId && RdChainId && RdChainId !== chainId) {
      switchChain();
    }
  }, [userConnected]);

  if (provider && Object.keys(provider).length > 0 && userConnected) {
    provider?.on("chainChanged", (data: string) => {
      dispatch(setChainID(parseInt(data)));
    });

    provider?.on("accountsChanged", (data) => {
      if (userConnected && data && data.length === 0) {
        dispatch(
          walletCredentials({
            userConnected: false,
            connectedWallet: "",
          })
        );
        dispatch(setAddress(undefined));
        dispatch(setConnectedUser(undefined));
        dispatch(
          setProvider({
            provider: {},
            address: "",
          })
        );
      }
    });
  }

  useEffect(() => {
    if (typeof library !== "undefined") {
      if (library?.provider?.signer?.connection.wc) {
        dispatch(
          setProvider({
            provider: library.provider,
            address: account,
          })
        );
        handleClose();
      } else {
        dispatch(
          setProvider({
            provider: library.provider,
            address: account,
          })
        );
        handleClose();
      }
    }
  }, [library]);

  useEffect(() => {
    if (
      account &&
      userConnected &&
      account.toLowerCase() !== connectedAddress.toLowerCase() &&
      previousAccountDetect.getSeconds() !== new Date().getSeconds()
    ) {
      previousAccountDetect = new Date()
      getAuthToken(account, connectedWallet);
    }
  }, [account]);

  useEffect(() => {
    if (addresses && !userConnected && walletName) {
      getAuthToken(addresses, walletName);
    }
  }, [addresses, userConnected]);

  useEffect(() => {
    if (userConnected && connectedWallet) {
      connectToWallet(connectedWallet);
    }
  }, [userConnected, connectedWallet]);

  useEffect(() => {
    if (chainChanged || walletName) {
      connectToWallet(walletName);
    }
  }, [chainChanged, walletName]);

  const connectToWallet = async (title: any) => {
    const { ethereum } = window;
    setWalletType(title);
    let obj: any;
    if (title === SupportedWallets.ethereum) {
      obj = connectorType("inject");
    } else if (title === SupportedWallets.walletconnect) {
      obj = connectorType(SupportedWallets.walletconnect);
    }
    if (obj) {
      activate(obj, async (error) => {
        try {
          if (
            error instanceof UnsupportedChainIdError ||
            String(error).includes("UnsupportedChainIdError")
          ) {
            if (userConnected) {
              dispatch(setModalNetwork(true));
              dispatch(
                setChainErrorMsg("Please select the below networks to proceed")
              );
            } else {
              ToastShow(
                "error",
                "Please check whether you have selected the same Network chain in the Wallet"
              );
              deactivate();
              dispatch(
                walletCredentials({
                  userConnected: false,
                  connectedWallet: "",
                })
              );
              dispatch(setAddress(undefined));
              dispatch(setProvider({ provider: {}, address: "" }));
              localStorage.clear();
            }
          } else {
            if (userConnected) {
              ToastShow("error", `Disconnected`);
            }
            deactivate();
            dispatch(
              walletCredentials({
                userConnected: false,
                connectedWallet: "",
              })
            );
            dispatch(setAddress(undefined));
            dispatch(setProvider({ provider: {}, address: "" }));
          }
          setModalOpen(false);
          setWalletName("");
          return false;
        } catch (err) {
          const { ethereum } = window;
          let availableProvider: any;
          if (library !== undefined && library?.provider)
            availableProvider = library?.provider;
          else if (ethereum) availableProvider = ethereum;
          await availableProvider.request({
            method: "wallet_addEthereumChain",
            params: [getSampleChain(process.env.NEXT_PUBLIC_CHAINID_XANA)],
          });
        }
      });
    }
  };

  const handelModal = () => {
    if (signatureRequest === true)
      return ToastShow("info", `Please Approve The Signature Request !`);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleWalletName = (name: any) => {
    setWalletName("");
    setWalletName(name);
  };

  const getAuthToken = async (address, walletType = "") => {
    dispatch(initiateSignRequest(true));
    let nonce, resNonce
    let web3: any, signature: any, xanaSignature: any;
    if (!account) return;
    try {
      resNonce = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_XANA}/auth/save-user-nonce`,
        {
          walletAddress: address,
          nonce: signMessageToken
        }
      );
      if (walletType === SupportedWallets.ethereum) {
        web3 = new Web3(library.provider);
        signature = await web3?.eth?.personal?.sign(signMessageToken, address);

      } else {
        if (library.provider.signer) {
          signature =
            await library.provider.signer.connection?.wc.signPersonalMessage([
              signMessageToken,
              address,
            ]);
        } else {
          signature = await library.provider.wc.signPersonalMessage([
            signMessageToken,
            address,
          ]);
        }
      }
      const email = null;
      const { data: verification } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login-external-wallet`,
        {
          address,
          signature,
          email,
        }
      );

      const verificationXana = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT_XANA}/auth/v3/verify-signature`,
          {
            nonce,
            signature,
            walletAddress: address
          }
        );

      // localStorage.setItem("token",JSON.stringify(verification.access_token))
      // localStorage.setItem("refreshtoken",JSON.stringify(verification.refresh_token))
      dispatch(setConnectedUser(verification.user));
      localStorage.setItem("userToken",verificationXana.data.data.token)
      dispatch(setConnectedUserXana(verificationXana.data.data.user));
      setRefreshToken(verification.refresh_token);
      setAccessToken(verification.access_token);
      setUser(verification.user);

      dispatch(initiateSignRequest(false));

      dispatch(
        setProvider({
          provider: library.provider,
          address: address,
        })
      );
      dispatch(
        walletCredentials({
          userConnected: true,
          connectedWallet: walletType,
        })
      );
      dispatch(setAddress(address));
    } catch (err) {
      localStorage.removeItem("walletconnect");
      dispatch(setProvider({ provider: {}, address: "" }));
      dispatch(setConnectedUser(undefined));
      dispatch(setConnectedUserXana({}));
      dispatch(initiateSignRequest(false));

      dispatch(
        walletCredentials({
          userConnected: false,
          connectedWallet: "",
        })
      );
      dispatch(setAddress(undefined));
      setWalletType();
      setWalletName("");
      deactivate();
    }
  };

  return (
    <>
      <SwitchChainBtn />
      <Button>
        {userConnected ? (
          <DisConnect setWalletName={setWalletName} />
        ) : (
          <span
            onClick={handelModal}
            className="wallet"
            id="walletConnectModal"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="21"
                height="21"
                rx="1"
                stroke="#fff"
                strokeWidth="2"
              />
              <rect
                x="12"
                y="6"
                width="11"
                height="11"
                rx="1"
                stroke="#fff"
                strokeWidth="2"
              />
              <circle cx="17" cy="11.5" r="1.5" fill="#fff" />
            </svg>
          </span>
        )}
      </Button>

      <WalletModal
        modalOpen={modalOpen}
        setWalletName={handleWalletName}
        handleClose={handleClose}
      ></WalletModal>
    </>
  );
};
export default MultiWallet;

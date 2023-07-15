import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setProvider } from "../../store/web3/provider";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import {
  setConnectedUser,
  setConnectedUserXana,
  walletCredentials,
} from "../../store/web3/connectedUserInfo";
import {setAddress} from '../../store/web3/walletSlice'
import { getSampleChain } from "./constants/chain";
// import "./DisConnect.module.scss";

const DisConnect = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [copyMsg, setCopyMsg] = useState("Copy address");

  const addresses = useSelector((state: any) => state.providerReducer.address);

  const dataUser = useSelector(
    (state: any) => state.user.dataUser
  );
  const { chainId } = useSelector((state: any) => state.wallet);

  const usernameAdrress = dataUser?.userWallet?.address;
  const userSplit = usernameAdrress?.slice(0, 4);
  const userName = usernameAdrress?.slice(
    usernameAdrress.length - 4,
    usernameAdrress.length
  );
  const userAddress = userSplit?.concat("...", userName);

  const usersetname = dataUser?.userName;

  const { deactivate } = useWeb3React();
  const disconnectWallet = () => {
    props.setWalletName("")
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
    dispatch(setConnectedUserXana({}));
    dispatch(
      setProvider({
        provider: {},
        address: "",
      })
    );
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.clear();
  };
  const handleModal = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setCopyMsg("Copy address");
  };

  // Copy to clipboard Functionality
  const copyHandler = () => {
    const copyText = addresses;
    navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      setCopyMsg("Copy address");
    }, 3000);
    setCopyMsg("Copied");
  };

  return (
    <>
      <span className="wallet-adr" onClick={handleModal}>
        {usersetname && usersetname.length > 0 ? usersetname : userAddress}
        {/* {getUserName && getUserName.length > 0 ? getUserName : userAddress} */}
      </span>

      <Modal show={modalOpen} onHide={handleClose} className="disconnect-modal">
        <Modal.Header>
          <p className="title">Your wallet</p>
          <span className="modalClosebtn" onClick={() => handleClose()}></span>
        </Modal.Header>
        <Modal.Body>
          <div className="adr-wrp">
            <p className="adr-text">
              {addresses?.slice(0, 4)}
              &nbsp; . . . &nbsp;
              {addresses?.slice(addresses.length - 4, addresses.length)}
            </p>
            <div className="adr-copy-wrp" onClick={() => copyHandler()}>
              <p className="adr-copy">{copyMsg}</p>
              <span className="copy-icon">
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.46786 1.5C5.86241 0.3 6.61865 0 6.94745 0H15.8248L21.25 4.5V16.5C21.25 18.5 20.2636 19 19.7704 19H6.94745C5.7639 19 5.46791 18 5.46786 17.5C5.30346 12.6667 5.0733 2.7 5.46786 1.5Z"
                    fill="#E800A5"
                  />
                  <path
                    d="M16 4V1.5L19.5 4.5H16.5C16.1 4.5 16 4.16667 16 4Z"
                    fill="white"
                  />
                  <path
                    d="M3.5 5H2C1.66667 5 1 5.3 1 6.5C1 7.7 1 15.6667 1 19.5C1 19.8333 1.2 20.5 2 20.5C2.8 20.5 9 20.5 12 20.5C12.3333 20.5 13 20.3 13 19.5V17.5"
                    stroke="#E800A5"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="bsc-scan">
            <Link href={`${getSampleChain(chainId)?.blockExplorerUrls[0]}/address/${addresses}`}>
              <a className="bsc-scan-text" target={"_blank"}>
                View on Explorer
              </a>
            </Link>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="2" width="20" height="20" fill="#E800A5" />
              <path
                d="M16.1398 5.62092C16.1806 5.76815 16.2416 5.92288 16.2631 6.06897C16.6867 8.91781 17.1103 11.7667 17.5211 14.6147C17.5426 14.7608 17.5349 14.9241 17.4749 15.0338C17.3294 15.2958 16.9677 15.2773 16.6858 15.0244C15.9852 14.3877 15.2864 13.7415 14.5885 13.1018C14.28 12.819 14.1005 12.8082 13.868 13.0619C12.2019 14.8794 10.5358 16.6969 8.86968 18.5144C8.82043 18.5681 8.77119 18.6218 8.70725 18.662C8.51271 18.7858 8.25901 18.7454 8.05332 18.5569C6.61346 17.237 5.17361 15.917 3.73743 14.6005C3.50235 14.385 3.45463 14.0831 3.63245 13.8891C4.01453 13.465 4.40027 13.0442 4.78602 12.6234C6.08825 11.2028 7.39049 9.78224 8.69546 8.3587C8.94715 8.08413 8.91723 7.90292 8.57931 7.59315C7.90713 6.97696 7.23402 6.35442 6.55911 5.74122C6.35341 5.55266 6.24104 5.35079 6.30156 5.11517C6.36207 4.87955 6.54856 4.80885 6.80492 4.82416C9.73378 4.99909 12.6626 5.17401 15.5924 5.35529C15.7014 5.36179 15.8187 5.40343 15.9341 5.43236C15.9966 5.4896 16.07 5.55694 16.1398 5.62092Z"
                fill="white"
              />
            </svg>
          </div>
          <Button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DisConnect;

import { Modal } from "react-bootstrap";
import { MultiWalletData } from "./constants/wallet";
import ToastShow from "../../Utils/toastShow";

export default function WalletConnenctModal(props: any) {
  const { modalOpen, handleClose, setWalletName } = props;
  const setWallet = (obj:any) => {
    if (obj.key === "walletconnect") {
      return  ToastShow( "info","We're upgrading the mobile experience. Be right back in a jiffy!");
     
    } else {
      setWalletName(obj.key);
      // dispatch(setMagicLinkInfo(false));
    }
  };
  return (
    <Modal show={modalOpen} onHide={handleClose} className="wallet-wrapper">
      <Modal.Body>
        <div className="modal-body-inner">
          {MultiWalletData.map((obj, i) => (
            <div key={obj.key} className="box-wrapper">
              <div
                onClick={() => setWallet(obj)}
                id={obj.title}
                className="box"
              >
                <div className="box-inner">
                  <div className="box-image">
                    <img src={obj.icon} alt="image" height={50} width={50} />
                  </div>
                  <Modal.Title> {obj.title}</Modal.Title>
                  <p className="box-description">{obj.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}

import { Button, Modal, Spinner, Dropdown } from "react-bootstrap";

interface modalObj {
  show: any;
  hide: any;
  modalData: any;
  onConfirm: any;
  genesisData: any;
  loaderFor: any;
  handleSelectoption: any;
  selectedPlugin: any;
  voiceData?: any;
}

export default function UnstakeModalMsg({
  show,
  hide,
  modalData,
  onConfirm,
  loaderFor,
  genesisData,
  handleSelectoption,
  selectedPlugin,
  voiceData,
}: modalObj) {
  const genesis =
    modalData.key === "xanaGenesisVoice" ? voiceData : genesisData;

  return (
    <Modal
      show={show}
      onHide={() =>
        modalData.modalFor == "claimReward" &&
        modalData.modalFor == "unstake" &&
        hide
      }
      className="modal-ui unstake-modal treasure-card-modal"
    >
      <Modal.Header>
        <p
          className={`${
            modalData.modalFor == "treasure" ? "title treasure-mod " : "title"
          }`}
        >
          {modalData.title}{" "}
          {modalData.cycle == "7" && modalData.title == "CRYPTONINJA"
            ? "Pack"
            : modalData.key === "NFTDualPack"
            ? "(Pack)"
            : modalData.key === "NFTDuelCard"
            ? "(Single)"
            : modalData.key === "NFTDuelCardAllowlist"
            ? "(Allowlist)"
            : modalData.title1 === "(Type-B)"
            ? "(Type-B)"
            : modalData.title1 === "(Type-A)"
            ? "(Type-A)"
            : modalData.title == "CRYPTONINJA" ||
              modalData.title == "XANA:PENPENZ"
            ? "WHITELIST"
            : null}
        </p>{" "}
        {(modalData.key == "xanaGenesisAnimation" ||
          modalData.key == "xanaGenesisVoice") && (
          <p className="amination">
            {modalData.key == "xanaGenesisAnimation"
              ? "Animation Plugin"
              : modalData.key == "xanaGenesisVoice"
              ? "Voice Plugin"
              : ""}
          </p>
        )}
        <svg
          className="modalClosebtn"
          onClick={hide}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 12C0 5.3835 5.3835 0 12 0C18.6165 0 24 5.3835 24 12C24 18.6165 18.6165 24 12 24C5.3835 24 0 18.6165 0 12ZM1.5 12C1.5 17.79 6.21 22.5 12 22.5C17.79 22.5 22.5 17.79 22.5 12C22.5 6.21 17.79 1.5 12 1.5C6.21 1.5 1.5 6.21 1.5 12Z"
            fill="black"
          />
          <path
            d="M15.9687 6.96973L11.999 10.9395L8.02925 6.96973L6.96875 8.03023L10.9385 12L6.96875 15.9697L8.02925 17.0302L11.999 13.0605L15.9687 17.0302L17.0292 15.9697L13.0595 12L17.0292 8.03023L15.9687 6.96973Z"
            fill="black"
          />
        </svg>
      </Modal.Header>

      <Modal.Body className="modal-ui-body">
        {(modalData.key !== "xanaGenesisAnimation" ||
          modalData.key !== "xanaGenesisVoice") && (
          <p className="greet">{modalData.greet}</p>
        )}

        <p
          className={`${
            modalData.title == "STAKING REWARD" ||
            modalData.modalFor == "EMERGENCY_and_ClAIM" ||
            modalData.modalFor == "APPLY_For_UNSTAKE"
              ? "rewards"
              : "treasure-modal-text"
          }`}
        >
          {modalData.message1}{" "}
          {modalData.title == "APPLY FOR UNSTAKE" ||
          modalData.title == "CLAIM UNSTAKE"  ? (
            <br />
          ) : null}
          {modalData.text1 && modalData.text1}{" "}
          {modalData.title == "APPLY FOR UNSTAKE" ||
          modalData.title == "CLAIM UNSTAKE"  ? (
            <br />
          ) : null}
          {modalData.text2 && modalData.text2}
          <p className="treasure-modal-text">{modalData.message2}</p>
        </p>

        {(modalData.key == "xanaGenesisAnimation" ||
          modalData.key === "xanaGenesisVoice") && (
          <Dropdown className="plugin-wrap" drop="down">
            <Dropdown.Toggle variant="success" id="dropdown-basic" key="down">
              <div>{selectedPlugin}</div>
              <div>
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 14L0.205774 0.499999L15.7942 0.5L8 14Z"
                    fill="black"
                  />
                </svg>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
              onClick={(e: any) => handleSelectoption(e, modalData.key)}
            >
              {genesis && genesis.length > 0 ? (
                genesis?.map((item: any, index: any) => (
                  <Dropdown.Item name={item.id}>{item.name}</Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item>You have No Genesis in Your Owned</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}

        <div className="btn-wrp">
          {modalData.btnText && (
            <Button className="modal-btn cancel-btn" onClick={hide}>
              {modalData.btnText}
            </Button>
          )}
          {/* disabled={loaderFor == "genesis" ? true : false} */}

          {loaderFor == "claimAll" ||
          loaderFor == "unStakeAll" ||
          loaderFor == "genesis" ||
          loaderFor == "avatar" ||
          loaderFor == "astroboyPack" ||
          loaderFor == "xanaSneakerz" ||
          loaderFor == "xanaGenesisAnimation" ||
          loaderFor == "astroboyOkayamaPack" ||
          loaderFor == "xanaGenesisVoice" ||
          // loaderFor === "NFTDualCard" ||
          // loaderFor === "NFTDualPack" ||
          loaderFor == "land" ? (
            <Button className="modal-btn cta-btn">
              <Spinner animation="border" role="status" />
            </Button>
          ) : (
            <Button
              className="modal-btn cta-btn"
              onClick={() =>
                modalData.key == "genesis" ||
                modalData.key == "land" ||
                modalData.key == "avatar" ||
                modalData.key == "xanaSneakerz" ||
                modalData.key == "astroboyOkayamaPack" ||
                modalData.key == "astroboyPack" ||
                // loaderFor === "NFTDualCard" ||
                // loaderFor === "NFTDualPack" ||
                modalData.title == "STAKING REWARD" ||
                modalData.modalFor == "EMERGENCY_and_ClAIM" ||
                modalData.modalFor == "APPLY_For_UNSTAKE" ||
                ((modalData.key == "xanaGenesisVoice" ||
                  modalData.key == "xanaGenesisAnimation") &&
                  genesis &&
                  genesis.length > 0)
                  ? onConfirm()
                  : hide()
              }
            >
              {modalData.unstakeBtnText}
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

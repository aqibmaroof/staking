import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import LandStaking from "../Staking/LandStaking/landStaking";
import XetaStaking from "../Staking/XetaStaking/xetaStaking";
import { useDispatch, useSelector } from "react-redux";
import TabComponent from "../Tab/tab";
import {
  MainStakingTabConfigTestnet,
  MainStakingTabConfigMainnet,
} from "../Configs/config";

import { setCurrentTab } from "../../store/mainTab/mainTab";
import {
  setChainErrorMsg,
} from "../../store/web3/selectedNetwork";

import {
  setModalNetwork,
} from "../../store/web3/walletSlice";
// import { toast } from "react-toastify";
// import ToastShow from "../../Utils/toastShow";

export default function HomePage() {
  const dispatch = useDispatch();
  const [tab, setTab]: any = useState("XETA-STAKING");
  // const toastId = React.useRef(null);

  const MainStakingTabConfig =
    process.env.NEXT_PUBLIC_NETWORK_TYPE === "testnet"
      ? MainStakingTabConfigTestnet
      : MainStakingTabConfigMainnet;

  const chain = useSelector(
    (state: any) => state.wallet.chainId
  );

  const currentTab = useSelector(
    (state: any) => state.mainTabReducer.currentTab
  );

  useEffect(() => {
    dispatch(setCurrentTab(MainStakingTabConfig[0]));
  }, []);

  const handleTabChange = (selectedTabKey: string) => {
    // if (selectedTabKey === "LAND-STAKING"){
    //   if (!toast.isActive(toastId.current)) {
    //     toastId.current = ToastShow( "info","Under maintenance");
    //   }
    //   return;
    // }
    // else {
      let selectedTab = MainStakingTabConfig.filter(
        (tab) => tab.key === selectedTabKey
      );
      if (chain && Number(selectedTab[0].chain) === Number(chain)) {
        setTab(selectedTabKey);
        dispatch(setCurrentTab(selectedTab[0]));
      } else {
        dispatch(setChainErrorMsg(selectedTab[0]?.message));
        dispatch(setModalNetwork(true));
        setTab(selectedTabKey);
        dispatch(setCurrentTab(selectedTab[0]));
      }
    // }
 
  };
 
  return (
    <Container fluid className="landingUI" id="home">
      <section className="video-section">
        <video autoPlay loop muted>
          <source
            src="https://web.xana.net/wp-content/uploads/2022/08/trailer_202206d_new.mp4"
            type="video/mp4"
          />
        </video>
      </section>

      <section className="stacking-UI">
        <Container className="px-0">
          <Row className="homepage-title mx-0 mb-0">
            <Col className="text-center px-0">
              <h1 className="heading-1">staking</h1>
            </Col>
          </Row>

          <Row className="New-Tabber-UI">
            <Col className="tabber-col">
              <TabComponent
                activeKey={tab}
                tabOptions={MainStakingTabConfig}
                onChangeTab={handleTabChange}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="stacking-UI">
        {currentTab?.key == "LAND-STAKING" ? (
          <LandStaking />
        ) : currentTab?.key == "XETA-STAKING" ? (
          <XetaStaking />
        ) : (
          <></>
        )}
      </section>
    </Container>
  );
}

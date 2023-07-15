import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Dropdown,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stakeTransactionCredential } from "../../../store/web3/stakeTransaction";
import TabComponent from "../../Tab/tab";
import Pagination from "../../Pagination/pagination";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import LandCards from "../../Card/landCards";
import Countdown from "../../Counter/countDown";
import { insertComma } from "../../../Utils/insertComma";
import { LandStakingContractSevice } from "../../../services/landStakingContract.service";
import { ApprovallContractSevice } from "../../../services/approvallContract.sevice";
import { ApprovallContract } from "../../Common/approvalContract";
import { LandStakingContract } from "../../Common/landStakingContract";
import { dateUtils } from "../../../Utils/dateUtils";
import UnstakeModalMsg from "../../UnstakeModalMsg/modal";
import { TreasureContractSevice } from "../../../services/TreasureContract.sevice";
import ToastShow from "../../../Utils/toastShow";
import { landStakingTabConfig } from "../../Configs/config";
import { setChainErrorMsg } from "../../../store/web3/selectedNetwork";
import { setModalNetwork } from "../../../store/web3/walletSlice";
import WorkInstructions from "../../WorkInstruction/Land/workInstructions";
import { RuffleStakingContractSevice } from "../../../services/ruffleContract.service";
import Slider from "react-slick";
import landAllCycles from "../../Cycles/landStakingCycle/landAllCycles";
import StimulationChart from "../../StimulationChart/stimulationChart";
import { TreasureContract } from "../../Common/TreasureBoxContract";

interface CampaignObject {
  campaignId?: number;
  endTime?: number;
  rewardCount?: number;
  startTime?: number;
  coolDownTime?: number;
  nextSnapShotTime?: number;
  ruffleTime?: number;
}
export default function LandStaking() {
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { library }: any = useWeb3React();
  const web3 = new Web3(library?.provider);
  let timeout: any;
  // useStates
  const [currentCampaign, setCurrentCampaign] = useState<CampaignObject>({});
  const [rewardsData, setRewardsData]: any = useState([]);
  const [ruffleCheck, setRufffleCheck]: any = useState([]);
  const [isClaimed, setIsClaimed]: any = useState([]);
  const [userLand, setUserLand]: any = useState("");
  const [userGenesis, setUserGenesis]: any = useState("");
  const [claimload, setClaimLoad] = useState(false);
  const [earnedTickets, setEarnedTickets]: any = useState();
  const [selectedGenesis, setSelectedGenesis]: any = useState([]);
  const [pluginData, setPluginData]: any = useState("");
  const [selectedGenesisTokenIds, setSelectedGenesisTokenIds]: any = useState(
    []
  );
  const [ticketsPerDay, setTicketsPerDay]: any = useState(0);
  const [genesisData, setGenesisData]: any = useState("");
  const [show, setShow] = useState(false);
  const [emergencyClaimCheck, setEmergencyClaimCheck]: any = useState("");
  const [modalData, setModalData]: any = useState({});
  const [modalShow, setModalShow]: any = useState(false);
  const [loaderFor, setLoaderFor]: any = useState();
  const [landUnStakedHistory, setLandUnStakedHistory]: any = useState("");
  const [check, setCheck] = useState(true);
  const [stakeBtnLoader, setStakeBtnLoader] = useState(false);
  const [activeTab, setActiveTab] = useState("stakeHistory");
  const [landStakedHistory, setLandStakedHistory]: any = useState("");
  const [treasure, setTreasure]: any = useState();
  const [currentTabData, setCurrentTabData]: any = useState("");
  const [loader, setLoader]: any = useState(false);
  const [checkgenesis, setCheckGenesis] = useState(true);
  const [selectedStakedId, setSelectedStakedId]: any = useState("");
  const [limitCheck, setLimitCheck]: any = useState("");
  const [earnedTicketsPerDay, setEarnedTicketsPerDay] = useState("");
  const [releaseCheck, setReleaseCheck]: any = useState([]);
  const [time, setTime] = useState(0);
  const [treasureActiveTab, setTreasureActiveTab] = useState(
    landAllCycles?.cycles[0]?.key
  );
  const [currentCycle, setCurerntCycle]: any = useState(
    landAllCycles?.cycles[0]?.cycle
  );
  const [landOption, setLandOption] = useState({
    x_coords: "",
    y_coords: "",
    rarity: "",
    size: "",
    tokenId: "",
    stakingId: 1,
    plotSize: "",
  });
  const [selectedTreasureData, setSelectedTreasureData]: any = useState({
    title: "",
    title1: "",
    message1: "",
    btnText: "Cancel",
    unstakeBtnText: "Confirm",
    modalFor: "treasure",
  });

  const [selectedPlugin, setSelectedPlugin]: any = useState(
    "Select your Genesis to apply plugin"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  // redux
  // const addresses = useSelector(
  //   (state: any) => state.persistedReducer.providerReducer.address
  // );
  // const userConnected = useSelector(
  //   (state: any) => state.persistedReducer.reducer.userConnected
  // );
  // const provider = useSelector(
  //   (state: any) => state.persistedReducer.providerReducer.provider
  // );

  const chain = useSelector((state: any) => state.wallet.chainId);

  const { address: connectedAddress } = useSelector(
    (state: any) => state.wallet
  );

  const { userConnected } = useSelector((state: any) => state.user);

  const curentTabObj = useSelector(
    (state: any) => state.mainTabReducer.currentTab
  );
  // const addresses = "0x62aeef6121c65d67a4d715cee1c97a7ec22a990e";

  const { address: addresses, provider } = useSelector(
    (state: any) => state.providerReducer
  );

  const txInProgress = useSelector(
    (state: any) => state.stakeTransactionReducer.txInProgress
  );

  useEffect(() => {
    timeout = setInterval(() => {
      setTime((time) => time + 1);
    }, 6000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  useEffect(() => {
    landStakeHistory();
    ConditionalCyclesData();
    getCurrentCampaignDetails();
    getEmergencyClaimable();
    getUnstakeHistory();
    getEarnedTickets();
    getEarnedTicketsPerDay();
  }, [curentTabObj?.key]);

  useEffect(() => {
    if (addresses && userConnected) {
      getEarnedTickets();
      getEarnedTicketsPerDay();
      getClaimableRewards();
    }
  }, [time]);

  useEffect(() => {
    if (addresses && userConnected) {
      fetchUserStats();
    }
  }, [addresses]);

  useEffect(() => {
    if (addresses && userConnected) {
      getTreasureRewards();
    }
  }, [treasureActiveTab]);

  useEffect(() => {
    ConditionalCyclesData();
  }, [treasureActiveTab]);

  const isAllowedChainSelected = (commingFor?: any) => {
    if (!userConnected)
      return document.getElementById("walletConnectModal").click();

    if (commingFor === "claimReward" || commingFor === "treasure") {
      if (chain !== Number(process.env.NEXT_PUBLIC_CHAINID_XANA)) {
        dispatch(setModalNetwork(true));
        dispatch(setChainErrorMsg(curentTabObj.chainMessage));
        return false;
      }
    } else if (chain !== curentTabObj.chain) {
      dispatch(setModalNetwork(true));
      dispatch(setChainErrorMsg(curentTabObj.message));
      return false;
    }
    return true;
  };

  const handleSelectoption = (event: any) => {
    if (event.target.name) {
      let TokenId = genesisData?.filter(
        (item: any) => item.id == event.target.name
      );
      setPluginData(TokenId);
      setSelectedPlugin(TokenId[0]?.name);
    } else {
      setSelectedPlugin("Select your Genesis to apply plugin");
    }
  };

  const unique = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
  };

  const ConditionalCyclesData = () => {
    const data = landAllCycles[currentCycle];
    const tempTreasure = Object.keys(data).map((item) => {
      return {
        ...data[item],
        rewards: [],
        hasClaimed: [],
        key: item,
      };
    });
    setTreasure(tempTreasure);
  };

  function closeBoxes(
    data: any,
    forBoxOpen: any,
    rewardRecieved: any,
    rewardClaimable: any
  ) {
    return (
      <Col
        key={data.title}
        className={`${
          rewardRecieved > 0
            ? "card-col px-0 col-md-4 col-sm-5 col-11 got-reward"
            : "card-col px-0 col-md-4 col-sm-5 col-11"
        }`}
      >
        <div
          className="card"
          onClick={() => rewardClaimable == true && treasureOpen(data)}
        >
          <div className="card-body">
            <div className="heading-6 card-title h5">{data.title}</div>
            <div className="heading-6 card-title-small">
              {data.title1} &nbsp;{" "}
            </div>
            <div className="img-wr img-big">
              <img src={forBoxOpen ? data.openBox : data.icon} alt="box" />
            </div>
          </div>
        </div>
        {rewardRecieved > 0 && (
          <Badge className="custom-badge">{rewardRecieved}</Badge>
        )}
      </Col>
    );
  }

  const landSelectHandler = (e: any) => {
    setLandOption({
      x_coords: e.xx_coords,
      y_coords: e.yy_coords,
      rarity: e.rarity,
      size: e.size,
      plotSize: e.plotSize,
      tokenId: e.tokenId,
      stakingId: 1,
    });
    if (e.rarity == "common" && e.plotSize === 1) {
      setTicketsPerDay(1);
    } else if (e.rarity == "common" && e.plotSize === 2) {
      setTicketsPerDay(4);
    } else if (e.rarity == "common" && e.plotSize === 3) {
      setTicketsPerDay(10);
    } else if (e.rarity == "common" && e.plotSize === 4) {
      setTicketsPerDay(20);
    } else if (e.rarity == "rare" && e.plotSize === 1) {
      setTicketsPerDay(4);
    } else if (e.rarity == "rare" && e.plotSize === 2) {
      setTicketsPerDay(14);
    } else if (e.rarity == "rare" && e.plotSize === 3) {
      setTicketsPerDay(32);
    } else if (e.rarity == "rare" && e.plotSize === 4) {
      setTicketsPerDay(60);
    } else if (e.rarity == "super rare" && e.plotSize === 1) {
      setTicketsPerDay(15);
    } else if (e.rarity == "super rare" && e.plotSize === 2) {
      setTicketsPerDay(50);
    } else if (e.rarity == "super rare" && e.plotSize === 3) {
      setTicketsPerDay(120);
    } else if (e.rarity == "super rare" && e.plotSize === 4) {
      setTicketsPerDay(260);
    } else {
      setTicketsPerDay(0);
    }
    setCheckGenesis(true);
    setSelectedGenesis([]);
    setSelectedGenesisTokenIds([]);
    setCheck(false);
  };

  const fetchUserStats = () => {
    landStakeHistory();
    UserGenesisDataForStake();
    UserLandDataForStake();
    getOwnedGenesis();
    getEmergencyClaimable();
    getUnstakeHistory();
    getTreasureRewards();
    getEarnedTickets();
    getEarnedTicketsPerDay();
  };

  const landSelectHandlerGenesis = (genesis: any) => {
    if (
      landOption.size == "" ||
      landOption.x_coords == "" ||
      landOption.y_coords == "" ||
      landOption.rarity == ""
    )
      return ToastShow("info", "Please Select Land First !");

    const found = selectedGenesis.find(
      (item: any) => item.tokenId === genesis.tokenId
    );

    if (found) {
      if (selectedGenesis.length == 1) {
        setCheckGenesis(true);
        const filteredGenesis = selectedGenesis.filter(
          (item: any) => item.tokenId !== found?.tokenId
        );
        return setSelectedGenesis(filteredGenesis);
      } else {
        const filteredGenesis = selectedGenesis.filter(
          (item: any) => item.tokenId !== found?.tokenId
        );
        return setSelectedGenesis(filteredGenesis);
      }
    }

    if (landOption.plotSize == "1") {
      if (selectedGenesis.length > "0")
        return ToastShow(
          "info",
          `YOU can't select more with ${landOption.size} land`
        );
      setSelectedGenesisTokenIds((prevState: any) => [
        ...prevState,
        genesis.tokenId,
      ]);
      setSelectedGenesis((prevState: any) => [...prevState, genesis]);
    } else if (landOption.plotSize == "2") {
      if (selectedGenesis.length > "3")
        return ToastShow(
          "info",
          `YOU can't select more with ${landOption.size} land`
        );
      setSelectedGenesisTokenIds((prevState: any) => [
        ...prevState,
        genesis.tokenId,
      ]);
      setSelectedGenesis((prevState: any) => [...prevState, genesis]);
    } else if (landOption.plotSize == "3") {
      if (selectedGenesis.length > "8")
        return ToastShow(
          "info",
          `YOU can't select more with ${landOption.size} land`
        );
      setSelectedGenesisTokenIds((prevState: any) => [
        ...prevState,
        genesis.tokenId,
      ]);
      setSelectedGenesis((prevState: any) => [...prevState, genesis]);
    } else if (landOption.plotSize == "4") {
      if (selectedGenesis.length > "15")
        return ToastShow(
          "info",
          `YOU can't select more with ${landOption.size} land`
        );
      setSelectedGenesisTokenIds((prevState: any) => [
        ...prevState,
        genesis.tokenId,
      ]);
      setSelectedGenesis((prevState: any) => [...prevState, genesis]);
    }
    setCheckGenesis(false);
  };

  const handleTabChange = (selectedTab: string) => {
    if (selectedTab === "stakeHistory") {
      landStakeHistory();
      if (
        landStakedHistory &&
        landStakedHistory !== "" &&
        landStakedHistory !== undefined
      ) {
        setCurrentTabData(landStakedHistory);
      }
    } else if (selectedTab === "unStakeHistory") {
      getEmergencyClaimable();
      getUnstakeHistory();
      if (
        landUnStakedHistory &&
        landUnStakedHistory !== "" &&
        landUnStakedHistory !== undefined
      ) {
        setCurrentTabData(landUnStakedHistory);
      } else {
        setCurrentTabData("");
      }
    } else if (selectedTab === "rewards") {
      getClaimableRewards();
      if (rewardsData && rewardsData !== "" && rewardsData !== undefined) {
        const tabData = rewardsData?.filter(
          (item: any) => item.totalTickets > 0 || item.ticket_distribute > 0
        );
        setCurrentTabData(tabData);
      } else {
        setCurrentTabData("");
      }
    }
    setActiveTab(selectedTab);
  };

  const getCurrentCampaignDetails = async () => {
    const landStakingContractObj = new LandStakingContractSevice(
      curentTabObj.rpcUrl
    );
    let campaignDetail =
      await landStakingContractObj.getCurrentCampaignDetails();
    if (campaignDetail !== false) {
      let obj: CampaignObject = {
        campaignId: parseInt(campaignDetail.campaignId),
        endTime: parseInt(campaignDetail.endTime) * 1000,
        rewardCount: parseInt(campaignDetail.rewardCount) * 1000,
        startTime: parseInt(campaignDetail.startTime) * 1000,
        ruffleTime:
          parseInt(campaignDetail?.ruffleTime) * 1000 +
          parseInt(campaignDetail?.endTime) * 1000,
      };
      if (obj?.endTime && obj?.coolDownTime) {
        obj.nextSnapShotTime = obj?.endTime + obj?.coolDownTime;
      }

      setCurrentCampaign(obj);
    }
  };

  const getEarnedTickets = async () => {
    const landStakingContractObj = new LandStakingContractSevice(
      curentTabObj.rpcUrl
    );

    let ticketResponse = await landStakingContractObj.getClaimableTickets(
      addresses
    );
    if (ticketResponse !== false) {
      const parsedResponse = parseInt(ticketResponse);
      setEarnedTickets(parsedResponse !== 0 ? ticketResponse : "");
    }
  };

  const getEarnedTicketsPerDay = async () => {
    const landStakingContractObj = new LandStakingContractSevice(
      curentTabObj.rpcUrl
    );

    let ticketResponse =
      await landStakingContractObj.perDayXTicketsUserClaimable(addresses);
    if (ticketResponse !== false) {
      const parsedResponse = parseInt(ticketResponse);
      setEarnedTicketsPerDay(parsedResponse === 0 ? "0" : ticketResponse);
    }
  };

  const getClaimableRewards = async () => {
    const ruffeContractObj = new RuffleStakingContractSevice(
      process.env.NEXT_PUBLIC_RPC_XANA
    );
    const claimRewardsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_V1_ENDPOINT}/staking/get-staking-nft-campaign-reward?useraddress=${addresses}`
    ).then((res) => res.json());

    if (claimRewardsData.success) {
      setRufffleCheck(claimRewardsData.data.reverse());
      const rewards = claimRewardsData?.data?.filter(
        (item: any) => item.totalTickets > 0 || item.ticket_distribute > 0
      );
      setRewardsData(rewards);
    }

    const rewardsCall: any[] = [];
    const RewardsDataArray: any[] = [];
    if (currentCampaign?.campaignId) {
      for (let i = 1; i <= currentCampaign?.campaignId; i++) {
        rewardsCall.push(ruffeContractObj.getRewardClaimable(addresses, i));
      }
    }
    await Promise.all([...rewardsCall]).then((res) => {
      res.forEach((claimableReward: any, index: any) => {
        if (!claimableReward) return;
        RewardsDataArray.push({
          nft: parseInt(claimableReward),
        });
      });
    });
    if (RewardsDataArray) {
      setIsClaimed(RewardsDataArray);
    }
  };

  const claimTicket = () => {
    if (userConnected) {
      if (txInProgress == true)
        return ToastShow("info", `Transaction is already in Progress !`);
      if (earnedTickets == 0)
        return ToastShow("error", `You have 0 tickets to Claim !`);
      setClaimLoad(true);
      dispatch(stakeTransactionCredential({ txInProgress: true }));

      const payload = {
        body: {
          useraddress: addresses,
          campaignId: currentCampaign.campaignId,
        },
      };
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_V1_ENDPOINT}/staking/staking-nft-join-ruffle`,
          payload.body
        )
        .then((stakeResponse: any) => {
          if (stakeResponse) {
            ToastShow("success", `JOIN RUFFLE SUCCESSFULL`);
            dispatch(stakeTransactionCredential({ txInProgress: false }));
            setClaimLoad(false);
            getClaimableRewards();
          }
        })
        .catch(() => {
          ToastShow("error", `Something went wrong while JOIN RUFFLE !`);
          dispatch(stakeTransactionCredential({ txInProgress: false }));
          setClaimLoad(false);
        });
    }
  };

  useEffect(() => {
    checkReleaseInfo();
  }, [rewardsData]);

  const checkReleaseInfo = async () => {
    const ruffeContractObj = new RuffleStakingContractSevice(
      process.env.NEXT_PUBLIC_RPC_XANA
    );

    let releaseCheckCall: any[] = [];
    let releaseCheckData: any[] = [];
    rewardsData.forEach((element: any) => {
      releaseCheckCall.push(
        ruffeContractObj.releaseCheck(element.params.campaignId)
      );
    });

    await Promise.all([...releaseCheckCall]).then((res) => {
      res.forEach((releaseValue: any) => {
        releaseCheckData.push(releaseValue);
      });
    });

    if (releaseCheckData) {
      setReleaseCheck(releaseCheckData);
    }
  };
  const isApproved = async (conAdd: any) => {
    const approvallContractObj = new ApprovallContractSevice(
      curentTabObj.rpcUrl,
      conAdd
    );
    const landApproved = await approvallContractObj.isApprovedForAll(
      addresses,
      LandStakingContract.address
    );
    if (landApproved) {
      return true;
    } else {
      return false;
    }
  };

  const setApproval = async (conAdd: any) => {
    const approvallContractObject = new ApprovallContractSevice(
      provider,
      conAdd
    );
    const isApprovCheck = await isApproved(conAdd);
    if (isApprovCheck === true) {
      return true;
    } else {
      const approvalForLand = await approvallContractObject.setApprovalForAll(
        LandStakingContract.address,
        true,
        addresses
      );
      if (approvalForLand) {
        return true;
      } else {
        return false;
      }
    }
  };

  const StakeLand = async () => {
    if (!isAllowedChainSelected()) return;
    if (
      currentCampaign?.startTime !== undefined &&
      currentCampaign?.endTime !== undefined
    ) {
      if (
        currentCampaign?.startTime > new Date().getTime() ||
        currentCampaign?.endTime < new Date().getTime()
      ) {
        return ToastShow(
          "error",
          "Staking is not possible other than the campaign period !"
        );
      }
      if (userConnected) {
        if (txInProgress == true)
          return ToastShow("info", `transaction is already in progress !`);
        if (landOption.plotSize == "1") {
          if (selectedGenesis.length < "1")
            return ToastShow(
              "info",
              `Please select more Genesis with ${landOption.size} land`
            );
        } else if (landOption.plotSize == "2") {
          if (selectedGenesis.length < "4")
            return ToastShow(
              "info",
              `Please select more Genesis with ${landOption.size} land`
            );
        } else if (landOption.plotSize == "3") {
          if (selectedGenesis.length < "9")
            return ToastShow(
              "info",
              `Please select more Genesis with ${landOption.size} land`
            );
        } else if (landOption.plotSize == "4") {
          if (selectedGenesis.length < "16")
            return ToastShow(
              "info",
              `Please select more Genesis  with ${landOption.size} land`
            );
        }
        setStakeBtnLoader(true);
        dispatch(stakeTransactionCredential({ txInProgress: true }));
        const landStakingContractObj = new LandStakingContractSevice(provider);

        await axios
          .get(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/staking/get-proof-hash?rarity=${landOption.rarity}&size=${landOption.plotSize}&tokenId=${landOption.tokenId}&stakingId=${landOption.stakingId}`
          )
          .then(async (rootHash: any) => {
            if (rootHash.data.hexProof) {
              let landApprovalChecked = await setApproval(
                ApprovallContract.landAddress
              );
              let genesisApprovalChecked = await setApproval(
                ApprovallContract.genesisAddress
              );
              if (landApprovalChecked && genesisApprovalChecked) {
                await landStakingContractObj
                  .StakeLand(
                    landOption.tokenId,
                    landOption.plotSize,
                    landOption.rarity,
                    selectedGenesisTokenIds,
                    rootHash.data.hexProof,
                    addresses
                  )
                  .then((stakeLandResponse: any) => {
                    if (stakeLandResponse) {
                      setLoader(false);
                      setLandOption({
                        x_coords: "",
                        y_coords: "",
                        rarity: "",
                        size: "",
                        tokenId: "",
                        stakingId: 1,
                        plotSize: "",
                      });
                      setSelectedGenesis([]);
                      setSelectedGenesisTokenIds([]);
                      setCheck(true);
                      setStakeBtnLoader(false);
                      landStakeHistory();
                      UserGenesisDataForStake();
                      UserLandDataForStake();
                      setCheckGenesis(true);
                      dispatch(
                        stakeTransactionCredential({
                          txInProgress: false,
                        })
                      );
                      ToastShow(
                        "success",
                        "your land with Genesis staked successfully !"
                      );
                    }
                  })
                  .catch((err: any) => {
                    setStakeBtnLoader(false);
                    dispatch(
                      stakeTransactionCredential({
                        txInProgress: false,
                      })
                    );
                    setLandOption({
                      x_coords: "",
                      y_coords: "",
                      rarity: "",
                      size: "",
                      tokenId: "",
                      stakingId: 1,
                      plotSize: "",
                    });
                    setSelectedGenesis([]);
                    setSelectedGenesisTokenIds([]);
                    setCheck(true);
                    setCheckGenesis(true);
                    ToastShow("error", err.message);
                  });
              } else {
                setStakeBtnLoader(false);
                dispatch(
                  stakeTransactionCredential({
                    txInProgress: false,
                  })
                );
                setLandOption({
                  x_coords: "",
                  y_coords: "",
                  rarity: "",
                  size: "",
                  tokenId: "",
                  stakingId: 1,
                  plotSize: "",
                });
                setSelectedGenesis([]);
                setSelectedGenesisTokenIds([]);
                setCheck(true);
                setCheckGenesis(true);
                ToastShow(
                  "info",
                  "please approve for both to proceed with staking !"
                );
              }
            }
          })
          .catch((er: any) => {
            setStakeBtnLoader(false);
            setLandOption({
              x_coords: "",
              y_coords: "",
              rarity: "",
              size: "",
              tokenId: "",
              stakingId: 1,
              plotSize: "",
            });
            setSelectedGenesis([]);
            setSelectedGenesisTokenIds([]);
            setCheck(true);
            setCheckGenesis(true);
            dispatch(
              stakeTransactionCredential({
                txInProgress: false,
              })
            );
            ToastShow("error", er.message);
          });
      } else {
        ToastShow("info", "please connect to your wallet !");
      }
    }
  };

  const getEmergencyClaimable = async () => {
    let landContractObj = new LandStakingContractSevice(provider);

    const UserPenaltyIds = landUnStakedHistory;

    const UserPenaltyData: any[] = [];
    const penaltyDataCall: any[] = [];
    UserPenaltyIds &&
      UserPenaltyIds?.forEach((element: any) => {
        penaltyDataCall.push(
          landContractObj.isClaimableEmergency(addresses, element?.id)
        );
      });

    await Promise.all([...penaltyDataCall]).then((res) => {
      res.forEach((PenaltyRecord: any) => {
        UserPenaltyData.push(PenaltyRecord);
      });

      if (UserPenaltyData) {
        setEmergencyClaimCheck(UserPenaltyData);
      }
    });
  };

  const landStakeHistory = async () => {
    const landStakingContractObj = new LandStakingContractSevice(
      curentTabObj.rpcUrl
    );

    let output = await landStakingContractObj.getLandStakesIds(addresses);
    if (output !== false) {
      const userStakeData: any[] = [];
      const getStakeCall: any[] = [];
      output.forEach((element: any) => {
        getStakeCall.push(
          landStakingContractObj.getUserStakedland(addresses, element)
        );
      });
      await Promise.all([...getStakeCall]).then((res) => {
        res.forEach((stakeRecord: any, index: any) => {
          userStakeData.push({
            id: output[index],
            stakedAt: parseInt(stakeRecord?.stakedAt) * 1000,
            rarity: stakeRecord?.rarity,
            genesisTokenIds: stakeRecord?.genesisTokenIds,
            tokenId: stakeRecord?.tokenId,
            size: stakeRecord?.size,
          });
        });
        if (userStakeData) {
          setLandStakedHistory(userStakeData);
          setCurrentTabData(userStakeData.reverse());
        }
      });
    }
  };

  const handleRewardClaim = (e: any) => {
    if (!isAllowedChainSelected("claimReward")) return;
    if (userConnected) {
      if (txInProgress == true)
        return ToastShow("info", "Transaction is Already in progress");
      setModalShow(true);
      setLimitCheck(e.ticket_distribute);
      setModalData({
        title: "STAKING REWARD",
        message1: "Are you sure you want to claim your staking reward?",
        btnText: "Cancel",
        unstakeBtnText: "Confirm",
        modalFor: "claimReward",
      });
      setSelectedStakedId(e?.params?.campaignId);
    }
  };

  // const getUserRewardlimit = async (Campaign: any) => {
  //   const limit = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_V1_ENDPOINT}/staking/get-staking-nft-reward-limit?useraddress=${addresses}&campaignId=${Campaign}`
  //   ).then((res) => res.json());
  //   if (limit.data) {
  //     return limit.data;
  //   }
  // };

  const claimReward = async () => {
    setModalShow(false);
    dispatch(stakeTransactionCredential({ txInProgress: true }));
    const ruffleContractObj = new RuffleStakingContractSevice(provider);

    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_V1_ENDPOINT}/staking/get-staking-nft-reward-proof?campaignId=${selectedStakedId}&useraddress=${addresses}&limit=${limitCheck}`
      )
      .then(async (rootHash: any) => {
        if (rootHash.data) {
          ruffleContractObj
            .claimReward(
              addresses,
              selectedStakedId,
              limitCheck,
              rootHash.data.data
            )
            .then((unStakeResponse: any) => {
              if (unStakeResponse) {
                ToastShow("success", "Reward claimed successfully.");
                setSelectedStakedId("");
                getTreasureRewards();
                getClaimableRewards();
                dispatch(stakeTransactionCredential({ txInProgress: false }));
              }
            })
            .catch(() => {
              ToastShow(
                "error",
                "Transaction Rejected or Something went wrong while claiming."
              );
              setSelectedStakedId("");
              dispatch(stakeTransactionCredential({ txInProgress: false }));
            });
        }
      })
      .catch((err) => {
        ToastShow(
          "error",
          "Transaction Rejected or Something went wrong while claiming."
        );
        setSelectedStakedId("");
        dispatch(stakeTransactionCredential({ txInProgress: false }));
      });
  };

  const getUnstakeHistory = async () => {
    let landStakeContractObj = new LandStakingContractSevice(
      curentTabObj.rpcUrl
    );
    let unStakeId = await landStakeContractObj.getUserUnStakeIds(addresses);
    if (unStakeId !== false) {
      let userUnStakeData: any[] = [];
      const getUnStakeCall: any[] = [];
      unStakeId.forEach((element: any) => {
        getUnStakeCall.push(
          landStakeContractObj.getUnStake(addresses, element)
        );
      });
      Promise.all([...getUnStakeCall]).then((res) => {
        res.forEach((unStakeRecord: any, index: any) => {
          userUnStakeData.push({
            id: unStakeId[index],
            appliedAt: parseInt(unStakeRecord?.appliedAt) * 1000,
            stakedAt: parseInt(unStakeRecord?.stakedAt) * 1000,
            unStakedAt: parseInt(unStakeRecord?.unStakedAt) * 1000,
            rarity: unStakeRecord?.rarity,
            size: unStakeRecord?.size,
            tokenId: unStakeRecord?.tokenId,
            genesisTokenIds: unStakeRecord?.genesisTokenIds,
            isAppliedFor: unStakeRecord?.isAppliedFor,
          });
        });
        if (userUnStakeData) {
          setLandUnStakedHistory(userUnStakeData.reverse());
        }
      });
    }
  };

  const apply = (data: any) => {
    if (!isAllowedChainSelected()) return;
    if (userConnected) {
      if (txInProgress)
        return ToastShow("info", "Transaction is already in progress !");

      setModalShow(true);
      setSelectedStakedId(data.id);

      // var min = differ / (60 * 1000);
      let message1 = "";
      message1 = `Are you sure you want to “apply” for unstake ?`;
      let message2 = "Must CLAIM 14 days after apply.";
      let message3 = "(Ticket Earned will be lost)";
      // if (
      //   stakeDaysDifference < 14 ||
      //   (currentCampaign?.startTime &&
      //     currentCampaign?.startTime < new Date().getTime() &&
      //     currentCampaign?.endTime &&
      //     currentCampaign?.endTime > new Date().getTime())
      // )
      // {
      //   message1 =
      //     "If you unstake within 14 days, a Tax of 18% of the staking amount will be incurred. You will also lose all the TICKET EARNED tickets from your staking. Do you want to unstake?";
      // }
      // else {
      //   message1 =
      //     "If you unstake, you will lose all the TICKET EARNED obtained by staking. You will be receiving payment after 14 days. Do you want to Unstake?";
      // }
      setModalData({
        title: "APPLY FOR UNSTAKE",
        message1: message1,
        text1: message2,
        text2: message3,
        btnText: "Cancel",
        unstakeBtnText: "Confirm",
        modalFor: "APPLY_For_UNSTAKE",
      });
    }
  };

  const applyForLandUnstake = async () => {
    if (txInProgress)
      return ToastShow("info", "Transaction is already in progress !");
    setModalShow(false);
    dispatch(stakeTransactionCredential({ txInProgress: true }));
    const landStakingContractObj = new LandStakingContractSevice(provider);
    landStakingContractObj
      .applyForLandUnStake(addresses, selectedStakedId)
      .then((applyUnstakeResponse: any) => {
        if (applyUnstakeResponse) {
          setModalShow(false);
          getUnstakeHistory();
          landStakeHistory();
          getEmergencyClaimable();
          setSelectedStakedId("");
          getUnstakeHistory();
          ToastShow("success", "Applied For Unstaked successfully !");
          dispatch(stakeTransactionCredential({ txInProgress: false }));
        }
      })
      .catch(() => {
        setModalShow(false);
        setSelectedStakedId("");
        ToastShow(
          "error",
          "Transaction Rejected or Something went wrong while unstaking."
        );
        dispatch(stakeTransactionCredential({ txInProgress: false }));
      });
  };

  const handleEmergencyClaimUnstake = (index: any, id: any) => {
    if (!isAllowedChainSelected()) return;
    if (txInProgress)
      return ToastShow("info", "Transaction is Already in progress");
    let message1: any;
    let Title: any;
    setLoader("EmergencyClaim");
    setModalShow(true);
    setSelectedStakedId(id);

    message1 = `Do you want to CLIAM Unstake?`;
    let message2 = "After confirm, you will recieve Land & Genesis.";
    let message3 = "（Gas fee is required.）";

    Title = "CLAIM UNSTAKE";

    setModalData({
      title: Title,
      message1: message1,
      text1: message2,
      text2: message3,
      btnText: "Cancel",
      unstakeBtnText: "Confirm",
      modalFor: "EMERGENCY_and_ClAIM",
    });
  };

  const claimStakedLand = async () => {
    dispatch(stakeTransactionCredential({ txInProgress: true }));
    setModalShow(false);
    const landStakingContractObj = new LandStakingContractSevice(provider);
    landStakingContractObj
      .claimUnStakedLand(addresses, selectedStakedId)
      .then((applyUnstakeClaim: any) => {
        if (applyUnstakeClaim) {
          ToastShow("success", "Unstaked successfully !");
          dispatch(stakeTransactionCredential({ txInProgress: false }));
          getUnstakeHistory();
          landStakeHistory();
          UserGenesisDataForStake();
          UserLandDataForStake();
          getEarnedTickets();
          getEarnedTicketsPerDay();
          setSelectedStakedId("");
          setModalShow(false);
          handleTabChange("stakeHistory");
          setActiveTab("stakeHistory");
        }
      })
      .catch((err: any) => {
        setModalShow(false);
        setSelectedStakedId("");
        ToastShow(
          "error",
          "Transaction Rejected or Something went wrong while unstaking."
        );
        dispatch(stakeTransactionCredential({ txInProgress: false }));
      });
  };

  const getTreasureRewards = () => {
    if (!userConnected && !addresses) return;
    fetch(
      `${process.env.NEXT_PUBLIC_API_V1_ENDPOINT}/staking/get-user-staking-nft-rewards?user=${addresses}&id=${treasureActiveTab}`
    )
      .then((res: any) => res.json())
      .then((res: any) => {
        if (res?.data?.reward?.length > 0) {
          const data = res?.data?.reward;
          const TreasureDataCall: any[] = [];
          let TreasureContractObj = new TreasureContractSevice(
            process.env.NEXT_PUBLIC_RPC_XANA,
            TreasureContract.address
          );
          data.forEach((element: any) => {
            TreasureDataCall.push(
              TreasureContractObj?.CollectionOwner(element?.nftId)
            );
          });

          if (TreasureDataCall.length > 0) {
            Promise.allSettled([...TreasureDataCall])
              .then((res: any) => {
                const filteredDataUnclaimed = data.filter(
                  (item: any, index: any) => {
                    return (
                      res[index]?.status == "fulfilled" &&
                      item?.user.toLowerCase() ==
                        res[index]?.value.toLowerCase()
                    );
                  }
                );

                const filteredDataClaimed = data.filter(
                  (item: any, index: any) => {
                    return res[index]?.status == "rejected";
                  }
                );
                const cycle = landAllCycles[currentCycle];
                const tempTreasure = Object.keys(cycle).map((item) => {
                  return {
                    ...cycle[item],
                    rewards: filteredDataUnclaimed?.filter(
                      (a: { reward: string }) => a?.reward == item
                    ),
                    hasClaimed: filteredDataClaimed?.filter(
                      (a: { reward: string }) => a?.reward == item
                    ),
                    key: item,
                  };
                });
                setTreasure(tempTreasure);
              })
              .catch(() => {
                return false;
              });
          }
        }
      })
      .catch(() => {
        ConditionalCyclesData();
      });
  };
  const ClaimTreasureReward = async (item: any) => {
    if (userConnected) {
      if (txInProgress == true)
        return ToastShow("info", "Transaction is Already in progress");
      try {
        let estimateGasFee: any, GenesisClaimResponse: any;
        let TreasureContractObj = new TreasureContractSevice(
          provider,
          TreasureContract.address
        );

        let claimNftIds: any = [];

        for (let i = 0; i < item?.length; i++) {
          claimNftIds.push(item[i]["nftId"]);
        }

        let genericAddress =
          selectedTreasureData.key == "genesis"
            ? process.env.NEXT_PUBLIC_NETWORK_TYPE === "testnet"
              ? "0xb14512509d4F02De792B6F520c653a193F68D6B3"
              : "0xdff698b9fdb5113a061e0c1ffcbdcba3f2040efc"
            : selectedTreasureData.key == "land"
            ? process.env.NEXT_PUBLIC_NETWORK_TYPE === "testnet"
              ? "0x2Ff2B5f314662CFdFA8bB070AeA96d53d21DeD37"
              : "0x932F97A8Fd6536d868f209B14E66d0d984fE1606"
            : "";
        const nft =
          selectedTreasureData.key === "land"
            ? item[0].landNFT
            : selectedTreasureData.key === "genesis"
            ? item[0].genesisNFT
            : "";

        if (
          selectedTreasureData.key == "genesis" ||
          selectedTreasureData.key == "land"
        ) {
          estimateGasFee = await fetch(
            `${process.env.NEXT_PUBLIC_API_V1_ENDPOINT}/xanaGenesis/estimate-transfer-fee?contractAddr=${genericAddress}&tokenId=${nft}&toAddr=${addresses}`
          ).then((res) => res.json());
          const gasFee = estimateGasFee.data * item.length;

          if (estimateGasFee) {
            GenesisClaimResponse = await TreasureContractObj.ClaimGenesisReward(
              claimNftIds,
              web3.utils.toWei(gasFee.toString(), "ether"),
              addresses
            );
          }
        } else if (selectedTreasureData.key == "xanaGenesisAnimation") {
          GenesisClaimResponse =
            await TreasureContractObj.animationClaimGenesisReward(
              item.nftId,
              pluginData[0]?.tokenId,
              addresses
            );
        } else if (
          selectedTreasureData.key == "avatar" ||
          selectedTreasureData.key == "xanaSneakerz"
          // selectedTreasureData.key === "NFTDualPack" ||
          // selectedTreasureData.key === "NFTDualCard"
        ) {
          GenesisClaimResponse = await TreasureContractObj.ClaimTreasureReward(
            claimNftIds,
            web3.utils.toWei("2", "ether"),
            addresses
          );
        }

        if (GenesisClaimResponse) {
          getTreasureRewards();
          ToastShow(
            "success",
            "Transaction Successfull Please Wait for a while"
          );
          setLoader("");
          setShow(false);
          setLoader("");
          getOwnedGenesis();
          setSelectedPlugin("Select your Genesis to apply plugin");
          dispatch(stakeTransactionCredential({ txInProgress: false }));
        } else {
          setLoader("");
          getOwnedGenesis();
          getTreasureRewards();
          setSelectedPlugin("Select your Genesis to apply plugin");
          dispatch(stakeTransactionCredential({ txInProgress: false }));
        }
      } catch (err) {
        setLoader("");
        getTreasureRewards();
        getOwnedGenesis();
        setSelectedPlugin("Select your Genesis to apply plugin");
        dispatch(stakeTransactionCredential({ txInProgress: false }));
      }
    } else {
      ToastShow("info", "please Connect to your wallet");
    }
  };

  const handleConfirm = () => {
    if (selectedTreasureData) {
      if (
        selectedTreasureData.key == "xanaGenesisAnimation" &&
        selectedPlugin == "Select your Genesis to apply plugin"
      ) {
        return ToastShow("info", "Please select the nft to apply this plugin ");
      }
      if (selectedTreasureData.key == "genesis") {
        ClaimTreasureReward(selectedTreasureData.rewards);
        setLoader("genesis");
      } else if (selectedTreasureData.key == "land") {
        ClaimTreasureReward(selectedTreasureData.rewards);
        setLoader("land");
      } else if (selectedTreasureData.key == "xanaGenesisAnimation") {
        ClaimTreasureReward(selectedTreasureData.rewards[0]);
        setLoader("xanaGenesisAnimation");
      } else if (selectedTreasureData.key == "avatar") {
        ClaimTreasureReward(selectedTreasureData.rewards);
        setLoader("avatar");
      } else if (selectedTreasureData.key == "xanaSneakerz") {
        ClaimTreasureReward(selectedTreasureData.rewards);
        setLoader("xanaSneakerz");
        // } else if (selectedTreasureData.key == "NFTDualPack") {
        //   ClaimTreasureReward(selectedTreasureData.rewards);
        //   setLoader("NFTDualPack");
        // } else if (selectedTreasureData.key == "NFTDualCard") {
        //   ClaimTreasureReward(selectedTreasureData.rewards);
        //   setLoader("NFTDualCard");
      } else {
        setSelectedTreasureData("");
        setShow(false);
        setLoader("");
      }
    }
  };

  const treasureOpen = (data: any) => {
    if (!isAllowedChainSelected("treasure")) return;
    setSelectedTreasureData(data);
    setSelectedPlugin("Select your Genesis to apply plugin");
    setShow(true);
    if (
      (data.key == "genesis" && txInProgress) ||
      (data.key == "avatar" && txInProgress) ||
      (data.key == "land" && txInProgress) ||
      (data.key == "xanaSneakerz" && txInProgress) ||
      (data.key == "xanaGenesisAnimation" && txInProgress)
    ) {
      setLoader(data.key);
    }
  };

  const getOwnedGenesis = () => {
    // 0x907c64c3f0ddacb8ae322f1367ee07e748e2ba15
    if (userConnected) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/xana-genesis-chat/my-genesis-data?user_address=${addresses}`
        )
        .then((response: any) => {
          const result = response?.data?.count;
          if (result > 0) {
            setGenesisData(response?.data?.list);
          } else {
            setGenesisData("");
          }
        });
    }
  };

  const teasureClose = () => {
    if (
      loaderFor === "genesis" ||
      loaderFor === "avatar" ||
      loaderFor == "land" ||
      loaderFor == "xanaSneakerz" ||
      loaderFor == "xanaGenesisAnimation"
    ) {
      if (!txInProgress) {
        setSelectedTreasureData("");
        setLoader("");
      }
      setShow(false);
    } else {
      setSelectedTreasureData("");
      setLoader("");
      setShow(false);
    }
  };

  const hideModal = () => {
    setModalShow(false);
    setSelectedStakedId("");
    setModalData({});
    setStakeBtnLoader(false);
  };

  const UserLandDataForStake = () => {
    // 0x907c64c3f0ddacb8ae322f1367ee07e748e2ba15
    if (userConnected) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/staking/get-land-owned-nonsale?address=${addresses}&mode=${process.env.NEXT_PUBLIC_NETWORK_TYPE}`
        )
        .then((response: any) => {
          const result = response?.data?.count;
          if (result > 0) {
            setUserLand(response?.data?.list.reverse());
          } else {
            setUserLand("");
          }
        });
    }
  };

  const UserGenesisDataForStake = () => {
    // 0x907c64c3f0ddacb8ae322f1367ee07e748e2ba15
    if (userConnected) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/staking/get-genesis-owned-nonsale?address=${addresses}&mode=${process.env.NEXT_PUBLIC_NETWORK_TYPE}`
        )
        .then((response: any) => {
          const result = response?.data?.count;
          if (result > 0) {
            setUserGenesis(response?.data?.list);
          } else {
            setUserGenesis("");
          }
        });
    }
  };

  const getNftNameDisp = (name: any) => {
    const tempArr = name.split(" ");
    if (tempArr.length > 3) {
      return (
        <>
          <span className="designation">{tempArr[3]}</span>
        </>
      );
    }
  };

  return (
    <>
      <Container className="landStakeUI" id="home">
        <Row className="ticket-row mx-0">
          <LandCards
            Title="TICKET EARNED"
            cardFor="land"
            Subtitle={
              userConnected &&
              ruffleCheck &&
              currentCampaign.campaignId &&
              currentCampaign.campaignId.toString() ===
                ruffleCheck[0]?.params?.campaignId &&
              ruffleCheck[0]?.totalTickets > 0
                ? "Already Consumed"
                : earnedTickets && earnedTickets > 0
                ? earnedTickets
                : "0"

              // earnedTickets && userConnected
              //   ? insertComma(earnedTickets)
              //   : ruffleCheck &&
              //     ruffleCheck[0]?.Tickets > 0 &&
              //     userConnected
              //   ? "Already Consumed"
              //   : "0"
            }
          />
          <LandCards
            cardFor="land"
            Title="TICKET EARN / DAY"
            Subtitle={
              userConnected && earnedTicketsPerDay
                ? `+ ${insertComma(earnedTicketsPerDay)}`
                : "+ 0"
            }
          />

          {currentCampaign?.startTime &&
          currentCampaign?.startTime > new Date().getTime() ? (
            <LandCards
              Title="NEXT EVENT START"
              cardFor="land"
              Subtitle={<Countdown expiryTime={currentCampaign.startTime} />}
            />
          ) : currentCampaign?.endTime &&
            currentCampaign?.endTime > new Date().getTime() ? (
            <LandCards
              cardFor="land"
              Title="NEXT RAFFLE"
              Subtitle={<Countdown expiryTime={currentCampaign.endTime} />}
            />
          ) : currentCampaign?.ruffleTime &&
            currentCampaign?.ruffleTime > new Date().getTime() ? (
            <LandCards
              cardFor="land"
              claimTicket={() => claimTicket()}
              Subtitle={<Countdown expiryTime={currentCampaign.ruffleTime} />}
              earnedTickets={parseInt(earnedTickets)}
              Title={`${
                ruffleCheck &&
                currentCampaign.campaignId &&
                currentCampaign.campaignId.toString() ===
                  ruffleCheck[0]?.params?.campaignId &&
                ruffleCheck[0]?.totalTickets > 0
                  ? "JOINED RAFFLE!"
                  : "JOIN RAFFLE"
              }`}
              txInProgress={claimload}
            />
          ) : (
            <LandCards
              Title="NEXT EVENT START"
              cardFor="land"
              Subtitle={"00:00:00:00"}
            />
          )}
        </Row>

        <Row className="staking-row stake-land mx-0">
          <Col md={7} className="staking-input-col">
            <Form>
              <div className="input-wrapper">
                <div className="land-wr">
                  <div className="stake-land-dd-wrap">
                    <div className="input-inner-text stake-land-dd">
                      <span className="ticket-per-day small-text">
                        {landOption.rarity &&
                          landOption.x_coords &&
                          landOption.y_coords &&
                          " + " + ticketsPerDay + "  TICKET PER DAY "}
                      </span>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {check ? (
                            <span className="default-text">
                              SELECT YOUR XANA :LAND
                            </span>
                          ) : (
                            <span className="select-option-text">
                              {landOption.x_coords},{landOption.y_coords}{" "}
                              <span className="rarity">
                                {landOption.rarity}
                              </span>
                            </span>
                          )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dd-menu-wr">
                          {userLand && userLand.length > 0 ? (
                            userLand.map((value: any, i: any) => {
                              return (
                                <Dropdown.Item key={i}>
                                  <div
                                    className={`${
                                      landOption.tokenId === value.tokenId
                                        ? "item-inner active"
                                        : "item-inner"
                                    }`}
                                  >
                                    <div className="first-content">
                                      <img
                                        className="right-icon "
                                        src="https://ik.imagekit.io/xanalia/xana/right.svg"
                                        alt="Right icon"
                                      />
                                      <div
                                        className="item-text "
                                        onClick={() => landSelectHandler(value)}
                                      >
                                        <h4>
                                          {value.rarity} ({value.tokenId})
                                          <span className="right-side-text">
                                            {value.plotSize +
                                              "x" +
                                              value.plotSize}
                                          </span>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </Dropdown.Item>
                              );
                            })
                          ) : (
                            <Dropdown.Item>
                              <div className="item-inner">
                                <div className="first-content">
                                  <img
                                    className="right-icon"
                                    src="https://ik.imagekit.io/xanalia/xana/right.svg"
                                    alt="Right icon"
                                  />
                                  <div className="item-text">
                                    <h4>You Have No Land !</h4>
                                  </div>
                                </div>
                              </div>
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="land-bottom-text">
                      <p className="small-text">
                        Now Staking {landOption.rarity ? landOption.rarity : 0}{" "}
                        {landOption.plotSize + "x" + landOption.plotSize} Land
                        with {selectedGenesis && selectedGenesis.length} Genesis
                      </p>
                    </div>
                  </div>

                  <div className="stake-land-dd-wrap">
                    <div className="input-inner-text stake-land-dd single-child">
                      <div className="input-field">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            {checkgenesis ? (
                              <span className="default-text">
                                SELECT YOUR XANA :Genesis
                              </span>
                            ) : (
                              <div className="pp-wrap">
                                {selectedGenesis &&
                                  selectedGenesis?.map((item: any) => (
                                    <img
                                      src={item.smallImage}
                                      alt="NFT Profile"
                                    />
                                  ))}
                              </div>
                            )}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dd-menu-wr">
                            {userGenesis && userGenesis.length > 0 ? (
                              userGenesis.map((value: any, i: any) => {
                                return (
                                  <Dropdown.Item
                                    key={i}
                                    onClick={() =>
                                      landSelectHandlerGenesis(value)
                                    }
                                  >
                                    <div
                                      className={`${
                                        selectedGenesis.find(
                                          (item: any) =>
                                            item.tokenId === value.tokenId
                                        )
                                          ? "item-inner active"
                                          : "item-inner"
                                      }`}
                                    >
                                      <div className="first-content">
                                        <img
                                          className="right-icon"
                                          src="https://ik.imagekit.io/xanalia/xana/right.svg"
                                          alt="Right icon"
                                        />
                                        <img
                                          src={`${
                                            value.smallImage
                                              ? value.smallImage
                                              : `https://ik.imagekit.io/xanalia/xana/right.svg`
                                          }`}
                                          alt="nft profile"
                                          className="nft-pp"
                                        />
                                        <div className="item-text">
                                          <h4>
                                            #{value.tokenId}
                                            <span>
                                              {getNftNameDisp(value.name)}
                                            </span>
                                          </h4>
                                        </div>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                );
                              })
                            ) : (
                              <Dropdown.Item>
                                <div className="item-inner">
                                  <div className="first-content">
                                    <img
                                      className="right-icon"
                                      src="https://ik.imagekit.io/xanalia/xana/right.svg"
                                      alt="Right icon"
                                    />

                                    <div className="item-text">
                                      <h4>You have no Genesis !</h4>
                                    </div>
                                  </div>
                                </div>
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Col>
          <Col md={5} className="stack-btn-col width-fix">
            <div className="stake-now-btn-wrapper">
              <div className="stake-now-btn-inner">
                {stakeBtnLoader ? (
                  <Button>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Button>
                ) : (
                  <Button
                    disabled={
                      landOption.rarity &&
                      landOption.size &&
                      selectedGenesis.length > 0
                        ? false
                        : true
                    }
                    onClick={() => StakeLand()}
                  >
                    Stake Land
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="history-row">
          <Col className="history-col mx-auto col-lg-10 col-md-12 col-sm-10 col-11">
            <Row className="align-items-baseline history-title-row">
              <Col
                id="tab"
                className="col-12 col-md-9 col-lg-10 col-sm-10 px-0 tab-col"
              >
                <TabComponent
                  activeKey={activeTab}
                  tabOptions={landStakingTabConfig}
                  onChangeTab={handleTabChange}
                />
              </Col>
            </Row>

            {activeTab === "stakeHistory" &&
              landStakedHistory &&
              userConnected &&
              landStakedHistory
                .slice(indexOfFirstPost, indexOfLastPost)
                .sort((a: any, b: any) => (a.stakedAt > b.stakedAt ? -1 : 1))
                .map((data: any) => (
                  <Row>
                    <Col className="col-12">
                      <div className="unstack-wrapper land-tab2-wrapper">
                        <Row className="staking-his">
                          <Col md={3} sm={4} className="custom-col">
                            <h3 className="small-text">Staking Date</h3>
                            <h4 className="heading-4">
                              {`${dateUtils(data.stakedAt)}`}
                            </h4>
                          </Col>

                          <Col md={4} sm={4} className="custom-col">
                            <h3 className="small-text">
                              {" "}
                              Land Token Id / Rarity / Size
                            </h3>
                            <h4 className="heading-4">
                              {data.tokenId} / {data.rarity} / {data.size}x
                              {data.size}
                            </h4>
                          </Col>

                          <Col md={2} sm={4} className="custom-col">
                            <h3 className="small-text">NO. XANA: GENENSIS</h3>
                            <h4 className="heading-4">
                              {data?.genesisTokenIds?.length}
                            </h4>
                          </Col>

                          <Col className="btn-col">
                            <Button
                              className="stk-btn"
                              onClick={() => apply(data)}
                            >
                              {selectedStakedId === data.id ? (
                                <Spinner
                                  animation="border"
                                  role="status"
                                  style={{ width: "40px", height: "40px" }}
                                />
                              ) : (
                                "APPLY UNSTAKE"
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                ))}

            {activeTab === "unStakeHistory" &&
              landUnStakedHistory &&
              userConnected &&
              landUnStakedHistory
                ?.slice(indexOfFirstPost, indexOfLastPost)
                // .sort((a: any, b: any) => b.stakedAt - a.stakedAt)
                .map((data: any, index: any) =>
                  data.isAppliedFor ? (
                    <Row key={index}>
                      <Col className="col-12">
                        <div className="unstack-wrapper land-tab2-wrapper">
                          <Row className="unstake-his">
                            <Col md={3} sm={5} className="custom-col">
                              <div className="date-holder">
                                <h3 className="small-text">Stake</h3>
                                <h4 className="heading-4">
                                  {data.stakedAt && dateUtils(data.stakedAt)}
                                </h4>
                              </div>
                              <div className="date-holder">
                                <h3 className="small-text">Apply</h3>
                                <h4 className="heading-4">
                                  {data.appliedAt && dateUtils(data.appliedAt)}
                                </h4>
                              </div>
                            </Col>

                            <Col md={4} sm={5} className="custom-col">
                              <h3 className="small-text">
                                {" "}
                                Land Token Id / Rarity / Size
                              </h3>
                              <h4 className="heading-4">
                                {data.tokenId} / {data.rarity} / {data.size}x
                                {data.size}
                              </h4>
                            </Col>

                            <Col md={2} sm={2} className="custom-col">
                              <h3 className="small-text">NO. XANA: GENENSIS</h3>
                              <h4 className="heading-4">
                                {data.genesisTokenIds.length}
                              </h4>
                            </Col>

                            <Col className="btn-col">
                              <Button
                                className="stk-btn"
                                disabled={!emergencyClaimCheck[index]}
                                onClick={() =>
                                  handleEmergencyClaimUnstake(index, data.id)
                                }
                              >
                                {selectedStakedId === data.id ? (
                                  <Spinner animation="border" role="status" />
                                ) : (
                                  "Claim UnStake"
                                )}
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row key={index}>
                      <Col className="col-12">
                        <div className="unstack-wrapper staking-history-wr tax-bonus-wr landWrap">
                          <Row className="tax-bonus-row unstaking-his-row">
                            <Col
                              sm={3}
                              className="custom-col claim-col claim-modification text-sm-start"
                            >
                              <h3 className="small-text">Staking Date</h3>
                              <h4 className="heading-4">
                                {`${dateUtils(data.stakedAt)}`}
                              </h4>
                            </Col>
                            <Col sm={3} className="custom-col text-sm-start">
                              <h3 className="small-text">UnStake Date</h3>
                              <h4 className="heading-4">
                                {dateUtils(data.unStakedAt)}
                              </h4>
                            </Col>

                            <Col sm={3} className="custom-col text-sm-start">
                              <h3 className="small-text">
                                Land Token Id / Rarity / Size{" "}
                              </h3>
                              <h4 className="heading-4">
                                {data.tokenId} / {data.rarity} / {data.size}x
                                {data.size}
                              </h4>
                            </Col>

                            <Col sm={3} className="custom-col text-sm-start">
                              <h3 className="small-text">
                                NO. XANA: GENENSIS{" "}
                              </h3>
                              <h4 className="heading-4">
                                {data.genesisTokenIds.length}
                              </h4>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  )
                )}

            {activeTab === "rewards" &&
              rewardsData &&
              userConnected &&
              rewardsData
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((data: any, index: any) => (
                  <>
                    <Row key={index}>
                      <Col className="col-12">
                        <div className="unstack-wrapper rewards-wr">
                          <Form>
                            <div className="form-inner">
                              <h4 className="stacking-name heading-4">
                                #{data.params && data.params.campaignId}
                              </h4>

                              <div className="chain-outer-wr">
                                <div className="add-wr">
                                  <h5 className="time-text start-time-text">
                                    START
                                  </h5>

                                  <Form.Control
                                    type="number"
                                    className="stacking-id"
                                    placeholder={
                                      data.startTime &&
                                      dateUtils(data.startTime * 1000)
                                    }
                                    disabled={true}
                                  />
                                </div>

                                <div className="add-wr">
                                  <h5 className="time-text end-time-text">
                                    END
                                  </h5>
                                  <Form.Control
                                    type="number"
                                    className="stacking-id"
                                    placeholder={
                                      data.endTime &&
                                      dateUtils(data.endTime * 1000)
                                    }
                                    disabled={true}
                                  />
                                </div>
                              </div>

                              <div className="point-wr">
                                <h3 className=" point-text">
                                  {data.totalTickets &&
                                    insertComma(data.totalTickets)}
                                  <span>TICKET</span>
                                </h3>

                                {releaseCheck[index] &&
                                data.ticket_distribute > 0 ? (
                                  <h3 className="point-text">
                                    {data.ticket_distribute}
                                    <span> Treasure Box</span>
                                  </h3>
                                ) : data.ticket_distribute === 0 ? (
                                  <h3 className="point-text">
                                    {data.ticket_distribute}
                                    <span> Treasure Box</span>
                                  </h3>
                                ) : null}
                              </div>
                            </div>

                            <Button
                              disabled={
                                releaseCheck[index]
                                  ? isClaimed[data.params.campaignId - 1]?.nft >
                                    0
                                    ? true
                                    : data.ticket_distribute > 0
                                    ? false
                                    : true
                                  : true
                              }
                              className="claim-reward-btn"
                              onClick={() => handleRewardClaim(data)}
                            >
                              {isClaimed[data.params.campaignId - 1]?.nft >
                              0 ? (
                                "Claim Completed"
                              ) : selectedStakedId ===
                                data?.params?.campaignId ? (
                                <Spinner animation="border" role="status" />
                              ) : (
                                "Claim Reward"
                              )}
                            </Button>
                          </Form>
                        </div>
                      </Col>
                    </Row>
                  </>
                ))}
          </Col>
        </Row>

        {currentTabData && currentTabData.length > 0 && userConnected ? (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={currentTabData?.length}
            paginate={paginate}
            currentPage={currentPage}
            paginateBack={paginateBack}
            paginateFront={paginateFront}
          />
        ) : (
          ""
        )}
      </Container>

      {modalShow && (
        <UnstakeModalMsg
          show={modalShow}
          hide={() => hideModal()}
          modalData={modalData}
          loaderFor={loaderFor}
          genesisData=""
          handleSelectoption=""
          selectedPlugin=""
          onConfirm={
            modalData.modalFor === "APPLY_For_UNSTAKE"
              ? applyForLandUnstake
              : modalData.modalFor === "EMERGENCY_and_ClAIM"
              ? claimStakedLand
              : modalData.modalFor === "claimReward"
              ? claimReward
              : ""
          }
        />
      )}

      <section className="treasure">
        <Container className="px-0">
          <Row className="homepage-title mx-0 my-0">
            <Col className="text-center px-0">
              <h1 className="heading-1">Treasure</h1>
            </Col>
          </Row>

          <Row className="ticket-row treasure-box-row mx-0 treasure-tabs custom-border">
            <Col className="col-12 Slick-Slider-Container">
              <Slider {...settings}>
                {landAllCycles.cycles.map((tab, index) => (
                  <div
                    className={`custom-tab-button ${
                      treasureActiveTab === tab.key ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      setTreasureActiveTab(tab.key), setCurerntCycle(tab.cycle);
                    }}
                  >
                    {tab.title}
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>

          <Row className="ticket-row treasure-box-row mx-0 treasure-cards">
            {treasure &&
              treasure?.map((data: any) => (
                <>
                  {/* {data.rewards.length > 0 */}

                  {data.rewards.length > 0
                    ? closeBoxes(data, false, data.rewards.length, true)
                    : data?.hasClaimed && data?.hasClaimed?.length > 0
                    ? closeBoxes(data, true, 0, false)
                    : closeBoxes(data, false, 0, false)}
                </>
              ))}
          </Row>
          {selectedTreasureData && (
            <UnstakeModalMsg
              show={
                selectedTreasureData?.cycle === 8 &&
                selectedTreasureData.key === "xanaPenpenzWhitelist"
                  ? !show
                  : show
              }
              hide={() => teasureClose()}
              modalData={selectedTreasureData}
              onConfirm={() => handleConfirm()}
              loaderFor={loader}
              genesisData={genesisData}
              handleSelectoption={handleSelectoption}
              selectedPlugin={selectedPlugin}
            />
          )}
          <StimulationChart
            cycle={currentCampaign?.campaignId}
            chartFor={"land"}
          />
        </Container>
      </section>

      <WorkInstructions />
    </>
  );
}

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import { dateUtils } from "../../../Utils/dateUtils";
import { stakeTransactionCredential } from "../../../store/web3/stakeTransaction";
import { XanaStakingContractSevice } from "../../../services/XanaStakingContract.service";
import UnstakeModalMsg from "../../UnstakeModalMsg/modal";
import TabComponent from "../../Tab/tab";
import { trimZeroFromTheEnd } from "../../../Utils/trimZeroFromValue";
import { insertComma } from "../../../Utils/insertComma";
import Pagination from "../../Pagination/pagination";
import { TreasureContractSevice } from "../../../services/TreasureContract.sevice";
import { useWeb3React } from "@web3-react/core";
import Cards from "../../Card/Cards";
import Countdown from "../../Counter/countDown";
import ToastShow from "../../../Utils/toastShow";
import { xetaStakingTabConfig } from "../../Configs/config";

import { setChainErrorMsg } from "../../../store/web3/selectedNetwork";
import { setModalNetwork } from "../../../store/web3/walletSlice";
import WorkInstructions from "../../WorkInstruction/Xeta/workInstructions";
import Slider from "react-slick";
import allCycles from "../../Cycles/xetaStakingCycle/allCycles";
import StimulationChart from "../../StimulationChart/stimulationChart";
import { TreasureContract } from "../../Common/TreasureBoxContract";

interface ICampaignObj {
  campaignId?: number;
  endTime?: number;
  rewardCount?: number;
  startTime?: number;
  coolDownTime?: number;
  nextSnapShotTime?: number;
  ruffleTime?: number;
}
export default function XetaStaking() {
  const { library }: any = useWeb3React();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
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

  // const addresses = useSelector(
  //   (state: any) => state.persistedReducer.providerReducer.address
  // );
  // const provider = useSelector(
  //   (state: any) => state.persistedReducer.providerReducer.provider
  // );
  // const userConnected = useSelector(
  //   (state: any) => state.persistedReducer.reducer.userConnected
  // );

  const chain = useSelector((state: any) => state.wallet.chainId);

  const { address: connectedAddress } = useSelector(
    (state: any) => state.wallet
  );

  const { userConnected } = useSelector((state: any) => state.user);

  const { address: addresses, provider } = useSelector(
    (state: any) => state.providerReducer
  );

  const txInProgress = useSelector(
    (state: any) => state.stakeTransactionReducer.txInProgress
  );

  const curentTabObj = useSelector(
    (state: any) => state.mainTabReducer.currentTab
  );

  const [minimumStakingLimit, setMinimumStakingLimit] = useState(100);
  const [currentCampaign, setCurrentCampaign] = useState<ICampaignObj>({});
  const [ticket, setTicket] = useState("");
  const [ticketsPerDay, setTicketsPerDay] = useState(0);
  const [xetaBalance, setXetaBalance]: any = useState(0);
  const [earnedTickets, setEarnedTickets]: any = useState();
  const [earnedTicketsPerDay, setEarnedTicketsPerDay] = useState("");
  const [modalShow, setModalShow]: any = useState(false);
  const [rewardsData, setRewardsData]: any = useState([]);
  const [limitCheck, setLimitCheck]: any = useState("");
  const [isLoading, setIsLoading]: any = useState(false);
  const [loader, setLoader]: any = useState("");
  const [selectedStakedId, setSelectedStakedId]: any = useState("");
  const [claimload, setClaimLoad] = useState(false);
  const [isClaimable, setIsClaimable] = useState(false);
  const [modalData, setModalData]: any = useState({});
  const [activeTab, setActiveTab] = useState("stakeHistory");
  const [treasureActiveTab, setTreasureActiveTab] = useState(
    allCycles?.cycles[0]?.key
  );
  const [currentCycle, setCurerntCycle]: any = useState(
    allCycles?.cycles[0]?.cycle
  );
  const [releaseCheck, setReleaseCheck]: any = useState([]);
  const [claimable, setClaimable]: any = useState(0);
  const [genesisData, setGenesisData]: any = useState("");
  const [voiceGenesisData, setVoiceGenesisData]: any = useState("");
  const [pluginData, setPluginData]: any = useState("");
  const [claimLoading, setClaimLoading] = useState(false);
  const [unStakedData, setUnStakedData]: any = useState("");
  const [stakedData, setStakedData]: any = useState("");
  const [rewardArr, setRewardArr]: any = useState([]);
  const [penaltyData, setPenaltyData]: any = useState("");
  const [ruffleCheck, setRufffleCheck]: any = useState([]);
  const [emergencyClaimCheck, setEmergencyClaimCheck]: any = useState("");
  const [treasure, setTreasure]: any = useState();
  const [time, setTime] = useState(0);
  const [loaderFor, setLoaderFor]: any = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [show, setShow] = useState(false);
  const [currentTabData, setCurrentTabData]: any = useState([]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const [selectedTreasureData, setSelectedTreasureData]: any = useState({
    title: "",
    title1: "",
    message1: "",
    btnText: "Cancel",
    unstakeBtnText: "Confirm",
    modalFor: "treasure",
  });
  let timeout: any;

  const dispatch = useDispatch();
  const web3 = new Web3(provider);
  const [selectedPlugin, setSelectedPlugin]: any = useState(
    "Select your Genesis to apply plugin"
  );

  const isAllowedChainSelected = () => {
    if (!userConnected)
      return document.getElementById("walletConnectModal").click();

    if (chain !== curentTabObj.chain) {
      dispatch(setModalNetwork(true));
      dispatch(setChainErrorMsg(curentTabObj.message));
      return false;
    }
    return true;
  };

  const handleSelectoption = (event: any, key: any) => {
    if (key === "xanaGenesisVoice") {
      if (event.target.name) {
        const TokenId = voiceGenesisData?.filter(
          (item: any) => item.id == event.target.name
        );
        setPluginData(TokenId);
        setSelectedPlugin(TokenId[0]?.name);
      } else {
        setSelectedPlugin("Select your Genesis to apply plugin");
      }
    } else {
      if (event.target.name) {
        const TokenId = genesisData?.filter(
          (item: any) => item.id == event.target.name
        );
        setPluginData(TokenId);
        setSelectedPlugin(TokenId[0]?.name);
      } else {
        setSelectedPlugin("Select your Genesis to apply plugin");
      }
    }
  };

  const ConditionalCyclesData = () => {
    const data = allCycles[currentCycle];
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
  useEffect(() => {
    timeout = setInterval(() => {
      setTime((time) => time + 1);
    }, 4000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  useEffect(() => {
    if (addresses && userConnected) {
      getEarnedTickets();
      getEarnedTicketsPerDay();
      getClaimableTokens();
      getClaimableRewards();
      getEmergencyClaimable();
    }
  }, [time]);

  useEffect(() => {
    if (addresses && userConnected) {
      fetchUserStats();
      getTreasureRewards();
      getClaimableRewards();
      getOwnedGenesis();
      getOwnedVoiceGenesis();
    }
  }, [addresses]);

  useEffect(() => {
    getCurrentCampaignDetails();
    fetchUserStats();
    getOwnedGenesis();
    getOwnedVoiceGenesis();
    getClaimableTokens();
    getEmergencyClaimable();
    ConditionalCyclesData();
  }, [curentTabObj?.key]);

  useEffect(() => {
    if (addresses && userConnected) {
      getTreasureRewards();
      getOwnedGenesis();
      getOwnedVoiceGenesis();
    }
  }, [treasureActiveTab]);

  useEffect(() => {
    ConditionalCyclesData();
  }, [treasureActiveTab]);

  useEffect(() => {
    if (addresses && userConnected) {
      fetchUserStats();
    }
  }, [activeTab]);

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
          onClick={() => rewardClaimable == true && teasureOpen(data)}
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

  const fetchUserStats = () => {
    getEarnedTickets();
    getEarnedTicketsPerDay();
    userStakeId();
    getClaimableTokens();
    getEmergencyClaimable();
    checkXetaBalance();
    getUnstakeHistory();
    getClaimableRewards();
    taxPoolHistory();
    getTreasureRewards();
  };

  const handleTabChange = (selectedTab: string) => {
    setCurrentTabData([]);
    if (selectedTab === "stakeHistory") {
      if (
        stakedData &&
        stakedData !== "" &&
        stakedData !== undefined &&
        stakedData.length !== 0
      ) {
        setCurrentTabData(stakedData);
      }
    } else if (selectedTab === "unStakeHistory") {
      getEmergencyClaimable();
      if (
        unStakedData &&
        unStakedData !== "" &&
        unStakedData !== undefined &&
        unStakedData.length !== 0
      ) {
        setCurrentTabData(unStakedData);
      }
    } else if (selectedTab === "rewards") {
      getClaimableRewards();
      if (
        rewardsData &&
        rewardsData !== "" &&
        rewardsData !== undefined &&
        rewardsData.length !== 0
      ) {
        setCurrentTabData(rewardsData);
      }
    } else if (selectedTab === "taxBonus") {
      taxPoolHistory();
      if (
        penaltyData &&
        penaltyData !== "" &&
        penaltyData !== undefined &&
        penaltyData.length !== 0
      ) {
        setCurrentTabData(penaltyData);
      }
    }
    setActiveTab(selectedTab);
  };

  const dateFilter = (data: any) => {
    if (!isAllowedChainSelected()) return;
    if (userConnected) {
      if (txInProgress)
        return ToastShow("info", "Transaction is already in progress.");

      setModalShow(true);
      setSelectedStakedId(data.id);

      let date: any = new Date().getTime();
      let date1 = stakedData?.find((dt: any) => {
        if (dt.id === data.id) {
          return true;
        }
      });

      let message1 = "";
      message1 = `Are you sure you want to “apply” for unstake ?`;
      let message2 = "Must CLAIM 14 days after apply.";
      let message3 = "(Ticket Earned will be lost)";

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

  const getCurrentCampaignDetails = async () => {
    let StakingConObj = new XanaStakingContractSevice(curentTabObj?.rpcUrl);
    let campaignDetail = await StakingConObj.getCurrentCampaignDetails();
    if (campaignDetail !== false) {
      let obj: ICampaignObj = {
        campaignId: parseInt(campaignDetail?.campaignId),
        endTime: parseInt(campaignDetail?.endTime) * 1000,
        rewardCount: parseInt(campaignDetail?.rewardCount) * 1000,
        startTime: parseInt(campaignDetail?.startTime) * 1000,
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

  const getUnstakeHistory = async () => {
    let StakingConObj = new XanaStakingContractSevice(curentTabObj?.rpcUrl);
    let unStakeId = await StakingConObj.getUserUnStakeIds(addresses);
    if (unStakeId !== false) {
      let userUnStakeData: any[] = [];
      const getUnStakeCall: any[] = [];
      let applyUnstake: any = await appliedForUnstakeHistory();
      unStakeId.forEach((element: any) => {
        getUnStakeCall.push(StakingConObj.getUnStake(addresses, element));
      });
      Promise.all([...getUnStakeCall]).then((res) => {
        res.forEach((unStakeRecord: any, index: any) => {
          if (!unStakeRecord) return;
          userUnStakeData.push({
            id: unStakeId[index],
            stakedAt: parseInt(unStakeRecord?.stakedAt) * 1000,
            unStakedAt: parseInt(unStakeRecord?.unStakedAt) * 1000,
            stakedAmount: web3.utils.fromWei(
              unStakeRecord?.stakedAmount.toString(),
              "ether"
            ),
            penalty: web3.utils.fromWei(
              unStakeRecord?.penalty.toString(),
              "ether"
            ),
            isAppliedFor: false,
          });
        });

        if (
          (applyUnstake && applyUnstake.length > 0) ||
          (userUnStakeData && userUnStakeData.length > 0)
        ) {
          setUnStakedData([
            ...applyUnstake?.reverse(),
            ...userUnStakeData?.reverse(),
          ]);
        }
      });
    }
  };

  const getClaimableTokens = async () => {
    let StakingContractObj = new XanaStakingContractSevice(
      curentTabObj?.rpcUrl
    );
    StakingContractObj.getClaimableToken(addresses)
      .then((claimableTokenResponse: any) => {
        if (claimableTokenResponse == false) {
          setClaimable(0);
        } else {
          let parseIntClaim = parseFloat(
            web3.utils.fromWei(claimableTokenResponse)
          );
          setClaimable(
            parseIntClaim !== 0
              ? trimZeroFromTheEnd(parseIntClaim.toFixed(5))
              : 0
          );
        }
      })
      .catch(() => {
        return false;
      });
  };

  const claimPenaltyBonus = async () => {
    if (!isAllowedChainSelected()) return;
    if (userConnected) {
      if (txInProgress)
        return ToastShow("info", "Transaction is already in progress.");
      setClaimLoading(true);
      dispatch(stakeTransactionCredential({ txInProgress: true }));
      let StakingContractObj = new XanaStakingContractSevice(provider);
      StakingContractObj.claimPenaltyBonus(addresses)
        .then((claimPenaltyResponse: any) => {
          if (claimPenaltyResponse !== false) {
            ToastShow("success", "Tax bonus claimed successfully.");
            setClaimLoading(false);
            dispatch(stakeTransactionCredential({ txInProgress: false }));
            fetchUserStats();
          }
        })
        .catch(() => {
          ToastShow(
            "error",
            "Transaction Rejected or Something went wrong while claiming."
          );
          setClaimLoading(false);
          dispatch(stakeTransactionCredential({ txInProgress: false }));
        });
    }
  };

  const getEarnedTickets = async () => {
    let StakingConObj = new XanaStakingContractSevice(curentTabObj?.rpcUrl);
    let ticketResponse = await StakingConObj.getClaimableTickets(addresses);
    if (ticketResponse !== false) {
      const parsedResponse = parseInt(ticketResponse);
      setEarnedTickets(parsedResponse !== 0 ? ticketResponse : "");
    }
  };

  const getEarnedTicketsPerDay = async () => {
    let StakingConObj = new XanaStakingContractSevice(curentTabObj?.rpcUrl);
    let ticketResponse = await StakingConObj.perDayXTicketsUserClaimable(
      addresses
    );
    if (ticketResponse !== false) {
      const parsedResponse = parseInt(ticketResponse);
      setEarnedTicketsPerDay(parsedResponse === 0 ? "0" : ticketResponse);
    }
  };

  const handleStakeXana = async () => {
    let StakingContractObj = new XanaStakingContractSevice(provider);
    StakingContractObj.stakeXanaXeta(
      web3.utils.toWei(ticket.toString(), "ether"),
      addresses
    )
      .then((stakeResponse: any) => {
        if (stakeResponse) {
          ToastShow("success", "Staked successfully !");
          dispatch(stakeTransactionCredential({ txInProgress: false }));
          setTicket("");
          setTicketsPerDay(0);
          setIsLoading(false);
          fetchUserStats();
        }
      })
      .catch((err) => {
        ToastShow("error", "Something went wrong while staking !");
        dispatch(stakeTransactionCredential({ txInProgress: false }));
        setTicket("");
        setIsLoading(false);
      });
  };

  const checkXetaBalance = async () => {
    if (addresses) {
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_XANA;
      const Provider: any = new Web3(rpcUrl);

      const web3 = new Web3(Provider);
      const balance = await web3.eth
        .getBalance(addresses)
        .then((result: any) => {
          setXetaBalance((result / 1e18).toFixed(2));
          return result / 1e18;
        });
      return balance;
    }
  };

  const userBalance = async () => {
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

      if (!txInProgress) {
        if (
          parseInt(ticket) >= minimumStakingLimit &&
          parseInt(ticket) % 100 === 0
        ) {
          dispatch(stakeTransactionCredential({ txInProgress: true }));
          let Xetabalance: any = await checkXetaBalance();

          let bnbBalance: any = web3.utils.fromWei(
            await web3.eth.getBalance(addresses)
          );
          if (
            Xetabalance &&
            parseInt(Xetabalance) >= parseInt(ticket) &&
            parseFloat(bnbBalance) !== 0
          ) {
            handleStakeXana();
            // allowanceTransaction();
            setIsLoading(true);
          } else {
            dispatch(stakeTransactionCredential({ txInProgress: false }));
            ToastShow(
              "error",
              "Your AVAX or XETA balance is less than your staking amount !"
            );
          }
        } else {
          ToastShow(
            "error",
            "Minimum 100 Xeta and multiples of 100 are accepted !"
          );
        }
      } else {
        ToastShow("info", "Transaction is already in progress !");
      }
    }
  };

  const userStakeId = async () => {
    let StakingConObj = new XanaStakingContractSevice(curentTabObj?.rpcUrl);
    let output = await StakingConObj.getUserStakesIds(addresses);
    if (output !== false) {
      const userStakeData: any[] = [];
      const getStakeCall: any[] = [];
      output.forEach((element: any) => {
        getStakeCall.push(StakingConObj.getStakeFromId(addresses, element));
      });
      let claimableAllowed = false;
      await Promise.all([...getStakeCall]).then((res) => {
        res.forEach((stakeRecord: any, index: any) => {
          if (!stakeRecord) return;
          if (parseInt(stakeRecord[1]) > 0) {
            claimableAllowed = true;
          }
          userStakeData.push({
            id: output[index],
            stakedAt: parseInt(stakeRecord?.stakedAt) * 1000,
            stakedAmount: Web3.utils.fromWei(
              stakeRecord?.stakedAmount.toString(),
              "ether"
            ),
          });
        });
        if (userStakeData) {
          setStakedData(userStakeData);
          setCurrentTabData(userStakeData.reverse());
          setIsClaimable(claimableAllowed);
        }
      });
    }
  };

  const unique = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
  };

  useEffect(() => {
    checkReleaseInfo();
  }, [rewardsData]);

  const checkReleaseInfo = async () => {
    let StakingContractObj = new XanaStakingContractSevice(
      curentTabObj?.rpcUrl
    );
    let releaseCheckCall: any[] = [];
    let releaseCheckData: any[] = [];
    rewardsData.forEach((element: any) => {
      releaseCheckCall.push(
        StakingContractObj.releaseCheck(element.campaignId)
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
  const getClaimableRewards = async () => {
    let StakingConObj = new XanaStakingContractSevice(curentTabObj?.rpcUrl);
    const claimRewardsData: any[] = [];
    const rewardsCall: any[] = [];
    if (currentCampaign?.campaignId) {
      for (let i = 1; i <= currentCampaign?.campaignId; i++) {
        rewardsCall.push(StakingConObj.getRewardClaimable(addresses, i));
      }
      await Promise.all([...rewardsCall]).then((res) => {
        res.forEach((claimableReward: any, index: any) => {
          if (!claimableReward) return;
          claimRewardsData.push({
            campaignId: index + 1,
            claimAllowed: claimableReward[0]?.filter(unique).length,
            startTime: parseInt(claimableReward[2]) * 1000,
            endTime: parseInt(claimableReward[3]) * 1000,
            nft: parseInt(claimableReward[4]),
            Tickets: parseInt(claimableReward[5]),
            claim: claimableReward[0].filter(unique),
          });
        });
      });

      if (claimRewardsData) {
        const rewards = claimRewardsData?.filter(
          (item: any) => item.Tickets > 0 || item.nft > 0
        );
        setRufffleCheck(claimRewardsData.reverse());
        setRewardsData(rewards.reverse());
      }
    }
  };

  const hideModal = () => {
    setModalShow(false);
    setSelectedStakedId("");
    setModalData({});
  };

  const validationHandler = (e: any) => {
    let tempNum = new RegExp(/^[0-9]+$/);
    if (tempNum.test(e.target.value) && userConnected) {
      setTicket(e.target.value);
      setTicketsPerDay(
        Math.floor(parseInt(e.target.value) / minimumStakingLimit)
      );
    } else {
      setTicket("");
      setTicketsPerDay(0);
    }
  };

  const claimTicket = () => {
    if (!isAllowedChainSelected()) return;
    if (userConnected) {
      if (txInProgress == true)
        return ToastShow("info", `Transaction is already in Progress !`);
      if (earnedTickets == 0)
        return ToastShow("error", ` You have 0 tickets to Claim !`);
      setClaimLoad(true);
      dispatch(stakeTransactionCredential({ txInProgress: true }));
      let StakingContractObj = new XanaStakingContractSevice(provider);
      StakingContractObj.claimXTickets(addresses)
        .then((stakeResponse: any) => {
          if (stakeResponse) {
            ToastShow("success", "JOIN RUFFLE SUCCESSFULL !");
            dispatch(stakeTransactionCredential({ txInProgress: false }));
            setClaimLoad(false);
            fetchUserStats();
          }
        })
        .catch(() => {
          ToastShow("error", "Something went wrong while JOIN RUFFLE !");
          dispatch(stakeTransactionCredential({ txInProgress: false }));
          setClaimLoad(false);
        });
    }
  };

  const handleRewardClaim = (e: any) => {
    if (!isAllowedChainSelected()) return;
    if (userConnected) {
      if (txInProgress == true)
        return ToastShow("info", "Transaction is Already in progress !");
      setModalShow(true);
      if (e.claim.length > 5) {
        setRewardArr([...e.claim.slice(0, 5)]);
      } else {
        setRewardArr(e.claim);
      }
      if (currentCampaign.campaignId) {
        setLimitCheck(e.claimAllowed);
      }
      setModalData({
        title: "STAKING REWARD",
        message1: "Are you sure you want to claim your staking reward?",
        btnText: "Cancel",
        unstakeBtnText: "Confirm",
        modalFor: "claimReward",
      });
      setSelectedStakedId(e?.campaignId);
    }
  };

  const claimReward = async () => {
    setModalShow(false);
    dispatch(stakeTransactionCredential({ txInProgress: true }));
    let StakingContractObj = new XanaStakingContractSevice(provider);

    StakingContractObj.claimReward(addresses, selectedStakedId, rewardArr)
      .then((unStakeResponse: any) => {
        if (unStakeResponse) {
          ToastShow("success", "Reward claimed successfully !");
          setSelectedStakedId("");
          getClaimableRewards();
          getTreasureRewards();
          dispatch(stakeTransactionCredential({ txInProgress: false }));
        }
      })
      .catch(() => {
        ToastShow(
          "error",
          "Transaction Rejected or Something went wrong while claiming !"
        );
        setSelectedStakedId("");
        dispatch(stakeTransactionCredential({ txInProgress: false }));
      });
  };

  const getTreasureRewards = () => {
    if (!userConnected && !addresses) return;
    fetch(
      `${process.env.NEXT_PUBLIC_API_V1_ENDPOINT}/staking/get-user-staking-rewards?user=${addresses}&id=${treasureActiveTab}`
    )
      .then((res: any) => res.json())
      .then((res: any) => {
        if (res?.data?.reward?.length > 0) {
          const data = res?.data?.reward;
          const TreasureDataCall: any[] = [];
          let TreasureContractObj = new TreasureContractSevice(
            curentTabObj?.rpcUrl,
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
                const cycle = allCycles[currentCycle];
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
        return ToastShow("info", "Transaction is Already in progress !");
      try {
        let estimateGasFee: any, GenesisClaimResponse: any;
        let TreasureContractObj: any = new TreasureContractSevice(
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
            ? item[0]?.landNFT
            : selectedTreasureData.key === "genesis"
            ? item[0]?.genesisNFT
            : "";
            const accumulatedGasFee = 2 * item.length;
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
          selectedTreasureData.key == "xanaSneakerz" ||
          // selectedTreasureData.key === "NFTDualCard" ||
          // selectedTreasureData.key === "NFTDualPack" ||
          selectedTreasureData.key == "astroboyPack" ||
          selectedTreasureData.key === "astroboyOkayamaPack"
        ) {
          GenesisClaimResponse = await TreasureContractObj.ClaimTreasureReward(
            claimNftIds,
            web3.utils.toWei(accumulatedGasFee.toString(), "ether"),
            addresses
          );
        } else if (selectedTreasureData.key == "xanaGenesisVoice") {
          GenesisClaimResponse = await TreasureContractObj.ClaimVoiceReward(
            item.nftId,
            pluginData[0]?.tokenId,
            addresses
          );
        }
        // else if (
        //   selectedTreasureData.key == "Xeny" ||
        //   selectedTreasureData.key === "Xtoken"
        // ) {
        //   GenesisClaimResponse = await TreasureContractObj.ClaimXeny(
        //     claimNftIds,
        //     addresses
        //   );
        // }

        if (GenesisClaimResponse) {
          getTreasureRewards();
          ToastShow(
            "success",
            "Transaction Successfull Please Wait for a while !"
          );
          setLoader("");
          setShow(false);
          setLoader("");
          getOwnedGenesis();
          getOwnedVoiceGenesis();
          setSelectedPlugin("Select your Genesis to apply plugin");
          dispatch(stakeTransactionCredential({ txInProgress: false }));
          return location.reload();
        } else {
          setLoader("");
          getTreasureRewards();
          setSelectedPlugin("Select your Genesis to apply plugin");
          dispatch(stakeTransactionCredential({ txInProgress: false }));
        }
      } catch (err) {
        setLoader("");
        getTreasureRewards();
        setSelectedPlugin("Select your Genesis to apply plugin");
        dispatch(stakeTransactionCredential({ txInProgress: false }));
      }
    } else {
      ToastShow("info", "please Connect to your wallet");
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

  const getOwnedVoiceGenesis = () => {
    // 0x907c64c3f0ddacb8ae322f1367ee07e748e2ba15
    if (userConnected) {
      axios
        .get(
          `${
            process.env.NEXT_PUBLIC_API_ENDPOINT
          }/xana-genesis-chat/owned-data-voice-plugin?user_address=${addresses}&name=${"mainnet"}`
        )
        .then((response: any) => {
          const result = response?.data?.count;
          if (result > 0) {
            setVoiceGenesisData(response?.data?.list);
          } else {
            setVoiceGenesisData("");
          }
        });
    }
  };

  const handleConfirm = () => {
    if (selectedTreasureData) {
      if (
        (selectedTreasureData.key == "xanaGenesisAnimation" ||
          selectedTreasureData.key === "xanaGenesisVoice") &&
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
      } else if (selectedTreasureData.key == "astroboyPack") {
        ClaimTreasureReward(selectedTreasureData.rewards);
        setLoader("astroboyPack");
      } else if (selectedTreasureData.key == "xanaGenesisVoice") {
        ClaimTreasureReward(selectedTreasureData.rewards[0]);
        setLoader("xanaGenesisVoice");
      }
      //  else if (selectedTreasureData.key == "Xeny") {
      //   ClaimTreasureReward(selectedTreasureData.rewards);
      //   setLoader("Xeny");
      // }
      //  else if (selectedTreasureData.key == "Xtoken") {
      //   ClaimTreasureReward(selectedTreasureData.rewards);
      //   setLoader("Xtoken");
      // }
      else if (selectedTreasureData.key == "astroboyOkayamaPack") {
        ClaimTreasureReward(selectedTreasureData.rewards);
        setLoader("astroboyOkayamaPack");
        // } else if (selectedTreasureData.key === "NFTDualPack") {
        //   ClaimTreasureReward(selectedTreasureData.rewards);
        //   setLoader("NFTDualPack");
        // } else if (selectedTreasureData.key === "NFTDualCard") {
        //   ClaimTreasureReward(selectedTreasureData.rewards);
        //   setLoader("NFTDualCard");
      } else {
        setSelectedTreasureData("");
        setShow(false);
        setLoader("");
      }
    }
  };

  const teasureOpen = (data: any) => {
    if (!isAllowedChainSelected()) return;
    setSelectedTreasureData(data);
    if (selectedTreasureData.key === "xanaGenesisVoice") getOwnedVoiceGenesis();
    setSelectedPlugin("Select your Genesis to apply plugin");
    setShow(true);
    if (
      (data.key == "genesis" && txInProgress) ||
      (data.key == "avatar" && txInProgress) ||
      (data.key == "land" && txInProgress) ||
      (data.key == "astroboyPack" && txInProgress) ||
      (data.key == "astroboyOkayamaPack" && txInProgress) ||
      (data.key == "xanaSneakerz" && txInProgress) ||
      (data.key == "xanaGenesisAnimation" && txInProgress) ||
      (data.key == "xanaGenesisVoice" && txInProgress)
      // (data.key == "Xtoken" && txInProgress)||
      // (data.key == "Xeny" && txInProgress)
    ) {
      setLoader(data.key);
    }
  };

  const teasureClose = () => {
    if (
      loaderFor === "genesis" ||
      loaderFor === "avatar" ||
      loaderFor === "astroboyPack" ||
      loaderFor === "xanaSneakerz" ||
      loaderFor == "land" ||
      loaderFor == "astroboyOkayamaPack" ||
      loaderFor == "xanaGenesisAnimation" ||
      loaderFor == "xanaGenesisVoice"
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

  const applyForUnstake = async () => {
    dispatch(stakeTransactionCredential({ txInProgress: true }));
    setModalShow(false);
    let StakingContractObj = new XanaStakingContractSevice(provider);
    StakingContractObj.applyForUnstake(addresses, selectedStakedId)
      .then((applyUnstakeResponse: any) => {
        if (applyUnstakeResponse) {
          ToastShow("success", "Applied For Unstaked successfully.");
          setSelectedStakedId("");
          dispatch(stakeTransactionCredential({ txInProgress: false }));
          getEmergencyClaimable();
          userStakeId();
        }
      })
      .catch(() => {
        ToastShow(
          "error",
          "Transaction Rejected or Something went wrong while unstaking !"
        );
        setSelectedStakedId("");
        dispatch(stakeTransactionCredential({ txInProgress: false }));
      });
  };

  const appliedForUnstakeHistory = async () => {
    let StakingConObj = new XanaStakingContractSevice(curentTabObj?.rpcUrl);
    let unstakeApplyIds = await StakingConObj.getUserUnStakeAppliedIds(
      addresses
    );
    if (unstakeApplyIds !== false) {
      const appliedUnstakeData: any[] = [];
      const UserAppliedUnstakeDataCall: any[] = [];
      unstakeApplyIds.forEach((element: any) => {
        UserAppliedUnstakeDataCall.push(
          StakingConObj.AppliedUnStakeHistory(addresses, element)
        );
      });
      await Promise.all([...UserAppliedUnstakeDataCall]).then((res) => {
        res.forEach((appliedRecord: any, index: any) => {
          if (appliedRecord) {
            appliedUnstakeData.push({
              id: unstakeApplyIds[index],
              AppliedAt: parseInt(appliedRecord.appliedAt) * 1000,
              stakedAmount: Web3.utils.fromWei(
                appliedRecord.stakedAmount.toString(),
                "ether"
              ),
              stakedAt: parseInt(appliedRecord.stakedAt) * 1000,
              isAppliedFor: true,
            });
          }
        });
      });

      return appliedUnstakeData;
    }
  };

  const getEmergencyClaimable = async () => {
    let StakingContractObj = new XanaStakingContractSevice(provider);

    const UserPenaltyIds =
      unStakedData &&
      unStakedData?.filter((item: any) => {
        if (item.isAppliedFor == true) {
          return item;
        }
      });

    const UserPenaltyData: any[] = [];
    const penaltyDataCall: any[] = [];
    UserPenaltyIds &&
      UserPenaltyIds?.forEach((element: any) => {
        penaltyDataCall.push(
          StakingContractObj.isClaimableEmergency(addresses, element?.id)
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

  const taxPoolHistory = async () => {
    let StakingConObj = new XanaStakingContractSevice(curentTabObj?.rpcUrl);
    let UserPenaltyIds = await StakingConObj.getUserPenaltiesIds(addresses);
    if (UserPenaltyIds !== false) {
      const UserPenaltyData: any[] = [];
      const penaltyDataCall: any[] = [];
      UserPenaltyIds.forEach((element: any) => {
        penaltyDataCall.push(
          StakingConObj.penaltyHistories(addresses, element)
        );
      });
      await Promise.all([...penaltyDataCall]).then((res) => {
        res.forEach((PenaltyRecord: any, index: any) => {
          if (!PenaltyRecord) return;
          UserPenaltyData.push({
            id: UserPenaltyIds[index],
            claimedAt: Number(PenaltyRecord?.releasedAt) * 1000,
            stakedAmount: Web3.utils.fromWei(
              PenaltyRecord?.userStake?.toString(),
              "ether"
            ),
            penaltyBonus: Web3.utils.fromWei(
              PenaltyRecord?.penaltyClaimed?.toString(),
              "ether"
            ),
          });
        });

        if (UserPenaltyData) {
          setPenaltyData(UserPenaltyData?.reverse());
        }
      });
    }
  };

  const handleEmergencyClaimUnstake = (index: any, id: any) => {
    if (!isAllowedChainSelected()) return;
    if (txInProgress)
      return ToastShow("info", "Transaction is Already in progress");
    let message1: any, message2: any, message3: any;
    let Title: any;
    setLoader("EmergencyClaim");
    setModalShow(true);
    setSelectedStakedId(id);
    let buttText: any = ButtonText(index);
    if (buttText == "Emergency UnStake") {
      message1 =
        "If you unstake within 14 days, a Tax of 18% of the staking amount will be incurred. You will also lose all the TICKET EARNED tickets from your staking. Do you want to unstake?";
      Title = "EMERGENCY UNSTAKE";
    } else if (buttText == "Claim UnStake") {
      message1 = `Do you want to CLAIM Unstake?`;
      message2 = "After confirm, you will recieve Xeta token.";
      message3 = "（Gas fee is required.）";
      Title = "CLAIM UNSTAKE";
    }

    setModalData({
      title: Title,
      message1: message1,
      text1: message2 ? message2 : "",
      text2: message3 ? message3 : "",
      btnText: "Cancel",
      unstakeBtnText: "Confirm",
      modalFor: "EMERGENCY_and_ClAIM",
    });
  };

  const emergencyClaimUnstake = async () => {
    dispatch(stakeTransactionCredential({ txInProgress: true }));
    setModalShow(false);
    let StakingContractObj = new XanaStakingContractSevice(provider);
    StakingContractObj.claimApplied(addresses, selectedStakedId)
      .then((applyUnstakeClaim: any) => {
        if (applyUnstakeClaim) {
          ToastShow("success", "Unstaked successfully !");
          setSelectedStakedId("");
          setModalShow(false);
          dispatch(stakeTransactionCredential({ txInProgress: false }));
          fetchUserStats();
          userStakeId();
          setLoader("");
          setModalShow(false);
          getEmergencyClaimable();
          handleTabChange("stakeHistory");
          setActiveTab("stakeHistory");
        }
      })
      .catch(() => {
        ToastShow(
          "error",
          "Transaction Rejected or Something went wrong while unstaking."
        );
        setLoader("");
        setSelectedStakedId("");
        setModalShow(false);
        dispatch(stakeTransactionCredential({ txInProgress: false }));
      });
  };

  const ButtonText = (index: any) => {
    if (emergencyClaimCheck) {
      if (emergencyClaimCheck[index]) {
        return "Emergency UnStake";
      } else {
        return "Claim UnStake";
      }
    }
  };

  return (
    <Container fluid className="xetaStakeUI" id="home">
      <section className="stacking-UI">
        <Container className="px-0">
          <Row className="ticket-row mx-0">
            <Cards
              Title="TICKET EARNED"
              cardFor="xeta"
              Subtitle={
                earnedTickets && userConnected
                  ? insertComma(earnedTickets)
                  : earnedTickets == 0 &&
                    ruffleCheck &&
                    ruffleCheck[0]?.Tickets > 0 &&
                    userConnected
                  ? "Already Consumed"
                  : "0"
              }
            />
            <Cards
              Title="TICKET EARN / DAY"
              cardFor="xeta"
              Subtitle={
                userConnected && earnedTicketsPerDay
                  ? `+ ${insertComma(earnedTicketsPerDay)}`
                  : "+ 0"
              }
            ></Cards>

            {currentCampaign?.startTime &&
            currentCampaign?.startTime > new Date().getTime() ? (
              <Cards
                Title="NEXT EVENT START"
                cardFor="xeta"
                Subtitle={<Countdown expiryTime={currentCampaign.startTime} />}
              />
            ) : currentCampaign?.endTime &&
              currentCampaign?.endTime > new Date().getTime() ? (
              <Cards
                Title="NEXT RAFFLE"
                cardFor="xeta"
                Subtitle={<Countdown expiryTime={currentCampaign.endTime} />}
              />
            ) : currentCampaign?.ruffleTime &&
              currentCampaign?.ruffleTime > new Date().getTime() ? (
              <Cards
                claimTicket={() => claimTicket()}
                Subtitle={<Countdown expiryTime={currentCampaign.ruffleTime} />}
                earnedTickets={parseInt(earnedTickets)}
                cardFor="xeta"
                Title={`${
                  ruffleCheck && ruffleCheck[0]?.Tickets > 0
                    ? "JOINED RAFFLE!"
                    : "JOIN RAFFLE"
                }`}
                txInProgress={claimload}
              />
            ) : (
              <Cards
                Title="NEXT EVENT START"
                cardFor="xeta"
                Subtitle={"00:00:00:00"}
              />
            )}
          </Row>

          <Row className="staking-row mx-0">
            <Col md={7} className="staking-input-col">
              <Form>
                <div className="input-wrapper">
                  <div className="input-inner-text">
                    <span className="ticket-per-day small-text">
                      +{ticketsPerDay} TICKET PER DAY
                    </span>
                    <div className="input-field">
                      <Form.Control
                        type="text"
                        maxLength={20}
                        placeholder="0"
                        value={ticket}
                        autoComplete="off"
                        onChange={(e) => validationHandler(e)}
                      />
                      <span className="input-xeta heading-4">xeta</span>
                    </div>
                  </div>
                  <div className="input-field-bottom-text-wrapper">
                    <p className="small-text left">
                      Now Staking {ticket ? ` ${insertComma(ticket)}` : ``} Xeta
                    </p>
                    <p className="small-text right">
                      MAX{" "}
                      {userConnected && xetaBalance > 0
                        ? insertComma(xetaBalance)
                        : "0"}{" "}
                      XETA
                    </p>
                  </div>
                </div>
              </Form>
            </Col>
            <Col md={5} className="stack-btn-col width-fix">
              <div className="stake-now-btn-wrapper">
                <div className="stake-now-btn-inner">
                  {isLoading ? (
                    <Button>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </Button>
                  ) : (
                    <Button onClick={userBalance}>Stake Xeta</Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="staking-row mx-0 claim-text">
            <Col md={7} className="staking-input-col">
              <Form>
                <div className="input-wrapper claimable-wr">
                  <div className="input-inner-text height-fix ">
                    <span className="ticket-per-day small-text txt-upperside">
                      CLAIMABLE FROM TAX POOL
                    </span>
                    <div className="input-field">
                      <Form.Control
                        type="text"
                        maxLength={20}
                        placeholder="0"
                        value={claimable == "0" ? "0" : insertComma(claimable)}
                        autoComplete="off"
                        readOnly
                      />
                      <span className="input-xeta heading-4">xeta</span>
                    </div>
                  </div>
                </div>
              </Form>
            </Col>
            <Col md={5} className="stack-btn-col width-fix">
              <div className="stake-now-btn-wrapper">
                <div className="stake-now-btn-inner">
                  {claimLoading ? (
                    <Button>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </Button>
                  ) : (
                    <Button
                      onClick={claimPenaltyBonus}
                      disabled={claimable == 0 ? true : false}
                    >
                      Claim tax
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
                    tabOptions={xetaStakingTabConfig}
                    onChangeTab={handleTabChange}
                  />
                </Col>
              </Row>

              {activeTab === "stakeHistory" &&
                stakedData &&
                userConnected &&
                stakedData
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .sort((a: any, b: any) => (a.stakedAt > b.stakedAt ? -1 : 1))
                  .map((data: any) => (
                    <Row>
                      <Col className="col-12">
                        <div className="unstack-wrapper staking-history-wr tax-bonus-wr">
                          <Row className="tax-bonus-row">
                            <Col sm={4} className="custom-col  claim-col">
                              <h3 className="small-text">Staking Date</h3>
                              <h4 className="heading-4">
                                {`${dateUtils(data.stakedAt)}`}
                              </h4>
                            </Col>

                            <Col sm={4} className="custom-col">
                              <h3 className="small-text">Staked Amount</h3>
                              <h4 className="heading-4">
                                {insertComma(data.stakedAmount)} XETA
                              </h4>
                            </Col>

                            <Col className="unstake-btn-col">
                              <Button
                                className="unstake-btn-his-tab"
                                onClick={() => dateFilter(data)}
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
                unStakedData &&
                userConnected &&
                unStakedData?.map((data: any, index: any) =>
                  data.isAppliedFor == true ? (
                    <Row key={index}>
                      <Col className="col-12">
                        <div className="unstack-wrapper rewards-wr">
                          <Form>
                            <div className="form-inner">
                              <div className="chain-outer-wr">
                                <div className="add-wr">
                                  <h5 className="time-text start-time-text">
                                    Stake
                                  </h5>

                                  <Form.Control
                                    type="number"
                                    className="stacking-id"
                                    placeholder={
                                      data.stakedAt && dateUtils(data.stakedAt)
                                    }
                                    disabled={true}
                                  />
                                </div>

                                <div className="add-wr">
                                  <h5 className="time-text end-time-text">
                                    Apply
                                  </h5>
                                  <Form.Control
                                    type="number"
                                    className="stacking-id"
                                    placeholder={
                                      data.AppliedAt &&
                                      dateUtils(data.AppliedAt)
                                    }
                                    disabled={true}
                                  />
                                </div>
                              </div>

                              <div className="amount-wr">
                                <h3 className=" point-text">
                                  <span>Staked Amount &nbsp;</span>
                                  {data.stakedAmount &&
                                    insertComma(data.stakedAmount)}
                                </h3>
                              </div>
                            </div>

                            <Button
                              className="claim-reward-btn"
                              onClick={() =>
                                handleEmergencyClaimUnstake(index, data.id)
                              }
                            >
                              {selectedStakedId === data.id ? (
                                <Spinner animation="border" role="status" />
                              ) : (
                                ButtonText(index)
                              )}
                            </Button>
                          </Form>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row key={index}>
                      <Col className="col-12">
                        <div className="unstack-wrapper staking-history-wr tax-bonus-wr">
                          <Row className="tax-bonus-row unstaking-his-row">
                            <Col
                              sm={4}
                              className="custom-col claim-col claim-modification text-sm-start"
                            >
                              <h3 className="small-text">Staking Date</h3>
                              <h4 className="heading-4">
                                {`${dateUtils(data.stakedAt)}`}
                              </h4>
                            </Col>
                            <Col sm={4} className="custom-col text-sm-start">
                              <h3 className="small-text">UnStake Date</h3>
                              <h4 className="heading-4">
                                {dateUtils(data.unStakedAt)}
                              </h4>
                            </Col>
                            {data.penalty > 0 ? (
                              <Col
                                sm={4}
                                className="custom-col unstake-xeta-col"
                              >
                                <h3 className="penalty">After 18% Tax</h3>
                                <h4 className="heading-4">
                                  {insertComma(
                                    data.stakedAmount - data.penalty
                                  )}{" "}
                                  XETA
                                </h4>
                              </Col>
                            ) : (
                              <Col
                                sm={4}
                                className="custom-col unstake-xeta-col"
                              >
                                <h4 className="heading-4">
                                  {insertComma(data.stakedAmount)} XETA
                                </h4>
                              </Col>
                            )}
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
                                  #{data.campaignId && data.campaignId}
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
                                        dateUtils(data.startTime)
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
                                        data.endTime && dateUtils(data.endTime)
                                      }
                                      disabled={true}
                                    />
                                  </div>
                                </div>

                                <div className="point-wr">
                                  <h3 className=" point-text">
                                    {data.Tickets && insertComma(data.Tickets)}
                                    <span>TICKET</span>
                                  </h3>
                                  {releaseCheck[index] &&
                                  data?.claimAllowed > 0 ? (
                                    <h3 className="point-text">
                                      {data.claimAllowed == 0
                                        ? "0"
                                        : data.claimAllowed > 5
                                        ? "5"
                                        : data.claimAllowed}
                                      <span> Treasure Box</span>
                                    </h3>
                                  ) : data.nft > 0 ? (
                                    <h3 className="point-text">
                                      {data.nft == 0
                                        ? data.claimAllowed > 5
                                          ? "5"
                                          : data.claimAllowed
                                        : data.nft
                                        ? data.nft
                                        : "0"}
                                      <span> Treasure Box</span>
                                    </h3>
                                  ) : releaseCheck[index] &&
                                    data.claimAllowed == 0 ? (
                                    <h3 className="point-text">
                                      0<span> Treasure Box</span>
                                    </h3>
                                  ) : null}
                                </div>
                              </div>

                              <Button
                                disabled={
                                  releaseCheck[index] && data.claimAllowed > 0
                                    ? false
                                    : true
                                }
                                className="claim-reward-btn"
                                onClick={() => handleRewardClaim(data)}
                              >
                                {data.nft > 0 ? (
                                  "Claim Completed"
                                ) : selectedStakedId === data.campaignId ? (
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

              {activeTab == "taxBonus" &&
                userConnected &&
                penaltyData &&
                penaltyData
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((data: any, index: any) => (
                    <Row key={index}>
                      <Col className="col-12">
                        <div className="unstack-wrapper staking-history-wr tax-bonus-wr">
                          <Row className="tax-bonus-row">
                            <Col sm={4} className="custom-col claim-col">
                              <h3 className="small-text">Claimed At</h3>
                              <h4 className="heading-4">
                                {`${dateUtils(data.claimedAt)}`}
                              </h4>
                            </Col>
                            <Col sm={4} className="custom-col">
                              <h3 className="small-text">Staked Amount</h3>
                              <h4 className="heading-4">
                                {insertComma(data.stakedAmount)} XETA
                              </h4>
                            </Col>
                            <Col sm={4} className="custom-col">
                              <h3 className="small-text">tax Bonus</h3>
                              <h4 className="heading-4">
                                {parseFloat(data.penaltyBonus).toFixed(5)} XETA
                              </h4>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  ))}
            </Col>
          </Row>
          {currentTabData && currentTabData.length !== 0 && userConnected ? (
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

          {modalShow && (
            <UnstakeModalMsg
              show={modalShow}
              hide={() => hideModal()}
              modalData={modalData}
              loaderFor={loaderFor}
              genesisData=""
              voiceData=""
              handleSelectoption=""
              selectedPlugin=""
              onConfirm={
                modalData.modalFor === "claimReward"
                  ? claimReward
                  : modalData.modalFor === "APPLY_For_UNSTAKE"
                  ? applyForUnstake
                  : modalData.modalFor === "EMERGENCY_and_ClAIM"
                  ? emergencyClaimUnstake
                  : ""
              }
            />
          )}
        </Container>
      </section>

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
          voiceData={voiceGenesisData}
          handleSelectoption={handleSelectoption}
          selectedPlugin={selectedPlugin}
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
                {allCycles.cycles.map((tab, index) => (
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
                  {data.rewards.length > 0
                    ? closeBoxes(data, false, data.rewards.length, true)
                    : data?.hasClaimed && data?.hasClaimed?.length > 0
                    ? closeBoxes(data, true, 0, false)
                    : closeBoxes(data, false, 0, false)}
                </>
              ))}
          </Row>
          <StimulationChart
            cycle={currentCampaign?.campaignId}
            chartFor={"xeta"}
          />
        </Container>
      </section>

      <WorkInstructions />
    </Container>
  );
}

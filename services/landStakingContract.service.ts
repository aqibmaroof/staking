import { LandStakingContract } from "../Components/Common/landStakingContract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

class LandStakingContractSevice {
  contract: any = {};
  constructor(web3Provider: any) {
    
    let web3 = new Web3(web3Provider);

    if (web3) {
      this.contract = new web3.eth.Contract(
        LandStakingContract.abi as AbiItem[],
        LandStakingContract.address
      );
    }
  }

  StakeLand = (
    tokenId: any,
    size: any,
    rarity: any,
    genesisTokenIds: any,
    proof: any,
    userAddress: any
  ) => {
    let stakeLandResponse = this.contract.methods
      .stakeLand(tokenId, size, rarity, genesisTokenIds, proof)
      .send({ from: userAddress });
    if (stakeLandResponse) return stakeLandResponse;
    return false;
  };

  releaseCheck = async (campaignId: any) => {
    try {
      let releaseCheckResponse = await this.contract.methods
        .isRewardOpen(campaignId)
        .call();

      if (releaseCheckResponse) return releaseCheckResponse;
    } catch (err) {
      return false;
    }
  };

  isClaimableEmergency = async (
    userAddress: string,
    AppliedId: number | string
  ) => {
    try {
      let ticketResponse = await this.contract.methods
        .getIsClaimable(userAddress, AppliedId)
        .call();
      return ticketResponse;
    } catch (err) {
      return false;
    }
  };

  claimReward = async (
    address: any,
    stakeId: string | number,
    rewards: any,
    rootHash: any
  ) => {
    let stakeResult = await this.contract.methods
      .claimStakingReward(stakeId, rewards, rootHash)
      .send({ from: address });
    if (stakeResult) return stakeResult;
    else return false;
  };

  getLandStakesIds = async (userAddress: string) => {
    try {
      let output = await this.contract.methods
        .getUserStakesIds(userAddress)
        .call();
      if (output) return output;
      else return false;
    } catch (err) {
      return false;
    }
  };

  getUserStakedland = (userAddress: string, stakeId: string | number) => {
    try {
      let output = this.contract.methods.getStake(userAddress, stakeId).call();
      return output;
    } catch (err) {
      return false;
    }
  };

  applyForLandUnStake = async (userAddress: string, stakeId: any) => {
    let applyUnstakeResponse = await this.contract.methods
      .appplyForUnstake(stakeId)
      .send({ from: userAddress });
    if (applyUnstakeResponse) return applyUnstakeResponse;
    return false;
  };

  claimXTickets = async (address: any) => {
    let stakeResult = await this.contract.methods
      .joinRuffle()
      .send({ from: address });
    if (stakeResult) return stakeResult;
    else return false;
  };

  getUserUnStakeIds = async (userAddress: any) => {
    try {
      let unstakeHistoryResponse = await this.contract.methods
        .getUserUnStakesIds(userAddress)
        .call();
      if (unstakeHistoryResponse) return unstakeHistoryResponse;
      else return false;
    } catch (err) {
      return false;
    }
  };

  getUnStake = async (userAddress: any, stakeId: string | number) => {
    try {
      let unstakeHistoryResponse = this.contract.methods
        .getUnStake(userAddress, stakeId)
        .call();
      if (unstakeHistoryResponse) return unstakeHistoryResponse;
      else return false;
    } catch (err) {
      return false;
    }
  };

  getRewardClaimable = async (
    userAddress: string,
    claimId: number | string
  ) => {
    try {
      let ticketResponse = await this.contract.methods
        .getRewardClaimable(claimId)
        .call({ from: userAddress });
      if (ticketResponse) return ticketResponse;
      else return false;
    } catch (err) {
      return false;
    }
  };

  perDayXTicketsUserClaimable = async (userAddress: string) => {
    try {
      let ticketResponse = await this.contract.methods
        .perDayXTicketsUserClaimable()
        .call({ from: userAddress });
      if (ticketResponse) return ticketResponse;
      else return false;
    } catch (err) {
      return false;
    }
  };

  getClaimableTickets = async (userAddress: string) => {
    try {
      let ticketResponse = await this.contract.methods
        .getClaimableTickets()
        .call({ from: userAddress });
      if (ticketResponse) return ticketResponse;
      return false;
    } catch (err) {
      return false;
    }
  };

  getCurrentCampaignDetails = async () => {
    try {
      let campaignDetail = await this.contract.methods
        .getCurrentCampaignDetails()
        .call();
      if (campaignDetail) return campaignDetail;
      else return false;
    } catch (err) {
      return false;
    }
  };

  claimUnStakedLand = async (address: any, appliedId: any) => {
    let stakeResult = await this.contract.methods
      .claimUnstake(appliedId)
      .send({ from: address });
    if (stakeResult) return stakeResult;
    else return false;
  };
}

export { LandStakingContractSevice };

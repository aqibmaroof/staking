import { XanaStakingContract } from "../Components/Common/XanaStakingContract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

class XanaStakingContractSevice {
  contract: any = {};
  constructor(web3Provider: any) {
    let web3 = new Web3(web3Provider);
    if (web3) {
      this.contract = new web3.eth.Contract(
        XanaStakingContract.abi as AbiItem[],
        XanaStakingContract.address
      );
    }
  }

  getClaimableToken = async (userAddress: string) => {
    try {
      let claimableTokensResponse = await this.contract.methods
        .getClaimableToken()
        .call({ from: userAddress });
      if (claimableTokensResponse) return claimableTokensResponse;
    } catch (err) {
      return false;
    }
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

  claimPenaltyBonus = async (userAddress: string) => {
    let claimPenaltyBonusResponse = await this.contract.methods
      .claimTaxBonus()
      .send({ from: userAddress });
    if (claimPenaltyBonusResponse) return claimPenaltyBonusResponse;
    return false;
  };

  applyForUnstake = async (userAddress: string, stakeId: any) => {
    let applyUnstakeResponse = await this.contract.methods
      .appplyForUnstake(stakeId)
      .send({ from: userAddress });
    if (applyUnstakeResponse) return applyUnstakeResponse;
    return false;
  };

  getUserUnStakeAppliedIds = async (address: any) => {
    try {
      let UserAppliedUnstakeIds = await this.contract.methods
        .getUserAppliedIds(address)
        .call();
      if (UserAppliedUnstakeIds) return UserAppliedUnstakeIds;
      return false;
    } catch (err) {
      return false;
    }
  };

  AppliedUnStakeHistory = async (address: any, appliedUnstakeId: any) => {
    try {
      let UserAppliedUnstakeHistory = await this.contract.methods
        .getApplyUnStake(address, appliedUnstakeId)
        .call();
      if (UserAppliedUnstakeHistory) return UserAppliedUnstakeHistory;
      return false;
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
        .getIsClaimableOrEmergency(userAddress, AppliedId)
        .call();
      return ticketResponse;
    } catch (err) {
      return false;
    }
  };

  claimApplied = async (address: any, appliedId: any) => {
    let stakeResult = await this.contract.methods
      .claimOrEmergencyUnstak(appliedId)
      .send({ from: address });
    if (stakeResult) return stakeResult;
    else return false;
  };

  stakeXanaXeta = async (ticket: any, address: any) => {
    let stakeResult = await this.contract.methods.stakeXeta().send({
      from: address,
      value: ticket,
    });
    if (stakeResult) return stakeResult;
    else return false;
  };

  claimXTickets = async (address: any) => {
    let stakeResult = await this.contract.methods
      .joinRuffle()
      .send({ from: address });
    if (stakeResult) return stakeResult;
    else return false;
  };

  getUserPenaltiesIds = async (address: any) => {
    try {
      let UserPenaltiesIds = await this.contract.methods
        .getUserPenaltiesIds(address)
        .call();
      if (UserPenaltiesIds) return UserPenaltiesIds;
      return false;
    } catch (err) {
      return false;
    }
  };

  penaltyHistories = async (address: any, penaltyId: any) => {
    try {
      let UserPenaltiesIds = await this.contract.methods
        .penaltyHistories(address, penaltyId)
        .call();
      if (UserPenaltiesIds) return UserPenaltiesIds;
      return false;
    } catch (err) {
      return false;
    }
  };

  unStakeXeta = async (unStakedId: any, address: any) => {
    let unStakeResult = await this.contract.methods
      .unStake(unStakedId)
      .send({ from: address });
    if (unStakeResult) return unStakeResult;
    else return false;
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

  getUserStakesIds = async (userAddress: string) => {
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

  getStakeFromId = (userAddress: string, stakeId: string | number) => {
    try {
      let output = this.contract.methods.getStake(userAddress, stakeId).call();
      return output;
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

  unStakeAll = async (address: any) => {
    let unStakeAllResponse = this.contract.methods
      .unstakeAll()
      .send({ from: address });
    if (unStakeAllResponse) return unStakeAllResponse;
    return false;
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

  claimReward = async (
    address: any,
    stakeId: string | number,
    rewards: any
  ) => {
    let stakeResult = await this.contract.methods
      .claimStakingReward(stakeId, rewards)
      .send({ from: address });
    if (stakeResult) return stakeResult;
    else return false;
  };

  claimStakeReward = async (
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
}

export { XanaStakingContractSevice };

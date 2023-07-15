import { RuffleContract } from './../Components/Common/ruffleContract';
import Web3 from "web3";
import { AbiItem } from "web3-utils";

class RuffleStakingContractSevice {
  contract: any = {};
  constructor(web3Provider: any) {

    let web3 = new Web3(web3Provider);

    if (web3) {
      this.contract = new web3.eth.Contract(
        RuffleContract.abi as AbiItem[],
        RuffleContract.address
      );
    }
  }

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

  claimXTickets = async (Tickets: any, address: any) => {
    let stakeResult = await this.contract.methods
      .joinRuffle(Tickets)
      .send({ from: address });
    if (stakeResult) return stakeResult;
    else return false;
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
    } catch (err) {
      return false
    }
  };
}

export { RuffleStakingContractSevice };

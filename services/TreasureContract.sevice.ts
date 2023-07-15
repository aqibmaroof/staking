import { TreasureContract } from "../Components/Common/TreasureBoxContract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

class TreasureContractSevice {
  contract: any = {};
  constructor(web3Provider: any, address: string) {
    let web3 = new Web3(web3Provider);
    if (web3) {
      this.contract = new web3.eth.Contract(
        TreasureContract.abi as AbiItem[],
        address
      );
    }
  }
  CollectionOwner = (nftId: any) => {
    let ClaimResponse = this.contract.methods.ownerOf(nftId).call();
    if (ClaimResponse) return ClaimResponse;
    return false;
  };

  ClaimGenesisReward = async (nftId: any, gasFee: any, userAddress: any) => {
    let ClaimResponse = await this.contract.methods.claimReward(nftId).send({
      from: userAddress,
      value: gasFee,
    });
    if (ClaimResponse) return ClaimResponse;
    return false;
  };

  animationClaimGenesisReward = async (
    tokenId: any,
    GenesisToken: any,
    userAddress: any
  ) => {
    try {
      let ClaimResponse = await this.contract.methods
        .claimRewardAnimation(tokenId, GenesisToken)
        .send({ from: userAddress });
      if (ClaimResponse) return ClaimResponse;
    } catch (error) {
      return false;
    }
  };
  ClaimTreasureReward = async (tokenId: any, gasFee: any, userAddress: any) => {
    try {
      let ClaimResponse = await this.contract.methods
        .claimRewardXeta(tokenId)
        .send({ from: userAddress, value: gasFee });
      if (ClaimResponse) return ClaimResponse;
    } catch (error) {
      return false;
    }
  };

  ClaimVoiceReward = async (
    tokenId: any,
    genesisToken: any,
    userAddress: any
  ) => {
    try {
      let ClaimResponse = await this.contract.methods
        .claimRewardVoicePlugin(tokenId, genesisToken)
        .send({ from: userAddress });
      if (ClaimResponse) return ClaimResponse;
    } catch (error) {
      return false;
    }
  };
}

export { TreasureContractSevice };

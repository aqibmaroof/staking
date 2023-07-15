import { XTokenContract } from "../Components/Common/XTokenContract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

class XTokenContractSevice {
  contract: any = {};
  constructor(web3Provider: any) {
    let web3 = new Web3(web3Provider);
    if (web3) {
      this.contract = new web3.eth.Contract(
        XTokenContract.abi as AbiItem[],
        XTokenContract.address
      );
    }
  }

  ClaimXtokenReward = async (
    nftId: any,
    collectionAddress: any,
    userAddress: any
  ) => {
    let ClaimResponse = await this.contract.methods
      .claimXtoken(nftId, collectionAddress)
      .send({ from: userAddress });
    if (ClaimResponse) return ClaimResponse;
    return false;
  };
}

export { XTokenContractSevice };

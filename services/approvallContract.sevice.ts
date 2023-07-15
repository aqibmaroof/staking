import { ApprovallContract } from "../Components/Common/approvalContract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

class ApprovallContractSevice {
  contract: any = {};
  constructor(web3Provider: any, address: string) {
    let web3 = new Web3(web3Provider);
    if (web3) {
      this.contract = new web3.eth.Contract(
        ApprovallContract.abi as AbiItem[],
        address
      );
    }
  }

  setApprovalForAll = async (
    approveAddress: any,
    approved: any,
    userAddress: any
  ) => {
    try {
      let setApprovedForAllResponse = await this.contract.methods
        .setApprovalForAll(approveAddress, approved)
        .send({
          from: userAddress,
        });
      if (setApprovedForAllResponse) return setApprovedForAllResponse;
    } catch (err: any) {
      return false;
    }
  };

  isApprovedForAll = async (owner: any, operator: any) => {
    try {
      let IsApprovedForAllResponse = await this.contract.methods
        .isApprovedForAll(owner, operator)
        .call();
      if (IsApprovedForAllResponse) return IsApprovedForAllResponse;
    } catch (err: any) {
      return false;
    }
  };
}
export { ApprovallContractSevice };

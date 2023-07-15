import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { XetaContract } from "../Components/Common/XetaContract";

class XetaContractService {
  contract: any = {};
  constructor(web3Provider: any) {
    let web3 = new Web3(web3Provider);
    if (web3) {
      this.contract = new web3.eth.Contract(
        XetaContract.abi as AbiItem[],
        XetaContract.address
      );
    }
  }

  approveTransaction = async (userAddress: string, stakingAdress: any) => {
    let result = await this.contract.methods
      .approve(
        stakingAdress,
        "115792089237316195423570985008687907853269984665640564039457"
      )
      .send({
        from: userAddress,
      });
    if (result) return result;
  };

  allowanceTransaction = async (addresses: any, StakingAddress: any) => {
    try {
      let response = await this.contract.methods
        .allowance(addresses, StakingAddress)
        .call();
      if (response) {
        return response;
      } else return false;
    } catch (err) {
      return false;
    }
  };

  getUserBalance = async (userAddress: string) => {
    try {
      let balance = await this.contract.methods.balanceOf(userAddress).call();
      if (balance) return balance;
    } catch (err) {
      return false;
    }
  };
}

export { XetaContractService };

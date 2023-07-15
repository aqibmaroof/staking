import sendRequest from './sendRequest'

const BE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT

export interface INetwork {
    id: number
    name: string
    chainId: number
    marketContract: number
    xanalia1155GeneralContract: string
    xanalia721GeneralContract: string
    xanaliaDexContract: string
    offerDexContract: string
    xanaliaURIContract: string
    xanaliaTreasury: string
    auctionContract: string
    rpc: string
    image: string
    gasLimit: number
    gasLimitCollection: number
    gasPrice: string
    status: number
    createdAt: string
    networkTokens: Array<{
        id: number
        tokenName: string
        decimal: number
        networkId: number
        contractAddress: string
        status: number
        isNativeToken: number
        currency: string
        icon: string
        createdAt: string
    }>
}

const getNetworksList = async () => {
    const res = await sendRequest({
        url: BE_URL + '/networks',
    },true)

    return res as INetwork
}

const networkServices = {
    getNetworksList,
}
export default networkServices

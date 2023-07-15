/* eslint-disable no-unused-vars */
export enum SupportedWallets {
    ethereum = 'ethereum',
    binance = 'binance',
    walletconnect = 'walletconnect',
    magiclink = 'magiclink',
}

export const signMessageToken =
    'Welcome. By signing this message you are verifying your digital identity. This is completely secure and does not cost anything!'

export const storageToken = 'accessToken'
export const storageRefreshToken = 'refreshToken'

export const webSiteMetamask = 'https://metamask.io/'
export const webSiteBinance = 'https://www.binance.org/'

export const MultiWalletData = [
  {
    icon: "https://ik.imagekit.io/xanalia/Images/metamask-logo.png",
    title: "MetaMask",
    label: "Connect to your MetaMask Wallet",
    key: SupportedWallets.ethereum,
  },
  {
    icon: "https://ik.imagekit.io/xanalia/Images/wallet-connect.jpeg",
    title: "WalletConnect",
    label: "Connect your favorite wallets",
    key: SupportedWallets.walletconnect,
  },
];

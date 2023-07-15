/* eslint-disable no-unused-vars */

export const numberToHexadecimal=(value: number | string) =>  {
    return '0x' + Number(value).toString(16)
}


export enum SupportedChains {
    ethereum = 'ethereum',
    polygon = 'polygon',
    binance = 'binance',
    xanaChain = 'XANAChain',
}

export enum SupportedChainId {
    MAINNET = 1,
    GOERLI = 5,
    POLYGON = 137,
    POLYGON_MUMBAI = 80001,
    BSC_MAINNET = 56,
    BSC_TESTNET = 97,
    XANACHAIN_TESTNET = 76798,
    XANACHAIN_MAINNET = 8888,
}

export interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}



export const getSampleChain = (
  chainID: SupportedChainId | number | string
): AddEthereumChainParameter | undefined => {
    if (Number(chainID) === SupportedChainId.MAINNET) {
        return {
            chainId: numberToHexadecimal(1),
            chainName: 'ETHER',
            nativeCurrency: {
                name: 'ETHER',
                symbol: 'ETH',
                decimals: 18,
            },
            rpcUrls: ['https://mainnet.infura.io/v3/'],
            blockExplorerUrls: ['https://etherscan.io'],
        }
    }

    if (Number(chainID) === SupportedChainId.GOERLI) {
        return {
            chainId: numberToHexadecimal(5),
            chainName: 'GOERLI',
            nativeCurrency: {
                name: 'Goerli',
                symbol: 'ETH',
                decimals: 18,
            },
            rpcUrls: ['https://goerli.infura.io/v3/'],
            blockExplorerUrls: ['https://goerli.etherscan.io'],
        }
    }

    if (Number(chainID) === SupportedChainId.BSC_MAINNET) {
        return {
            chainId: numberToHexadecimal(56),
            chainName: 'BSC',
            nativeCurrency: {
                name: 'BSC',
                symbol: 'BNB',
                decimals: 18,
            },
            rpcUrls: ['https://bsc-dataseed1.binance.org'],
            blockExplorerUrls: ['https://bscscan.com'],
        }
    }

  if (Number(chainID) === SupportedChainId.BSC_TESTNET) {
    return {
      chainId: numberToHexadecimal(97),
      chainName: "BNB Smart Chain Testnet",
      nativeCurrency: {
        name: "BNB Smart Chain Testnet",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
      blockExplorerUrls: ["https://testnet.bscscan.com"],
    };
  }

    if (Number(chainID) === SupportedChainId.POLYGON) {
        return {
            chainId: numberToHexadecimal(137),
            chainName: 'POLYGON',
            nativeCurrency: {
                name: 'POLYGON',
                symbol: 'MATIC',
                decimals: 18,
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com'],
        }
    }

    if (Number(chainID) === SupportedChainId.XANACHAIN_MAINNET) {
        return {
            chainId: numberToHexadecimal(8888),
            chainName: 'XANAChain',
            nativeCurrency: {
                name: 'XANAChain',
                symbol: 'XETA',
                decimals: 18,
            },
            rpcUrls: ['https://mainnet.xana.net/rpc'],
            blockExplorerUrls: ['https://xanachain.xana.net/'],
        }
    }

    if (Number(chainID) === SupportedChainId.POLYGON_MUMBAI) {
        return {
            chainId: numberToHexadecimal(80001),
            chainName: 'Polygon Testnet',
            nativeCurrency: {
                name: 'Polygon Testnet',
                symbol: 'MATIC',
                decimals: 18,
            },
            rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
            blockExplorerUrls: ['https://mumbai.polygonscan.com'],
        }
    }
    if (Number(chainID) === SupportedChainId.XANACHAIN_TESTNET) {
        return {
            chainId: numberToHexadecimal(76798),
            chainName: 'XANAChain Testnet',
            nativeCurrency: {
                name: 'XANAChain Testnet',
                symbol: 'XETA',
                decimals: 18,
            },
            rpcUrls: [
                'https://testnet.xana.net/ext/bc/uVTcvEaTShpeNWZnZHzBgfxgkLLK4qSxzgtF67CQRdU7qRMHU/rpc',
            ],
            blockExplorerUrls: ['https://xanachain-test.xana.net/'],
        }
    }

  return undefined;
};

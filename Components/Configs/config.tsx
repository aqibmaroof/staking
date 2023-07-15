export const xetaStakingTabConfig = [
  {
    key: "stakeHistory",
    title: "STAKING HISTORY",
  },
  {
    key: "unStakeHistory",
    title: "Unstake History",
  },
  { key: "rewards", title: "STAKING reward" },
  {
    key: "taxBonus",
    title: "TAX BONUS HISTORY",
  },
];

export const landStakingTabConfig = [
  { key: "stakeHistory", title: "STAKING HISTORY" },
  { key: "unStakeHistory", title: "Unstake History" },
  { key: "rewards", title: "STAKING reward" },
];

export const MainStakingTabConfigMainnet = [
  {
    key: "XETA-STAKING",
    title: "Xeta STAKING",
    chain: Number(process.env.NEXT_PUBLIC_CHAINID_XANA),
    rpcUrl: process.env.NEXT_PUBLIC_RPC_XANA,
    message: "Please switch your chain to XANAChain to proceed.",

  },
  {
    key: "LAND-STAKING",
    title: "Land STAKING",
    chain: Number(process.env.NEXT_PUBLIC_CHAINID_ETHEREUM),
    rpcUrl: process.env.NEXT_PUBLIC_RPC_ETHEREUM,
    message: "Please switch your chain to Ethereum to proceed.",
    chainMessage: "Please switch your chain to XANAChain to proceed.",
  },
];

export const MainStakingTabConfigTestnet = [
  {
    key: "XETA-STAKING",
    title: "Xeta STAKING",
    chain: Number(process.env.NEXT_PUBLIC_CHAINID_XANA),
    rpcUrl: process.env.NEXT_PUBLIC_RPC_XANA,
    message: "Please switch your chain to XANAChain Testnet to proceed.",
  },
  {
    key: "LAND-STAKING",
    title: "Land STAKING",
    chain: Number(process.env.NEXT_PUBLIC_CHAINID_BINANCE),
    rpcUrl: process.env.NEXT_PUBLIC_RPC_BINANCE,
    message: "Please switch your chain to Binance to proceed.",
    chainMessage: "Please switch your chain to XANAChain Testnet to proceed.",
  },
];

export const dataSwitchChainMainnet = [
  {
    key: Number(process.env.NEXT_PUBLIC_CHAINID_XANA),
    logo: "https://ik.imagekit.io/xanalia/xana/xana-chain-circle.svg",
    title: "XANAChain",
    rpc: process.env.NEXT_PUBLIC_RPC_XANA,
    chainID: process.env.NEXT_PUBLIC_CHAINID_XANA,
  },
  {
    key: Number(process.env.NEXT_PUBLIC_CHAINID_ETHEREUM),
    logo: "https://ik.imagekit.io/qjxemaiij5/ethereum-circle.svg",
    title: "Ethereum",
    rpc: process.env.NEXT_PUBLIC_RPC_ETHEREUM,
    chainID: process.env.NEXT_PUBLIC_CHAINID_ETHEREUM,
  },
];

export const dataSwitchChainTestnet = [
  {
    key: Number(process.env.NEXT_PUBLIC_CHAINID_XANA),
    logo: "https://ik.imagekit.io/xanalia/xana/xana-chain-circle.svg",
    title: "XANAChain",
    rpc: process.env.NEXT_PUBLIC_RPC_XANA,
    chainID: process.env.NEXT_PUBLIC_CHAINID_XANA,
  },
  {
    key: Number(process.env.NEXT_PUBLIC_CHAINID_BINANCE),
    logo: "https://ik.imagekit.io/xanalia/xana/binance-circle.svg",
    title: "Binance",
    rpc: process.env.NEXT_PUBLIC_RPC_BINANCE,
    chainID: process.env.NEXT_PUBLIC_CHAINID_BINANCE,
  },
];

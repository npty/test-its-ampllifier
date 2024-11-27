import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  parseUnits,
  type Hex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { avalancheFuji, sepolia as ethSepolia } from "viem/chains";

const overridedRpcUrls = {
  sepolia: {
    default: {
      http: ["https://1rpc.io/sepolia"],
    },
  },
  avalancheFuji: avalancheFuji.rpcUrls,
};

const sepolia = {
  ...ethSepolia,
  rpcUrls: overridedRpcUrls.sepolia,
};

export const sourceChain = avalancheFuji;

const suiChain = "sui-test2";
export const sourceRpcUrl = sourceChain.rpcUrls.default.http[0];
export const destinationAddress =
  "0x09e0eaf3a1111f411b7aa488ed211820eb7a53a9b29741fd5ac92ea97ebea2a2";
export const destinationChain = suiChain;

const privateKey: Hex = process.env.PRIVATE_KEY as Hex;
export const itsContractAddress = "0x144c3d7A5f5198EF3B46A8258b35E903cf197A66";
export const itfContractAddress = "0x6Ae8C8498d5FDA930e6ABeB0E15E5A00471702a7";
export const multicallAddress = "0xca11bde05977b3631167028862be2a173976ca11";
export const tokenName = "TestToken";
export const tokenSymbol = "TT";
export const tokenDecimals = 9;
export const initialTokenSupply = parseUnits("1000000", tokenDecimals);

export const wallet = privateKeyToAccount(privateKey);

export const defaultGasValue = parseEther("0.02");

// Create both public and wallet clients
export const publicClient = createPublicClient({
  chain: sourceChain,
  transport: http(),
});

export const walletClient = createWalletClient({
  account: wallet,
  chain: sourceChain,
  transport: http(),
});

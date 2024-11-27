import {
  encodeFunctionData,
  parseAbi,
  zeroAddress,
  type Hex,
  type Keccak256Hash,
} from "viem";
import { InterchainTokenFactoryABI } from "../abi/interchain-token-factory";
import { Multicall3ABI } from "../abi/multicall";
import {
  publicClient,
  itfContractAddress,
  wallet,
  walletClient,
  defaultGasValue,
  tokenName,
  tokenSymbol,
  tokenDecimals,
  initialTokenSupply,
  destinationChain,
  multicallAddress,
} from "../config";

export async function multicallDeployInterchainToken(
  salt: Keccak256Hash<"hex">,
  gasValue?: bigint,
) {
  const tokenId = await publicClient.readContract({
    address: itfContractAddress,
    abi: parseAbi(InterchainTokenFactoryABI),
    functionName: "interchainTokenId",
    args: [wallet.address, salt],
  });
  console.log("Token ID:", tokenId);

  const gas = gasValue || defaultGasValue;

  console.log("Deploying Remote Interchain Token...");
  const abi = parseAbi(InterchainTokenFactoryABI);
  const calldatas = [
    encodeFunctionData({
      abi,
      functionName: "deployInterchainToken",
      args: [
        salt,
        tokenName,
        tokenSymbol,
        tokenDecimals,
        initialTokenSupply,
        wallet.address,
      ],
    }),
    encodeFunctionData({
      abi,
      functionName: "deployRemoteInterchainToken",
      args: ["", salt, zeroAddress, destinationChain, gas],
    }),
  ];

  const multicallArgs = calldatas.map((calldata, index) => ({
    target: itfContractAddress as Hex,
    callData: calldata as Hex,
    allowFailure: false,
    value: index === 1 ? BigInt(gas) : 0n,
  }));

  const { request: multicallRequest } = await publicClient.simulateContract({
    account: wallet,
    address: multicallAddress,
    abi: parseAbi(Multicall3ABI),
    functionName: "aggregate3Value",
    args: [multicallArgs],
    value: gas,
  });

  const remoteDeploymentHash =
    await walletClient.writeContract(multicallRequest);
  await publicClient.waitForTransactionReceipt({ hash: remoteDeploymentHash });
  console.log("Remote Deployment Hash:", remoteDeploymentHash);
}
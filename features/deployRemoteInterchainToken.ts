import { parseAbi, zeroAddress, type Keccak256Hash } from "viem";
import { InterchainTokenFactoryABI } from "../abi/interchain-token-factory";
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
} from "../config";

export async function deployInterchainToken(
  salt: Keccak256Hash<"hex">,
  gasValue?: bigint,
) {
  const tokenId = await publicClient.readContract({
    address: itfContractAddress,
    abi: parseAbi(InterchainTokenFactoryABI),
    functionName: "interchainTokenId",
    args: [wallet.address, salt],
  });
  const gas = gasValue || defaultGasValue;
  console.log("Token ID:", tokenId);

  console.log("Deploying Interchain Token...");
  const { request: localDeploymentRequest } =
    await publicClient.simulateContract({
      account: wallet,
      address: itfContractAddress,
      abi: parseAbi(InterchainTokenFactoryABI),
      functionName: "deployInterchainToken",
      args: [
        salt,
        tokenName,
        tokenSymbol,
        tokenDecimals,
        initialTokenSupply,
        wallet.address,
      ],
    });
  const localDeploymentHash = await walletClient.writeContract(
    localDeploymentRequest,
  );
  await publicClient.waitForTransactionReceipt({ hash: localDeploymentHash });
  console.log("Deploy Token:", localDeploymentHash);

  console.log("Deploying Remote Interchain Token...");
  const { request: remoteDeploymentRequest } =
    await publicClient.simulateContract({
      account: wallet,
      address: itfContractAddress,
      abi: parseAbi(InterchainTokenFactoryABI),
      functionName: "deployRemoteInterchainToken",
      args: ["", salt, zeroAddress, destinationChain, gas],
      value: gas,
    });

  const remoteDeploymentHash = await walletClient.writeContract(
    remoteDeploymentRequest,
  );
  await publicClient.waitForTransactionReceipt({ hash: remoteDeploymentHash });
  console.log("Remote Deployment Hash:", remoteDeploymentHash);
}

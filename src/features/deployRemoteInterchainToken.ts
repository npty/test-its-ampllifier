import { parseAbi, zeroAddress } from "viem";
import { InterchainTokenFactoryABI } from "../abi/interchain-token-factory";
import {
  wallet,
  itfContractAddress,
  defaultGasValue,
  tokenName,
  tokenSymbol,
  tokenDecimals,
  initialTokenSupply,
  destinationChain,
} from "../config";
import {
  executeContractTransaction,
  readContractValue,
} from "../utils/contract";
import type { Keccak256Hash, DeploymentResult } from "../types";

/**
 * Deploys an interchain token and its remote counterpart
 * @param salt - Unique salt for token deployment
 * @param gasValue - Optional gas value for deployment
 * @returns Promise with deployment results
 */
export async function deployInterchainToken(
  salt: Keccak256Hash,
  gasValue?: bigint,
): Promise<DeploymentResult> {
  const gas = gasValue || defaultGasValue;

  try {
    // Get token ID
    const tokenId = await readContractValue(
      itfContractAddress,
      parseAbi(InterchainTokenFactoryABI),
      "interchainTokenId",
      [wallet.address, salt],
    );
    console.log("Token ID:", tokenId);

    // Deploy local token
    console.log("Deploying Interchain Token...");
    const localDeployment = await executeContractTransaction(
      itfContractAddress,
      parseAbi(InterchainTokenFactoryABI),
      "deployInterchainToken",
      [
        salt,
        tokenName,
        tokenSymbol,
        tokenDecimals,
        initialTokenSupply,
        wallet.address,
      ],
    );

    console.log("Local Token Deployed:", localDeployment.hash);

    // Deploy remote token
    console.log("Deploying Remote Interchain Token...");
    const remoteDeployment = await executeContractTransaction(
      itfContractAddress,
      parseAbi(InterchainTokenFactoryABI),
      "deployRemoteInterchainToken",
      ["", salt, zeroAddress, destinationChain, gas],
      gas,
    );

    console.log("Remote Token Deployed:", remoteDeployment.hash);

    return {
      hash: remoteDeployment.hash,
    };
  } catch (error) {
    console.error("Error deploying interchain token:", error);
    throw error;
  }
}

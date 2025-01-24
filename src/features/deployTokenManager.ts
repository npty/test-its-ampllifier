import { encodeAbiParameters, keccak256, parseEther } from "viem";
import { InterchainTokenServiceABI } from "../abi";
import {
  destinationChain,
  itsContractAddress,
  publicClient,
  wallet,
  walletClient,
} from "../config";

// TokenManager Types from the test file
export const TokenManagerType = {
  MINT_BURN: 0,
  MINT_BURN_FROM: 1,
  LOCK_UNLOCK: 2,
  LOCK_UNLOCK_FEE_ON_TRANSFER: 3,
  NATIVE_INTERCHAIN_TOKEN: 4,
} as const;

export async function deployTokenManager() {
  try {
    // Prepare params for token manager
    // From test file: const params = defaultAbiCoder.encode(['bytes', 'address'], [wallet.address, token.address]);
    const params = encodeAbiParameters(
      [{ type: "bytes" }, { type: "address" }],
      [
        "0x", // for simplified example, you can replace with actual bytes
        wallet.address, // or your token address if deploying with existing token
      ],
    );

    // First simulate the transaction
    const { request } = await publicClient.simulateContract({
      account: wallet.address,
      address: itsContractAddress,
      abi: InterchainTokenServiceABI,
      functionName: "deployTokenManager",
      args: [
        keccak256("0x1"), // salt
        destinationChain, // destinationChain
        TokenManagerType.LOCK_UNLOCK, // tokenManagerType
        params, // encoded params
        parseEther("0.01"), // gasValue
      ],
      value: parseEther("0.01"), // Value sent with transaction
    });

    console.log("Simulation successful");

    // If simulation is successful, send the actual transaction
    const hash = await walletClient.writeContract(request);

    console.log("Transaction hash:", hash);

    // Wait for transaction to be mined
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    console.log("Transaction receipt:", receipt);

    // Get the deployed token manager address
    // You can use the tokenManagerAddress function from the contract
    const tokenId = await publicClient.readContract({
      address: itsContractAddress,
      abi: InterchainTokenServiceABI,
      functionName: "interchainTokenId",
      args: [wallet.address, keccak256("0x1")],
    });

    const tokenManagerAddress = await publicClient.readContract({
      address: itsContractAddress,
      abi: InterchainTokenServiceABI,
      functionName: "tokenManagerAddress",
      args: [tokenId],
    });

    console.log("Token Manager deployed at:", tokenManagerAddress);

    return receipt;
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
}

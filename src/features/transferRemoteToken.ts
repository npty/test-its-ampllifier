import { type Keccak256Hash } from "viem";
import { InterchainTokenServiceABI } from "../abi";
import {
  itsContractAddress,
  destinationChain,
  defaultGasValue,
  destinationAddress,
  sourceRpcUrl,
} from "../config";
import { Contract, JsonRpcProvider, Wallet } from "ethers";

export async function transferRemoteToken(
  amount: bigint,
  tokenId: Keccak256Hash<"hex">,
) {
  console.log("Token ID:", tokenId);
  const args = [
    tokenId as `0x${string}`,
    destinationChain,
    destinationAddress,
    amount,
    "0x",
    defaultGasValue,
  ] as const;

  const provider = new JsonRpcProvider(sourceRpcUrl);
  const signer = new Wallet(process.env.PRIVATE_KEY as string, provider);
  const contract = new Contract(
    itsContractAddress,
    InterchainTokenServiceABI,
    signer,
  );

  console.log("Sending transfer...");
  const tx = await contract.interchainTransfer(...args, {
    value: defaultGasValue,
  });

  await tx.wait();
  console.log("Transfer successful:", tx.hash);
}

import { publicClient, walletClient } from "../config";
import { ContractFunctionExecutionError } from "viem";

export async function executeContractTransaction(
  contractAddress: string,
  abi: any,
  functionName: string,
  args: any[],
  value?: bigint,
) {
  try {
    const { request } = await publicClient.simulateContract({
      account: walletClient.account,
      address: contractAddress as `0x${string}`,
      abi,
      functionName,
      args,
      value,
    });

    const hash = await walletClient.writeContract(request);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return { hash, receipt };
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      console.error("Contract execution error:", error.details);
    }
    throw error;
  }
}

export async function readContractValue(
  contractAddress: string,
  abi: any,
  functionName: string,
  args: any[],
) {
  return publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi,
    functionName,
    args,
  });
}

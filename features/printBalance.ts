import { formatEther } from "viem";
import { publicClient, wallet } from "../config";

export async function printBalance() {
  console.log("Wallet Address:", wallet.address);

  const balance = await publicClient.getBalance({
    address: wallet.address,
  });

  console.log("Balance:", formatEther(balance));
}

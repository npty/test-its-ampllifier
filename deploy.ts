import { keccak256, toBytes } from "viem";
import { deployInterchainToken } from "./features/deployRemoteInterchainToken";
import { printBalance } from "./features/printBalance";

// Print Balance
await printBalance();

const randomSalt = keccak256(toBytes(`${Date.now()}`));

await deployInterchainToken(randomSalt);

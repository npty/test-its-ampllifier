import { keccak256, toBytes } from "viem";
import { printBalance } from "./features/printBalance";
import { multicallDeployInterchainToken } from "./features/multicallDeployRemoteInterchainToken";

// Print Balance
await printBalance();

const randomSalt = keccak256(toBytes(`${Date.now()}`));

await multicallDeployInterchainToken(randomSalt);

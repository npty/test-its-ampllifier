import { keccak256, toBytes } from "viem";
import { deployInterchainToken } from "./features/deployRemoteInterchainToken";

const randomSalt = keccak256(toBytes(`${Date.now()}`));

deployInterchainToken(randomSalt);

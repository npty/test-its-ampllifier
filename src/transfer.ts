import { transferRemoteToken } from "./features/transferRemoteToken";
import { initialTokenSupply } from "./config";

const tokenIdArg =
  (process.argv[2] as `0x${string}`) ||
  "0xe12617e0c1e1765bfa47a921c2cf024d11619620f8447873b9523c9d0eb63e4f";
const amount = process.argv[3]
  ? BigInt(process.argv[3])
  : initialTokenSupply / 100n;

transferRemoteToken(amount, tokenIdArg);

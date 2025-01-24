export const InterchainTokenServiceABI = [
  // Read functions
  "function contractId() pure returns (bytes32)",
  "function tokenManagerAddress(bytes32 tokenId) view returns (address tokenManagerAddress_)",
  "function validTokenManagerAddress(bytes32 tokenId) view returns (address tokenManagerAddress_)",
  "function validTokenAddress(bytes32 tokenId) view returns (address tokenAddress)",
  "function interchainTokenAddress(bytes32 tokenId) view returns (address tokenAddress)",
  "function interchainTokenId(address sender, bytes32 salt) pure returns (bytes32 tokenId)",
  "function tokenManagerImplementation(uint256 tokenManagerType) view returns (address)",
  "function flowLimit(bytes32 tokenId) view returns (uint256 flowLimit_)",
  "function flowOutAmount(bytes32 tokenId) view returns (uint256 flowOutAmount_)",
  "function flowInAmount(bytes32 tokenId) view returns (uint256 flowInAmount_)",
  "function contractCallValue(string sourceChain, string sourceAddress, bytes payload) view returns (address, uint256)",
  "function getExpressExecutor(bytes32 commandId, string sourceChain, string sourceAddress, bytes32 payloadHash) view returns (address expressExecutor)",

  // Write functions
  "function deployTokenManager(bytes32 salt, string destinationChain, uint8 tokenManagerType, bytes params, uint256 gasValue) payable returns (bytes32 tokenId)",
  "function deployInterchainToken(bytes32 salt, string destinationChain, string name, string symbol, uint8 decimals, bytes minter, uint256 gasValue) payable returns (bytes32 tokenId)",
  "function expressExecute(bytes32 commandId, string sourceChain, string sourceAddress, bytes payload) payable",
  "function interchainTransfer(bytes32 tokenId, string destinationChain, bytes destinationAddress, uint256 amount, bytes metadata, uint256 gasValue) payable",
  "function callContractWithInterchainToken(bytes32 tokenId, string destinationChain, bytes destinationAddress, uint256 amount, bytes data, uint256 gasValue) payable",
  "function transmitInterchainTransfer(bytes32 tokenId, address sourceAddress, string destinationChain, bytes destinationAddress, uint256 amount, bytes metadata) payable",

  // Admin functions
  "function setFlowLimits(bytes32[] tokenIds, uint256[] flowLimits)",
  "function setTrustedAddress(string chain, string address_)",
  "function removeTrustedAddress(string chain)",
  "function setPauseStatus(bool paused)",
  "function execute(bytes32 commandId, string sourceChain, string sourceAddress, bytes payload)",

  // Events
  "event InterchainTokenIdClaimed(bytes32 indexed tokenId, address indexed deployer, bytes32 salt)",
  "event InterchainTransfer(bytes32 indexed tokenId, string indexed sourceChain, string destinationChain, bytes destinationAddress, uint256 amount, bytes32 dataHash)",
  "event InterchainTransferReceived(bytes32 indexed tokenId, string indexed sourceChain, bytes sourceAddress, address destinationAddress, uint256 amount, bytes32 dataHash)",
] as const;

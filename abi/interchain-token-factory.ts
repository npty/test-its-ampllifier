// String format (for Viem style):
export const InterchainTokenFactoryABI = [
  // Read functions
  "function contractId() pure returns (bytes32)",
  "function interchainTokenService() view returns (address)",
  "function chainNameHash() view returns (bytes32)",
  "function interchainTokenSalt(bytes32 chainNameHash_, address deployer, bytes32 salt) pure returns (bytes32 tokenSalt)",
  "function canonicalInterchainTokenSalt(bytes32 chainNameHash_, address tokenAddress) pure returns (bytes32 salt)",
  "function interchainTokenId(address deployer, bytes32 salt) view returns (bytes32 tokenId)",
  "function canonicalInterchainTokenId(address tokenAddress) view returns (bytes32 tokenId)",
  "function interchainTokenAddress(address deployer, bytes32 salt) view returns (address tokenAddress)",

  // Write functions
  "function deployInterchainToken(bytes32 salt, string name, string symbol, uint8 decimals, uint256 initialSupply, address minter) payable returns (bytes32 tokenId)",
  "function deployRemoteInterchainToken(bytes32 salt, address minter, string destinationChain, uint256 gasValue) payable returns (bytes32 tokenId)",
  "function deployRemoteInterchainToken(string originalChainName, bytes32 salt, address minter, string destinationChain, uint256 gasValue) payable returns (bytes32 tokenId)",
  "function registerCanonicalInterchainToken(address tokenAddress) payable returns (bytes32 tokenId)",
  "function deployRemoteCanonicalInterchainToken(address originalTokenAddress, string destinationChain, uint256 gasValue) payable returns (bytes32 tokenId)",
  "function deployRemoteCanonicalInterchainToken(string originalChain, address originalTokenAddress, string destinationChain, uint256 gasValue) payable returns (bytes32 tokenId)",
] as const;

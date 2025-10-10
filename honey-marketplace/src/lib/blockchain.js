// Blockchain Integration for BeeSure Honey Marketplace
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

// Smart Contract ABI for Honey NFT
const HONEY_NFT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "tokenURI", "type": "string"},
      {"internalType": "string", "name": "honeyId", "type": "string"},
      {"internalType": "string", "name": "origin", "type": "string"},
      {"internalType": "string", "name": "harvestDate", "type": "string"}
    ],
    "name": "mintHoneyNFT",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getHoneyDetails",
    "outputs": [
      {"internalType": "string", "name": "honeyId", "type": "string"},
      {"internalType": "string", "name": "origin", "type": "string"},
      {"internalType": "string", "name": "harvestDate", "type": "string"},
      {"internalType": "address", "name": "owner", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "index", "type": "uint256"}
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract addresses (would be deployed contracts in production)
const CONTRACT_ADDRESSES = {
  // Ethereum Mainnet
  1: "0x0000000000000000000000000000000000000000",
  // Polygon Mainnet
  137: "0x0000000000000000000000000000000000000000",
  // Ethereum Sepolia Testnet
  11155111: "0x0000000000000000000000000000000000000000",
  // Polygon Mumbai Testnet
  80001: "0x0000000000000000000000000000000000000000"
};

class BlockchainService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.account = null;
    this.chainId = null;
  }

  // Initialize blockchain connection
  async initialize() {
    try {
      const ethereumProvider = await detectEthereumProvider();
      
      if (!ethereumProvider) {
        throw new Error('MetaMask not detected. Please install MetaMask to use blockchain features.');
      }

      this.provider = new ethers.BrowserProvider(ethereumProvider);
      return true;
    } catch (error) {
      console.error('Failed to initialize blockchain:', error);
      throw error;
    }
  }

  // Connect wallet
  async connectWallet() {
    try {
      if (!this.provider) {
        await this.initialize();
      }

      // Request account access
      const accounts = await this.provider.send("eth_requestAccounts", []);
      this.account = accounts[0];

      // Get signer
      this.signer = await this.provider.getSigner();

      // Get network info
      const network = await this.provider.getNetwork();
      this.chainId = Number(network.chainId);

      // Initialize contract
      const contractAddress = CONTRACT_ADDRESSES[this.chainId];
      if (contractAddress && contractAddress !== "0x0000000000000000000000000000000000000000") {
        this.contract = new ethers.Contract(contractAddress, HONEY_NFT_ABI, this.signer);
      }

      return {
        account: this.account,
        chainId: this.chainId,
        network: network.name
      };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  // Disconnect wallet
  async disconnectWallet() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.account = null;
    this.chainId = null;
  }

  // Check if wallet is connected
  isConnected() {
    return !!this.account;
  }

  // Get current account
  getCurrentAccount() {
    return this.account;
  }

  // Mint NFT for honey product
  async mintHoneyNFT(productData) {
    try {
      if (!this.contract) {
        throw new Error('Smart contract not available. Please connect to a supported network.');
      }

      const { id, origin, harvestSeason, name, description } = productData;
      
      // Create metadata for IPFS (in production, this would be uploaded to IPFS)
      const metadata = {
        name: `BeeSure Honey Certificate - ${name}`,
        description: `Blockchain certificate for ${description}`,
        image: "https://beesure.com/nft-images/honey-certificate.png",
        attributes: [
          { trait_type: "Origin", value: origin },
          { trait_type: "Harvest Season", value: harvestSeason },
          { trait_type: "Product ID", value: id.toString() },
          { trait_type: "Certification Date", value: new Date().toISOString() }
        ]
      };

      // In production, upload metadata to IPFS and get the URI
      const tokenURI = `https://beesure.com/metadata/${id}.json`;

      // Mint the NFT
      const transaction = await this.contract.mintHoneyNFT(
        tokenURI,
        id.toString(),
        origin,
        harvestSeason
      );

      // Wait for transaction confirmation
      const receipt = await transaction.wait();
      
      // Extract token ID from events
      const mintEvent = receipt.logs.find(log => {
        try {
          const parsed = this.contract.interface.parseLog(log);
          return parsed.name === 'Transfer' && parsed.args.from === ethers.ZeroAddress;
        } catch {
          return false;
        }
      });

      const tokenId = mintEvent ? mintEvent.args.tokenId : null;

      return {
        success: true,
        tokenId: tokenId?.toString(),
        transactionHash: receipt.hash,
        metadata
      };
    } catch (error) {
      console.error('Failed to mint NFT:', error);
      throw error;
    }
  }

  // Get user's NFTs
  async getUserNFTs() {
    try {
      if (!this.contract || !this.account) {
        return [];
      }

      const balance = await this.contract.balanceOf(this.account);
      const nfts = [];

      for (let i = 0; i < balance; i++) {
        try {
          const tokenId = await this.contract.tokenOfOwnerByIndex(this.account, i);
          const details = await this.contract.getHoneyDetails(tokenId);
          
          nfts.push({
            tokenId: tokenId.toString(),
            honeyId: details.honeyId,
            origin: details.origin,
            harvestDate: details.harvestDate,
            owner: details.owner
          });
        } catch (error) {
          console.error(`Failed to get NFT at index ${i}:`, error);
        }
      }

      return nfts;
    } catch (error) {
      console.error('Failed to get user NFTs:', error);
      return [];
    }
  }

  // Verify NFT ownership
  async verifyNFTOwnership(tokenId) {
    try {
      if (!this.contract) {
        throw new Error('Smart contract not available');
      }

      const details = await this.contract.getHoneyDetails(tokenId);
      return {
        isValid: true,
        owner: details.owner,
        honeyId: details.honeyId,
        origin: details.origin,
        harvestDate: details.harvestDate
      };
    } catch (error) {
      console.error('Failed to verify NFT:', error);
      return { isValid: false, error: error.message };
    }
  }

  // Listen for account changes
  onAccountChanged(callback) {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          this.disconnectWallet();
        } else {
          this.account = accounts[0];
        }
        callback(accounts);
      });
    }
  }

  // Listen for network changes
  onNetworkChanged(callback) {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        this.chainId = parseInt(chainId, 16);
        callback(this.chainId);
      });
    }
  }

  // Get supported networks
  getSupportedNetworks() {
    return [
      { chainId: 1, name: 'Ethereum Mainnet', currency: 'ETH' },
      { chainId: 137, name: 'Polygon Mainnet', currency: 'MATIC' },
      { chainId: 11155111, name: 'Ethereum Sepolia', currency: 'ETH' },
      { chainId: 80001, name: 'Polygon Mumbai', currency: 'MATIC' }
    ];
  }

  // Switch network
  async switchNetwork(chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  }
}

// Create singleton instance
const blockchainService = new BlockchainService();

export default blockchainService;


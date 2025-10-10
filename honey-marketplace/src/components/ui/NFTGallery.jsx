import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { 
  Award, 
  ExternalLink, 
  RefreshCw, 
  Wallet,
  Calendar,
  MapPin,
  Shield
} from 'lucide-react';
import blockchainService from '../lib/blockchain';

const NFTCard = ({ nft, onViewDetails }) => {
  return (
    <Card className="product-card group">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* NFT Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Honey Certificate</h3>
                <p className="text-xs text-muted-foreground">Token #{nft.tokenId}</p>
              </div>
            </div>
            <Badge className="nft-badge text-xs">NFT</Badge>
          </div>

          {/* NFT Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{nft.origin}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{nft.harvestDate}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Product ID: {nft.honeyId}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(nft)}
              className="flex-1 text-xs"
            >
              View Details
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`https://etherscan.io/token/${nft.contractAddress}?a=${nft.tokenId}`, '_blank')}
              className="px-2"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NFTGallery = ({ className = "" }) => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const checkConnection = useCallback(() => {
    const connected = blockchainService.isConnected();
    const currentAccount = blockchainService.getCurrentAccount();
    
    setIsConnected(connected);
    setAccount(currentAccount);
    
    if (connected) {
      loadNFTs();
    }
  }, []);

  const setupEventListeners = useCallback(() => {
    blockchainService.onAccountChanged((accounts) => {
      if (accounts.length === 0) {
        setIsConnected(false);
        setAccount(null);
        setNfts([]);
      } else {
        setAccount(accounts[0]);
        loadNFTs();
      }
    });

    blockchainService.onNetworkChanged(() => {
      if (isConnected) {
        loadNFTs();
      }
    });
  }, [isConnected]);

  useEffect(() => {
    checkConnection();
    setupEventListeners();
  }, [checkConnection, setupEventListeners]);

  const loadNFTs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userNFTs = await blockchainService.getUserNFTs();
      setNfts(userNFTs);
    } catch (error) {
      setError(error.message);
      console.error('Failed to load NFTs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      await blockchainService.connectWallet();
      checkConnection();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleViewDetails = (nft) => {
    // In a real app, this would open a detailed NFT view
    console.log('View NFT details:', nft);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              My NFT Certificates
            </div>
            {isConnected && (
              <Button
                variant="outline"
                size="sm"
                onClick={loadNFTs}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {!isConnected ? (
            /* Not Connected */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your wallet to view your NFT certificates
              </p>
              <Button onClick={handleConnectWallet}>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          ) : isLoading ? (
            /* Loading */
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Loading your NFTs...</p>
            </div>
          ) : error ? (
            /* Error */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-red-600 mb-2">Error Loading NFTs</h3>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button variant="outline" onClick={loadNFTs}>
                Try Again
              </Button>
            </div>
          ) : nfts.length === 0 ? (
            /* No NFTs */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No NFT Certificates</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You don't have any honey NFT certificates yet. Purchase honey products to get started!
              </p>
              <Button variant="outline" onClick={() => window.location.href = '/marketplace'}>
                Browse Marketplace
              </Button>
            </div>
          ) : (
            /* NFT Grid */
            <div className="space-y-4">
              {/* Account Info */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Connected:</span>
                  <span className="text-sm font-mono">{formatAddress(account)}</span>
                </div>
                <Badge variant="secondary">{nfts.length} NFT{nfts.length !== 1 ? 's' : ''}</Badge>
              </div>

              {/* NFT Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.map((nft) => (
                  <NFTCard
                    key={nft.tokenId}
                    nft={nft}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NFTGallery;


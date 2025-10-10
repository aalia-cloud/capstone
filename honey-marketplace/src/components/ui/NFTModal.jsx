import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Badge } from './badge';
import { Card, CardContent } from './card';
import { 
  Award, 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Wallet,
  Shield
} from 'lucide-react';
import blockchainService from '../lib/blockchain';

const NFTModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onMintSuccess 
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [mintResult, setMintResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected
    setIsConnected(blockchainService.isConnected());
    setAccount(blockchainService.getCurrentAccount());
  }, [isOpen]);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const connection = await blockchainService.connectWallet();
      setIsConnected(true);
      setAccount(connection.account);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleMintNFT = async () => {
    setIsMinting(true);
    setError(null);
    
    try {
      const result = await blockchainService.mintHoneyNFT(product);
      setMintResult(result);
      onMintSuccess?.(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsMinting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const resetModal = () => {
    setMintResult(null);
    setError(null);
    setCopied(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            NFT Certificate
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.origin} • {product.harvestSeason}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {product.quality}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Connection */}
          {!isConnected ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your wallet to mint an NFT certificate for this honey product.
                </p>
                <Button 
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="w-full"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : mintResult ? (
            /* Mint Success */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-600 mb-2">NFT Minted Successfully!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your honey certificate has been created on the blockchain.
                </p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <span className="text-xs font-medium">Token ID:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono">{mintResult.tokenId}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(mintResult.tokenId)}
                        className="h-6 w-6 p-0"
                      >
                        {copied ? (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <span className="text-xs font-medium">Transaction:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono">
                        {formatAddress(mintResult.transactionHash)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://etherscan.io/tx/${mintResult.transactionHash}`, '_blank')}
                        className="h-6 w-6 p-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleClose} className="w-full mt-4">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            /* Mint NFT */
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Connected Account:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{formatAddress(account)}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  NFT Certificate Benefits
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Proof of authenticity and ownership
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Complete traceability from hive to home
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Transferable digital certificate
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Blockchain-secured verification
                  </li>
                </ul>
              </div>

              <Button 
                onClick={handleMintNFT}
                disabled={isMinting}
                className="w-full"
              >
                {isMinting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Minting NFT...
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    Mint NFT Certificate
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800 text-sm">Error</h4>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NFTModal;


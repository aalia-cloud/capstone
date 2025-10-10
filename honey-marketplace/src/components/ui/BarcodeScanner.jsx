import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Input } from './input';
import { 
  QrCode, 
  Camera, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  MapPin,
  Calendar,
  Award,
  Shield
} from 'lucide-react';

const BarcodeScanner = ({ 
  isOpen, 
  onClose, 
  onVerificationSuccess 
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [scanMode, setScanMode] = useState('camera'); // 'camera' or 'manual'
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isOpen && scanMode === 'camera') {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen, scanMode]);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Unable to access camera. Please check permissions or use manual entry.');
      setScanMode('manual');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const verifyBarcode = async (barcodeValue) => {
    setIsVerifying(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/barcode/verify?barcode=${encodeURIComponent(barcodeValue)}`);
      const data = await response.json();
      
      if (response.ok) {
        setVerificationResult({
          success: true,
          product: data.product,
          barcode: barcodeValue
        });
        onVerificationSuccess?.(data.product);
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      verifyBarcode(manualCode.trim());
    }
  };

  const handleScanCapture = () => {
    // In a real implementation, this would use a barcode scanning library
    // For demo purposes, we'll simulate scanning
    const simulatedBarcode = 'DEMO-' + Math.random().toString(36).substr(2, 9);
    verifyBarcode(simulatedBarcode);
  };

  const resetScanner = () => {
    setVerificationResult(null);
    setError(null);
    setManualCode('');
    if (scanMode === 'camera') {
      startCamera();
    }
  };

  const handleClose = () => {
    stopCamera();
    setVerificationResult(null);
    setError(null);
    setManualCode('');
    setScanMode('camera');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            Verify Honey Authenticity
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {verificationResult ? (
            /* Verification Result */
            <div className="space-y-4">
              {verificationResult.success ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-600 mb-2">Authentic Honey Verified!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This honey product has been verified as authentic.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-red-600 mb-2">Verification Failed</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This barcode could not be verified.
                  </p>
                </div>
              )}

              {verificationResult.success && verificationResult.product && (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{verificationResult.product.name}</h4>
                        <Badge className="nft-badge">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{verificationResult.product.origin}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{verificationResult.product.harvest_season}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Shield className="w-3 h-3" />
                          <span>{verificationResult.product.quality}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {verificationResult.product.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={resetScanner} className="flex-1">
                  Scan Another
                </Button>
                <Button onClick={handleClose} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            /* Scanner Interface */
            <div className="space-y-4">
              {/* Mode Toggle */}
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                <Button
                  variant={scanMode === 'camera' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setScanMode('camera')}
                  className="flex-1"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Camera
                </Button>
                <Button
                  variant={scanMode === 'manual' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setScanMode('manual')}
                  className="flex-1"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Manual
                </Button>
              </div>

              {scanMode === 'camera' ? (
                /* Camera Scanner */
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden aspect-square">
                    {isScanning ? (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Scanning Overlay */}
                        <div className="absolute inset-0 scanner-overlay">
                          <div className="absolute inset-4 border-2 border-primary rounded-lg">
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-white">
                          <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm opacity-75">Camera not available</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Position the barcode or QR code within the frame
                    </p>
                    <Button 
                      onClick={handleScanCapture}
                      disabled={!isScanning || isVerifying}
                      className="w-full"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <QrCode className="w-4 h-4 mr-2" />
                          Capture & Verify
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                /* Manual Entry */
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <QrCode className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Enter Barcode Manually</h3>
                    <p className="text-sm text-muted-foreground">
                      Type or paste the barcode number from your honey jar
                    </p>
                  </div>

                  <form onSubmit={handleManualSubmit} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Enter barcode number..."
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      className="text-center font-mono"
                    />
                    
                    <Button 
                      type="submit"
                      disabled={!manualCode.trim() || isVerifying}
                      className="w-full"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Verify Authenticity
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
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

export default BarcodeScanner;


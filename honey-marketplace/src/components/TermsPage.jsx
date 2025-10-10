import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './ui/Header';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Scale, 
  UserCheck, 
  Users, 
  QrCode, 
  CreditCard, 
  Copyright, 
  AlertTriangle, 
  XCircle, 
  Gavel, 
  RefreshCw,
  Mail,
  FileText,
  Shield
} from 'lucide-react';

const TermsPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
    console.log('Wallet connection toggled');
  };

  const handleScanBarcode = () => {
    console.log('Scan barcode clicked');
  };

  const termsSections = [
    {
      icon: Scale,
      title: "Acceptance of Terms",
      items: [
        "By using BeeSure, you accept and agree to be bound by these terms",
        "Terms apply to both Customers and Honey Producers"
      ]
    },
    {
      icon: UserCheck,
      title: "Account Registration",
      items: [
        "Users must provide accurate information",
        "Accounts are personal; sharing login credentials is prohibited",
        "Honey Producers must provide valid commercial licenses"
      ]
    },
    {
      icon: Users,
      title: "User Responsibilities",
      items: [
        "Customers: Verify product details and licenses before purchase",
        "Honey Producers: Upload authentic lab reports and correct product information",
        "Both Parties: Respect other users and follow platform rules"
      ]
    },
    {
      icon: QrCode,
      title: "Product Verification & QR Codes",
      items: [
        "QR codes are the main method for verifying product authenticity",
        "Customer QR code: Unlimited scans allowed",
        "Producer Seal QR code: Single-use scan; multiple scans invalidates the link",
        "BeeSure is not liable for damages if QR code rules are not followed"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment & Refunds",
      items: [
        "Payments processed via secure third-party providers",
        "Refunds and returns handled according to BeeSure policies",
        "BeeSure may adjust policies or fees at its discretion"
      ]
    },
    {
      icon: Copyright,
      title: "Intellectual Property",
      items: [
        "All content, logos, and designs are property of BeeSure",
        "Unauthorized use or reproduction of content is prohibited"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      items: [
        "BeeSure is not responsible for user errors in orders or information",
        "BeeSure is not responsible for misuse of QR codes",
        "BeeSure is not responsible for indirect, incidental, or consequential damages"
      ]
    },
    {
      icon: XCircle,
      title: "Termination",
      items: [
        "BeeSure may suspend or terminate accounts for violation of these terms",
        "BeeSure may suspend or terminate accounts for fraudulent activity",
        "BeeSure may suspend or terminate accounts for unauthorized use of the platform"
      ]
    },
    {
      icon: Gavel,
      title: "Governing Law",
      items: [
        "These Terms & Conditions are governed by the laws of the United Arab Emirates"
      ]
    },
    {
      icon: RefreshCw,
      title: "Changes to Terms",
      items: [
        "BeeSure reserves the right to update these Terms",
        "Users will be notified of material changes",
        "Continued use of the platform constitutes acceptance of updated terms"
      ]
    },
    {
      icon: Mail,
      title: "Contact Information",
      items: [
        "Email: beesure28@gmail.com",
        "Instagram: @beesure.ae",
        "LinkedIn: Bee Sure"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        isWalletConnected={isWalletConnected}
        onConnectWallet={handleConnectWallet}
        onProfileClick={() => console.log('Profile clicked')}
        onScanBarcode={handleScanBarcode}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Scale className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & <span className="honey-gradient-text">Conditions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our BeeSure platform
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 bg-amber-25">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to BeeSure. By accessing or using our platform, you agree to comply with these Terms & Conditions.
            Please read them carefully before using our services.
          </p>
        </div>
      </section>

      {/* Terms Sections */}
      {termsSections.map((section, index) => (
        <section key={index} className={`py-16 px-4 ${index % 2 === 0 ? 'bg-amber-50' : 'bg-orange-50'}`}>
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
            </div>

            <ul className="space-y-4 ml-16">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* Contact Section */}
      <section className="py-16 px-4 bg-amber-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you have any questions about these Terms & Conditions or need clarification on any policies, please contact us.
          </p>
          <Button
            size="lg"
            onClick={() => window.open('mailto:beesure28@gmail.com', '_blank')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8"
          >
            Contact Us
          </Button>
        </div>
      </section>

      {/* Last Updated Section */}
      <section className="py-8 px-4 bg-orange-50 border-t border-amber-200">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-2">Last Updated</Badge>
          <p className="text-sm text-gray-500">September 2025</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 honey-gradient rounded-sm"></div>
                  </div>
                </div>
                <div className="font-serif font-bold text-lg text-primary">
                  BeeSure
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Blockchain-verified honey marketplace ensuring authenticity and traceability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Marketplace</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/marketplace" className="hover:text-primary transition-colors">Browse Honey</a></li>
                <li><a href="/trace" className="hover:text-primary transition-colors">Trace Products</a></li>
                <li><a href="/certificates" className="hover:text-primary transition-colors">NFT Certificates</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Use</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 BeeSure - All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;

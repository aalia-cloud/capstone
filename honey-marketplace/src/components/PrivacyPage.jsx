import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './ui/Header';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Shield, 
  Lock, 
  Users, 
  Database, 
  Share2, 
  Eye, 
  Cookie, 
  Baby, 
  RefreshCw,
  Mail,
  CreditCard,
  Smartphone,
  QrCode,
  FileText,
  CheckCircle
} from 'lucide-react';

const PrivacyPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
    console.log('Wallet connection toggled');
  };

  const handleScanBarcode = () => {
    console.log('Scan barcode clicked');
  };

  const privacySections = [
    {
      icon: Database,
      title: "Information We Collect",
      items: [
        "Personal Information: Name, email address, password, delivery address, account type (Customer or Honey Producer)",
        "Transaction Information: Order history, purchased products, payment details (processed securely via third-party payment providers)",
        "Technical Information: IP address, browser type, device information, cookies, and usage data",
        "QR Code Data: Scan history of QR codes (for product verification purposes)"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      items: [
        "To provide and improve our services",
        "To process orders, payments, and deliveries",
        "To send transactional and promotional emails (optional subscription)",
        "To verify product authenticity via QR code scans",
        "To analyze website usage and improve the platform",
        "To comply with legal obligations"
      ]
    },
    {
      icon: Share2,
      title: "Sharing Your Information",
      items: [
        "Third-Party Service Providers: Payment processors, cloud storage providers, analytics services",
        "Legal Requirements: If required by law, court order, or regulation",
        "No Sale of Personal Data: BeeSure does not sell or rent your personal information"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      items: [
        "Use of encryption and secure servers",
        "Regular security audits and compliance checks",
        "Protection against unauthorized access, alteration, disclosure, or destruction"
      ]
    },
    {
      icon: CheckCircle,
      title: "User Rights",
      items: [
        "Access, update, or delete personal information",
        "Opt-out of marketing communications",
        "Withdraw consent for data processing (where applicable)",
        "Contact BeeSure for any questions regarding your personal data"
      ]
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      items: [
        "Use of cookies to improve user experience",
        "Analytics to track website performance",
        "Option to disable cookies via browser settings (may affect website functionality)"
      ]
    },
    {
      icon: Baby,
      title: "Children's Privacy",
      items: [
        "BeeSure services are not intended for children under 13",
        "No personal information knowingly collected from children"
      ]
    },
    {
      icon: RefreshCw,
      title: "Updates to This Policy",
      items: [
        "Policy may be updated periodically",
        "Updated versions will be posted on this page with the \"Last Updated\" date"
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
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy <span className="honey-gradient-text">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy and data security are our top priorities at BeeSure
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
            At BeeSure, we are committed to protecting your privacy and ensuring the security of your personal information.
            This Privacy Policy explains what data we collect, how it is used, and your rights regarding your information.
          </p>
        </div>
      </section>

      {/* Privacy Sections */}
      {privacySections.map((section, index) => (
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
            Questions About Your Privacy?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us.
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

export default PrivacyPage;

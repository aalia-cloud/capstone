import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './ui/Header';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Shield,
  Target,
  Leaf,
  Hexagon,
  Mail,
  Linkedin,
  Instagram,
  CheckCircle,
  Globe,
  Users,
  Award,
  Heart,
  Zap,
  ArrowRight,
  Star,
  TrendingUp,
  Lock,
  Eye,
  Truck
} from 'lucide-react';

const AboutPage = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
    console.log('Wallet connection toggled');
  };

  const handleScanBarcode = () => {
    console.log('Scan barcode clicked');
  };

  // Company story and values
  const companyStory = {
    founding: "Founded in 2024, BeeSure emerged from a simple yet powerful vision: to restore trust in the honey marketplace through cutting-edge blockchain technology.",
    mission: "We bridge the gap between traditional beekeeping and modern technology, ensuring every jar of honey tells its authentic story.",
    vision: "To become the world's most trusted honey marketplace, where authenticity and quality are guaranteed through innovation."
  };

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "Every honey batch is secured with tamper-proof blockchain technology, ensuring complete authenticity from hive to home."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "We partner only with certified beekeepers who meet our strict quality standards and sustainable practices."
    },
    {
      icon: Eye,
      title: "Full Transparency",
      description: "Track your honey's complete journey with detailed information about origin, production methods, and quality certifications."
    },
    {
      icon: Heart,
      title: "Supporting Beekeepers",
      description: "Every purchase directly supports local beekeepers and contributes to bee conservation efforts worldwide."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Sustainable Harvesting",
      description: "Our partner beekeepers use ethical harvesting methods that prioritize bee welfare and environmental sustainability.",
      icon: Leaf
    },
    {
      step: "02",
      title: "Quality Testing",
      description: "Each honey batch undergoes rigorous laboratory testing for purity, authenticity, and quality standards.",
      icon: CheckCircle
    },
    {
      step: "03",
      title: "Blockchain Certification",
      description: "Verified honey receives a unique NFT certificate, creating an immutable record of its authenticity and journey.",
      icon: Lock
    },
    {
      step: "04",
      title: "Marketplace Delivery",
      description: "Certified honey is made available on our platform with complete traceability and quality guarantees.",
      icon: Truck
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      handle: "Bee Sure",
      url: "https://linkedin.com/company/beesure",
      color: "text-blue-600"
    },
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@beesure.ae",
      url: "https://instagram.com/beesure.ae",
      color: "text-pink-600"
    },
    {
      icon: Mail,
      name: "Email",
      handle: "beesure28@gmail.com",
      url: "mailto:beesure28@gmail.com",
      color: "text-green-600"
    }
  ];

  const stats = [
    { number: "500+", label: "Verified Beekeepers" },
    { number: "10,000+", label: "Honey Batches Certified" },
    { number: "25+", label: "Countries Served" },
    { number: "99.9%", label: "Authenticity Guarantee" }
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
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Story</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Authentic Honey, <span className="honey-gradient-text">Guaranteed</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're revolutionizing the honey marketplace by combining traditional beekeeping wisdom
                with cutting-edge blockchain technology to ensure every jar tells its authentic story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/marketplace')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
                >
                  Explore Marketplace
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('mailto:beesure28@gmail.com', '_blank')}
                >
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Hero Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <Hexagon className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  <p className="text-amber-700 font-medium">Beekeeper with Hives</p>
                  <p className="text-amber-600 text-sm">Professional Hero Image</p>
                </div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">99.9%</p>
                    <p className="text-sm text-gray-600">Verified Authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold honey-gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Story Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-amber-200 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <Users className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <p className="text-orange-700 font-medium">BeeSure Founders</p>
                  <p className="text-orange-600 text-sm">Company Story Image</p>
                </div>
              </div>
            </div>
            <div>
              <Badge variant="secondary" className="mb-4">Our Journey</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                From Vision to <span className="honey-gradient-text">Reality</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {companyStory.founding}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {companyStory.mission}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {companyStory.vision}
                </p>
              </div>
              <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Our Mission</h3>
                    <p className="text-gray-600">Ensuring honey authenticity through innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              From Hive to <span className="honey-gradient-text">Home</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive process ensures every jar of honey meets the highest standards of quality,
              authenticity, and traceability through innovative blockchain technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold text-amber-600 mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-amber-300 to-orange-300"></div>
                )}
              </div>
            ))}
          </div>

          {/* Process Image */}
          <div className="mt-16">
            <div className="aspect-[16/6] bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-center">
                <Hexagon className="w-20 h-20 text-amber-600 mx-auto mb-4" />
                <p className="text-amber-700 font-medium text-lg">Honey Production Process</p>
                <p className="text-amber-600">From Beehive to Blockchain Certification</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose BeeSure Section */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose <span className="honey-gradient-text">BeeSure</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just another honey marketplace. We're your trusted partner in ensuring
              every drop of honey you purchase is authentic, sustainable, and traceable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{reason.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product Showcase */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { name: "Wildflower Honey", origin: "Local Farms" },
              { name: "Manuka Honey", origin: "New Zealand" },
              { name: "Acacia Honey", origin: "European Apiaries" }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Hexagon className="w-12 h-12 text-amber-600 mx-auto mb-2" />
                    <p className="text-amber-700 font-medium text-sm">{product.name}</p>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                <p className="text-gray-600 text-sm">{product.origin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Social Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Get In Touch</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Connect With <span className="honey-gradient-text">BeeSure</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Have questions about our honey authentication process? Want to become a partner beekeeper?
                We'd love to hear from you and help you discover the world of authentic, traceable honey.
              </p>

              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors cursor-pointer"
                       onClick={() => window.open(social.url, '_blank')}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${social.color} bg-white shadow-sm`}>
                      <social.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{social.name}</h3>
                      <p className="text-gray-600">{social.handle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Contact Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <Mail className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  <p className="text-amber-700 font-medium">Customer Support Team</p>
                  <p className="text-amber-600 text-sm">Ready to Help You</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience <span className="honey-gradient-text">Authentic Honey</span>?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who trust BeeSure for verified, authentic honey with complete blockchain traceability.
            Every jar tells a story of quality, sustainability, and trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/marketplace')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8"
            >
              Explore Marketplace
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('mailto:beesure28@gmail.com', '_blank')}
              className="border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold px-8"
            >
              Contact Us
            </Button>
          </div>
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

export default AboutPage;

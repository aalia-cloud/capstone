import React from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { ArrowRight, Shield, Award, Zap } from 'lucide-react';

const HeroSection = ({ onExploreClick, onTraceClick }) => {
  const benefits = [
    {
      icon: Shield,
      title: "100% Authentic Honey",
      description: "Blockchain verified authenticity"
    },
    {
      icon: Award,
      title: "NFT Certificates",
      description: "Digital ownership & traceability"
    },
    {
      icon: Zap,
      title: "Consumer Trust",
      description: "Complete transparency guaranteed"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 honeycomb-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="nft-badge w-fit">
                <Award className="w-3 h-3 mr-1" />
                Blockchain Verified
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight">
                Unlock the Truth Behind Your{' '}
                <span className="honey-gradient-text">Honey</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                We utilize NFTs to provide a unique platform for tracking the origin and journey of each jar of honey, ensuring the highest standards of quality and integrity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={onExploreClick}
                className="smooth-hover group"
              >
                Explore Marketplace
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={onTraceClick}
                className="smooth-hover"
              >
                Trace Your Honey
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/src/assets/anNLvZ16TeG7.jpg" 
                alt="Premium honey jars with blockchain verification"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg glass-effect">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">NFT Verified</div>
                    <div className="text-xs text-muted-foreground">Certificate #1234</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-lg glass-effect">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">100% Pure</div>
                    <div className="text-xs text-muted-foreground">Al Dhafra Apiary</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 honey-gradient rounded-2xl transform rotate-6 scale-105 opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 fill-background">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;


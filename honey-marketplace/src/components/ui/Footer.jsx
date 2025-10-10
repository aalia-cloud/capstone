import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
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
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">Browse Products</Link></li>
              <li><Link to="/producers" className="hover:text-primary transition-colors">Our Producers</Link></li>
              <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Use</Link></li>
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
  );
};

export default Footer;

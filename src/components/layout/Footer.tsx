
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-12">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-semibold text-lg">B</span>
              </div>
              <span className="font-medium text-xl">BetSmart</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Experience the future of betting with our premium platform designed with simplicity and elegance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-base">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Promotions
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-base">Sports</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/events?sport=football" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Football
                </Link>
              </li>
              <li>
                <Link to="/events?sport=basketball" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Basketball
                </Link>
              </li>
              <li>
                <Link to="/events?sport=tennis" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Tennis
                </Link>
              </li>
              <li>
                <Link to="/events?sport=baseball" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Baseball
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-base">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Responsible Gambling
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} BetSmart. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-destructive" /> for demo purposes only
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

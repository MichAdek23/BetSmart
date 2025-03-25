
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Bell, ChevronDown, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // In a real app, this would come from auth

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-semibold text-lg">B</span>
          </div>
          <span className={cn(
            "font-medium text-xl transition-opacity duration-300",
            isScrolled ? "opacity-100" : "opacity-0 md:opacity-100"
          )}>
            BetSmart
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            Home
          </Link>
          <Link to="/events" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            Events
          </Link>
          <div className="relative group">
            <button className="text-foreground/80 hover:text-foreground transition-colors font-medium flex items-center">
              Sports <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 rounded-md overflow-hidden bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
              <div className="py-1 flex flex-col">
                <Link to="/events?sport=football" className="px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                  Football
                </Link>
                <Link to="/events?sport=basketball" className="px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                  Basketball
                </Link>
                <Link to="/events?sport=tennis" className="px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                  Tennis
                </Link>
                <Link to="/events?sport=baseball" className="px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                  Baseball
                </Link>
              </div>
            </div>
          </div>
          <Link to="/account" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            My Account
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative rounded-full w-9 h-9 flex items-center justify-center hover:bg-accent transition-colors">
                <Bell className="h-5 w-5 text-foreground/70" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                New event: Liverpool vs Man City
              </DropdownMenuItem>
              <DropdownMenuItem>
                Your bet on Lakers vs Celtics was won!
              </DropdownMenuItem>
              <DropdownMenuItem>
                New promotion: 50% bonus on next deposit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center font-medium text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full w-9 h-9 flex items-center justify-center hover:bg-accent transition-colors">
                <User className="h-5 w-5 text-foreground/70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/account">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account/bets">My Bets</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account/wallet">Wallet</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {isAdmin && (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Place Bet
          </button>
        </div>

        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out pt-20",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container mx-auto px-4 space-y-6 py-6">
          <Link 
            to="/" 
            className="block py-3 text-lg font-medium border-b border-border"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/events" 
            className="block py-3 text-lg font-medium border-b border-border"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Events
          </Link>
          <button className="flex justify-between items-center w-full py-3 text-lg font-medium border-b border-border">
            Sports <ChevronDown className="h-5 w-5" />
          </button>
          <Link 
            to="/account" 
            className="block py-3 text-lg font-medium border-b border-border"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Account
          </Link>
          {isAdmin && (
            <Link 
              to="/admin" 
              className="block py-3 text-lg font-medium border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          <div className="pt-4">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-colors">
              Place Bet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

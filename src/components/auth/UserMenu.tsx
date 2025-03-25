
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOnClickOutside } from '@/hooks/use-click-outside';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Settings, WalletCards, LogOut, Shield } from 'lucide-react';

const UserMenu = () => {
  const { user, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  useOnClickOutside(menuRef, closeMenu);
  
  const handleLogout = async () => {
    closeMenu();
    await logout();
  };
  
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user?.username?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 rounded-full p-0"
        onClick={toggleMenu}
      >
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary text-white">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-3 border-b">
            <p className="font-medium">{user?.username}</p>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>
          
          <div className="py-1">
            <Link
              to="/account"
              className="flex items-center px-4 py-2 text-sm hover:bg-accent"
              onClick={closeMenu}
            >
              <User className="mr-2 h-4 w-4" />
              My Account
            </Link>
            
            <Link
              to="/account/wallet"
              className="flex items-center px-4 py-2 text-sm hover:bg-accent"
              onClick={closeMenu}
            >
              <WalletCards className="mr-2 h-4 w-4" />
              My Wallet
            </Link>
            
            <Link
              to="/account/settings"
              className="flex items-center px-4 py-2 text-sm hover:bg-accent"
              onClick={closeMenu}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
            
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                onClick={closeMenu}
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Link>
            )}
          </div>
          
          <div className="py-1 border-t">
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-accent"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

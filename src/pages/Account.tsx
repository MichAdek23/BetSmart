
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, History, Settings, Lock, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Account = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const tabs = [
    { id: "overview", label: "Overview", icon: <User className="h-5 w-5" /> },
    { id: "bets", label: "My Bets", icon: <History className="h-5 w-5" /> },
    { id: "payment", label: "Payment Methods", icon: <CreditCard className="h-5 w-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <AccountOverview />;
      case "bets":
        return <MyBets />;
      case "payment":
        return <PaymentMethods />;
      case "settings":
        return <AccountSettings />;
      default:
        return <AccountOverview />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">My Account</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">John Doe</h3>
                      <p className="text-muted-foreground text-sm">Premium Member</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-accent/50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Balance</span>
                      <span className="font-medium">$2,450.00</span>
                    </div>
                  </div>
                </div>
                
                <nav className="p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`w-full flex items-center p-3 rounded-lg mb-1 transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-white"
                          : "hover:bg-accent text-foreground"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="p-4 border-t border-border">
                  <button className="w-full flex items-center justify-between p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg">
                    <div className="flex items-center">
                      <LogOut className="h-5 w-5 mr-3" />
                      <span className="font-medium">Log Out</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-grow">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-border p-6"
              >
                {renderTabContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const AccountOverview = () => {
  const recentActivity = [
    { id: 1, type: "Deposit", amount: "$500.00", date: "May 15, 2023", status: "Completed" },
    { id: 2, type: "Bet Placed", amount: "$50.00", date: "May 14, 2023", status: "Completed" },
    { id: 3, type: "Winnings", amount: "$125.00", date: "May 12, 2023", status: "Completed" },
    { id: 4, type: "Withdrawal", amount: "$300.00", date: "May 10, 2023", status: "Completed" }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Account Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-accent/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
          <p className="text-2xl font-bold">$2,450.00</p>
        </div>
        <div className="bg-accent/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Active Bets</p>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-accent/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Winnings</p>
          <p className="text-2xl font-bold">$12,845.00</p>
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 text-muted-foreground text-sm font-medium">Type</th>
              <th className="text-left p-2 text-muted-foreground text-sm font-medium">Amount</th>
              <th className="text-left p-2 text-muted-foreground text-sm font-medium">Date</th>
              <th className="text-left p-2 text-muted-foreground text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((item) => (
              <tr key={item.id} className="border-b border-border">
                <td className="p-2 py-3">{item.type}</td>
                <td className="p-2 py-3 font-medium">{item.amount}</td>
                <td className="p-2 py-3 text-muted-foreground">{item.date}</td>
                <td className="p-2 py-3">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MyBets = () => {
  const bets = [
    { 
      id: 1, 
      event: "Liverpool vs Man City", 
      type: "Match Winner",
      selection: "Liverpool",
      odds: "2.20",
      stake: "$100.00",
      potentialWin: "$220.00",
      date: "May 12, 2023",
      status: "Active" 
    },
    { 
      id: 2, 
      event: "Lakers vs Celtics", 
      type: "Total Points",
      selection: "Over 220.5",
      odds: "1.90",
      stake: "$50.00",
      potentialWin: "$95.00",
      date: "June 15, 2023",
      status: "Active" 
    },
    { 
      id: 3, 
      event: "Arsenal vs Chelsea", 
      type: "Match Winner",
      selection: "Arsenal",
      odds: "1.75",
      stake: "$80.00",
      potentialWin: "$140.00",
      date: "May 2, 2023",
      status: "Won" 
    },
    { 
      id: 4, 
      event: "Nadal vs Djokovic", 
      type: "Match Winner",
      selection: "Nadal",
      odds: "2.10",
      stake: "$120.00",
      potentialWin: "$252.00",
      date: "April 20, 2023",
      status: "Lost" 
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">My Bets</h2>
      
      <div className="flex items-center mb-6 gap-2">
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium">
          All
        </button>
        <button className="bg-white border border-border hover:bg-accent transition-colors px-3 py-1.5 rounded-lg text-sm font-medium">
          Active
        </button>
        <button className="bg-white border border-border hover:bg-accent transition-colors px-3 py-1.5 rounded-lg text-sm font-medium">
          Settled
        </button>
      </div>
      
      <div className="space-y-4">
        {bets.map((bet) => (
          <div key={bet.id} className="border border-border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">{bet.event}</h3>
                <p className="text-sm text-muted-foreground">{bet.date}</p>
              </div>
              <div>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  bet.status === "Active" ? "bg-blue-100 text-blue-800" :
                  bet.status === "Won" ? "bg-green-100 text-green-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {bet.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Type</p>
                <p className="text-sm">{bet.type}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Selection</p>
                <p className="text-sm font-medium">{bet.selection}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Odds</p>
                <p className="text-sm">{bet.odds}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Stake</p>
                <p className="text-sm">{bet.stake}</p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm">Potential Win:</span>
                <span className="font-medium text-primary">{bet.potentialWin}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentMethods = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">My Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-primary/10 rounded mr-3 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/24</p>
                </div>
              </div>
              <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                Default
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <button className="text-xs text-muted-foreground hover:text-foreground">Edit</button>
              <button className="text-xs text-muted-foreground hover:text-foreground">Remove</button>
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-4 border-dashed flex items-center justify-center">
            <button className="text-primary hover:text-primary/80 font-medium flex items-center">
              <span className="text-2xl mr-1">+</span> Add New Card
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 text-muted-foreground text-sm font-medium">Transaction</th>
                <th className="text-left p-2 text-muted-foreground text-sm font-medium">Date</th>
                <th className="text-left p-2 text-muted-foreground text-sm font-medium">Amount</th>
                <th className="text-left p-2 text-muted-foreground text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-2 py-3">Deposit</td>
                <td className="p-2 py-3 text-muted-foreground">May 15, 2023</td>
                <td className="p-2 py-3 font-medium">$500.00</td>
                <td className="p-2 py-3">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2 py-3">Withdrawal</td>
                <td className="p-2 py-3 text-muted-foreground">May 10, 2023</td>
                <td className="p-2 py-3 font-medium">$300.00</td>
                <td className="p-2 py-3">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-2 py-3">Deposit</td>
                <td className="p-2 py-3 text-muted-foreground">May 1, 2023</td>
                <td className="p-2 py-3 font-medium">$200.00</td>
                <td className="p-2 py-3">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AccountSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div className="border-b border-border pb-6">
          <h3 className="text-lg font-medium mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">First Name</label>
              <input
                type="text"
                value="John"
                className="w-full border border-border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Last Name</label>
              <input
                type="text"
                value="Doe"
                className="w-full border border-border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Email Address</label>
              <input
                type="email"
                value="john.doe@example.com"
                className="w-full border border-border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Phone Number</label>
              <input
                type="tel"
                value="+1 555 123 4567"
                className="w-full border border-border rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>
        
        <div className="border-b border-border pb-6">
          <h3 className="text-lg font-medium mb-4">Security</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                Change
              </button>
            </div>
            
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Enhance your account security</p>
                </div>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-3 py-1 rounded-lg">
                Enable
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive emails about your account activity</p>
              </div>
              <div className="relative inline-block w-10 h-6 rounded-full bg-primary">
                <input type="checkbox" checked className="sr-only" />
                <span className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform"></span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-xs text-muted-foreground">Receive text messages for important updates</p>
              </div>
              <div className="relative inline-block w-10 h-6 rounded-full bg-accent">
                <input type="checkbox" className="sr-only" />
                <span className="absolute left-1 top-1 bg-foreground w-4 h-4 rounded-full transition-transform transform"></span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AccountOverview from '@/components/account/AccountOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const Account = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">My Account</h1>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bets">My Bets</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <AccountOverview />
            </TabsContent>
            
            <TabsContent value="bets">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">My Betting History</h2>
                <p className="text-muted-foreground">View your detailed betting history here.</p>
                {/* Betting history component would go here */}
              </Card>
            </TabsContent>
            
            <TabsContent value="wallet">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Wallet</h2>
                <p className="text-muted-foreground">Manage your deposits and withdrawals.</p>
                {/* Wallet management component would go here */}
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
                <p className="text-muted-foreground">Update your profile and preferences.</p>
                {/* Settings component would go here */}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;

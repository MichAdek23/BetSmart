
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedEvents from '@/components/home/FeaturedEvents';
import PopularBets from '@/components/home/PopularBets';
import BetSlip from '@/components/ui/BetSlip';

const Index = () => {
  const [betSlip, setBetSlip] = useState<Array<{id: string; title: string; odds: string; stake?: number}>>([]);

  const handleAddToBetSlip = (id: string, title: string, odds: string) => {
    // Check if bet already exists in betslip
    if (!betSlip.some(bet => bet.id === id)) {
      setBetSlip(prev => [...prev, { id, title, odds, stake: 0 }]);
    }
  };

  const handleRemoveFromBetSlip = (id: string) => {
    setBetSlip(prev => prev.filter(bet => bet.id !== id));
  };

  const handleClearBetSlip = () => {
    setBetSlip([]);
  };

  const handleStakeChange = (id: string, stake: number) => {
    setBetSlip(prev => 
      prev.map(bet => bet.id === id ? { ...bet, stake } : bet)
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FeaturedEvents />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <PopularBets onSelectBet={handleAddToBetSlip} />
        </motion.div>
        
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold">Ready to Place Your Bet?</h2>
                <p className="text-muted-foreground">
                  Join thousands of smart bettors who are using our platform to make informed decisions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Create Account
                  </button>
                  <button className="bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-lg font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <BetSlip 
        bets={betSlip} 
        onRemove={handleRemoveFromBetSlip}
        onClearAll={handleClearBetSlip}
        onStakeChange={handleStakeChange}
      />
      
      <Footer />
    </div>
  );
};

export default Index;

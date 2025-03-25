
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, Calendar } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/ui/EventCard';
import BetSlip from '@/components/ui/BetSlip';

const Events = () => {
  const [searchParams] = useSearchParams();
  const [betSlip, setBetSlip] = useState<Array<{id: string; title: string; odds: string; stake?: number}>>([]);
  const [selectedSport, setSelectedSport] = useState<string>(searchParams.get('sport') || 'all');
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading events
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockEvents = [
        {
          id: "1",
          title: "Premier League: Liverpool vs Manchester City",
          league: "Premier League",
          teams: [
            { name: "Liverpool" },
            { name: "Manchester City" }
          ],
          date: "May 12, 2023",
          time: "3:00 PM",
          venue: "Anfield, Liverpool",
          attendance: "54,000",
          imageUrl: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2671&q=80",
          sport: "football"
        },
        {
          id: "2",
          title: "NBA Finals: Lakers vs Celtics",
          league: "NBA",
          teams: [
            { name: "LA Lakers" },
            { name: "Boston Celtics" }
          ],
          date: "June 15, 2023",
          time: "8:30 PM",
          venue: "Staples Center, Los Angeles",
          attendance: "20,000",
          imageUrl: "https://images.unsplash.com/photo-1518409612500-c0d326dc3563?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
          sport: "basketball"
        },
        {
          id: "3",
          title: "French Open Final: Nadal vs Djokovic",
          league: "ATP Grand Slam",
          teams: [
            { name: "Rafael Nadal" },
            { name: "Novak Djokovic" }
          ],
          date: "June 11, 2023",
          time: "2:00 PM",
          venue: "Roland Garros, Paris",
          attendance: "15,000",
          imageUrl: "https://images.unsplash.com/photo-1622279457486-28f993f814e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          sport: "tennis"
        },
        {
          id: "4",
          title: "MLB: Yankees vs Red Sox",
          league: "MLB",
          teams: [
            { name: "NY Yankees" },
            { name: "Boston Red Sox" }
          ],
          date: "June 20, 2023",
          time: "7:00 PM",
          venue: "Yankee Stadium, New York",
          attendance: "46,000",
          imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&auto=format&fit=crop&w=2626&q=80",
          sport: "baseball"
        },
        {
          id: "5",
          title: "La Liga: Barcelona vs Real Madrid",
          league: "La Liga",
          teams: [
            { name: "Barcelona" },
            { name: "Real Madrid" }
          ],
          date: "June 18, 2023",
          time: "9:00 PM",
          venue: "Camp Nou, Barcelona",
          attendance: "99,000",
          imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          sport: "football"
        },
        {
          id: "6",
          title: "NBA: Warriors vs Suns",
          league: "NBA",
          teams: [
            { name: "Golden State Warriors" },
            { name: "Phoenix Suns" }
          ],
          date: "June 22, 2023",
          time: "7:30 PM",
          venue: "Chase Center, San Francisco",
          attendance: "18,000",
          imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
          sport: "basketball"
        }
      ];

      // Filter events by selected sport if needed
      const filteredEvents = selectedSport === 'all' 
        ? mockEvents 
        : mockEvents.filter(event => event.sport === selectedSport);
      
      setEvents(filteredEvents);
      setIsLoading(false);
    }, 1000);
  }, [selectedSport]);

  const handleAddToBetSlip = (id: string, title: string) => {
    // Simulate random odds
    const odds = (Math.random() * 3 + 1).toFixed(2);
    
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

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Events</h1>
            <p className="text-muted-foreground max-w-3xl">
              Browse all upcoming sporting events and find the best odds for your bets.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSport === 'all' ? 'bg-primary text-white' : 'bg-white border border-border hover:bg-accent'
                }`}
                onClick={() => handleSportChange('all')}
              >
                All Sports
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSport === 'football' ? 'bg-primary text-white' : 'bg-white border border-border hover:bg-accent'
                }`}
                onClick={() => handleSportChange('football')}
              >
                Football
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSport === 'basketball' ? 'bg-primary text-white' : 'bg-white border border-border hover:bg-accent'
                }`}
                onClick={() => handleSportChange('basketball')}
              >
                Basketball
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSport === 'tennis' ? 'bg-primary text-white' : 'bg-white border border-border hover:bg-accent'
                }`}
                onClick={() => handleSportChange('tennis')}
              >
                Tennis
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSport === 'baseball' ? 'bg-primary text-white' : 'bg-white border border-border hover:bg-accent'
                }`}
                onClick={() => handleSportChange('baseball')}
              >
                Baseball
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="bg-white border border-border hover:bg-accent transition-colors px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="bg-white border border-border hover:bg-accent transition-colors px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Date
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-border animate-pulse h-80"></div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  league={event.league}
                  teams={event.teams}
                  date={event.date}
                  time={event.time}
                  venue={event.venue}
                  attendance={event.attendance}
                  imageUrl={event.imageUrl}
                  onClick={() => handleAddToBetSlip(event.id, event.title)}
                />
              ))}
            </motion.div>
          )}
          
          {events.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No events found for the selected filters.</p>
            </div>
          )}
        </div>
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

export default Events;

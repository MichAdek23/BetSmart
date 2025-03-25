
import React from 'react';
import { Sparkles } from 'lucide-react';
import BetCard from '../ui/BetCard';

interface PopularBetsProps {
  onSelectBet: (id: string, title: string, odds: string) => void;
}

const PopularBets: React.FC<PopularBetsProps> = ({ onSelectBet }) => {
  const popularBets = [
    {
      id: "1",
      title: "Premier League",
      team1: "Arsenal",
      team2: "Chelsea",
      odds: "1.75",
      time: "Today, 7:30 PM",
      league: "Premier League",
      imageUrl: "https://images.unsplash.com/photo-1601376554703-0af525a1b679?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      isPopular: true
    },
    {
      id: "2",
      title: "NBA Playoff",
      team1: "Miami Heat",
      team2: "Boston Celtics",
      odds: "2.10",
      time: "Tomorrow, 8:00 PM",
      league: "NBA",
      isPopular: true
    },
    {
      id: "3",
      title: "UFC 290",
      team1: "Jones",
      team2: "Miocic",
      odds: "1.55",
      time: "June 17, 10:00 PM",
      league: "UFC",
      isPopular: true
    },
    {
      id: "4",
      title: "French Open Final",
      team1: "Nadal",
      team2: "Djokovic",
      odds: "2.25",
      time: "June 11, 2:00 PM",
      league: "Tennis",
      isPopular: true
    },
    {
      id: "5",
      title: "Formula 1",
      team1: "Verstappen",
      team2: "Hamilton",
      odds: "1.90",
      time: "June 18, 3:00 PM",
      league: "F1 Monaco GP",
      imageUrl: "https://images.unsplash.com/photo-1607248166267-bfd382e04346?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      isPopular: true
    },
    {
      id: "6",
      title: "La Liga",
      team1: "Barcelona",
      team2: "Real Madrid",
      odds: "1.85",
      time: "June 20, 9:00 PM",
      league: "La Liga",
      isPopular: true
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-accent/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Popular Bets</h2>
            </div>
            <p className="text-muted-foreground">The most popular bets selected by our users</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">All</button>
            <button className="bg-white border border-border hover:bg-accent transition-colors px-4 py-2 rounded-lg text-sm font-medium">Football</button>
            <button className="bg-white border border-border hover:bg-accent transition-colors px-4 py-2 rounded-lg text-sm font-medium">Basketball</button>
            <button className="bg-white border border-border hover:bg-accent transition-colors px-4 py-2 rounded-lg text-sm font-medium">Tennis</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularBets.map((bet) => (
            <BetCard
              key={bet.id}
              id={bet.id}
              title={bet.title}
              team1={bet.team1}
              team2={bet.team2}
              odds={bet.odds}
              time={bet.time}
              league={bet.league}
              imageUrl={bet.imageUrl}
              isPopular={bet.isPopular}
              onSelect={onSelectBet}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBets;

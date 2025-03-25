
import React from 'react';
import { Sparkles, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BetCardProps {
  id: string;
  title: string;
  team1: string;
  team2: string;
  odds: string;
  time: string;
  league: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  imageUrl?: string;
  onSelect: (id: string, title: string, odds: string) => void;
}

const BetCard = ({
  id,
  title,
  team1,
  team2,
  odds,
  time,
  league,
  isFeatured = false,
  isPopular = false,
  imageUrl,
  onSelect
}: BetCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl shadow-sm border border-border overflow-hidden flex flex-col transition-all duration-300 card-hover",
        isFeatured && "md:col-span-2 md:row-span-2"
      )}
    >
      {imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-white text-xs font-medium bg-primary/90 px-2 py-0.5 rounded-full w-fit">
              {league}
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {isPopular && (
          <div className="inline-flex items-center mb-2 text-xs font-medium bg-accent/50 text-primary-foreground/80 px-2 py-0.5 rounded-full w-fit">
            <Sparkles className="h-3 w-3 mr-1" />
            Popular
          </div>
        )}
        
        <p className="text-sm text-muted-foreground">{time}</p>
        <h3 className="font-medium text-lg mt-1 mb-3">{title}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-foreground font-medium">{team1}</span>
          <span className="text-foreground/60">vs</span>
          <span className="text-foreground font-medium">{team2}</span>
        </div>
        
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center">
            <Percent className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-primary font-medium">{odds}</span>
          </div>
          
          <button 
            className="bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            onClick={() => onSelect(id, title, odds)}
          >
            Place Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetCard;

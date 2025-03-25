
import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedEventProps {
  id: string;
  title: string;
  league: string;
  description: string;
  date: string;
  time: string;
  teams: {
    name: string;
    logo?: string;
    odds: string;
  }[];
  imageUrl: string;
  className?: string;
  onViewDetails?: () => void;
}

const FeaturedEvent: React.FC<FeaturedEventProps> = ({
  id,
  title,
  league,
  description,
  date,
  time,
  teams,
  imageUrl,
  className,
  onViewDetails
}) => {
  return (
    <div className={cn(
      "relative rounded-xl overflow-hidden group border border-border shadow-lg card-hover",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10"></div>
      
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105" 
      />
      
      <div className="relative z-20 p-6 md:p-8 h-full flex flex-col">
        <div className="mb-2">
          <span className="bg-white/80 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded-full">
            {league}
          </span>
        </div>
        
        <h2 className="text-white text-2xl md:text-3xl font-medium mb-2">{title}</h2>
        
        <p className="text-white/80 mb-4 max-w-lg">{description}</p>
        
        <div className="flex items-center text-white/90 mb-6">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{date} - {time}</span>
        </div>
        
        <div className="mt-auto flex flex-col sm:flex-row items-stretch gap-4">
          {teams.map((team, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 flex-1 flex flex-col items-center"
            >
              <div className="flex items-center mb-2">
                {team.logo ? (
                  <img src={team.logo} alt={team.name} className="w-10 h-10 mr-3 rounded-full" />
                ) : (
                  <div className="w-10 h-10 bg-white/20 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {team.name.substring(0, 2)}
                    </span>
                  </div>
                )}
                <span className="text-white font-medium">{team.name}</span>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-white/70 mb-1">Odds</div>
                <div className="text-white font-medium">{team.odds}</div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="mt-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 transition-colors text-white rounded-lg px-4 py-2 flex items-center justify-center"
          onClick={onViewDetails}
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-1 animate-pulse-subtle" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedEvent;

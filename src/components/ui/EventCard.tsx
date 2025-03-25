
import React from 'react';
import { Trophy, Clock, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventCardProps {
  id: string;
  title: string;
  league: string;
  teams: {
    name: string;
    logo?: string;
  }[];
  date: string;
  time: string;
  venue?: string;
  imageUrl?: string;
  attendance?: string;
  className?: string;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  league,
  teams,
  date,
  time,
  venue,
  imageUrl,
  attendance,
  className,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-sm border border-border transition-all duration-300 card-hover cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {imageUrl && (
        <div className="h-48 overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/80 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded-full">
              {league}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-3">{title}</h3>
        
        <div className="flex items-center justify-between mb-4">
          {teams.map((team, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                {team.logo ? (
                  <img src={team.logo} alt={team.name} className="w-10 h-10 mb-1 rounded-full" />
                ) : (
                  <div className="w-10 h-10 bg-accent rounded-full mb-1 flex items-center justify-center">
                    <span className="text-foreground/60 font-medium">
                      {team.name.substring(0, 2)}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-center">{team.name}</span>
              </div>
              
              {index < teams.length - 1 && (
                <div className="w-10 h-10 flex items-center justify-center">
                  <span className="text-muted-foreground">vs</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{date} - {time}</span>
          </div>
          
          {venue && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{venue}</span>
            </div>
          )}
          
          {attendance && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>Attendance: {attendance}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

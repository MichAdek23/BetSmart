
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedEvent from '../ui/FeaturedEvent';

const FeaturedEvents = () => {
  const featuredEvents = [
    {
      id: "1",
      title: "Premier League: Liverpool vs Manchester City",
      league: "Premier League",
      description: "The title-deciding clash between two Premier League giants.",
      date: "May 12, 2023",
      time: "3:00 PM",
      teams: [
        {
          name: "Liverpool",
          odds: "2.20"
        },
        {
          name: "Man City",
          odds: "1.95"
        }
      ],
      imageUrl: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2671&q=80"
    },
    {
      id: "2",
      title: "NBA Finals: Lakers vs Celtics",
      league: "NBA",
      description: "Game 7 of the NBA Finals between historic rivals.",
      date: "June 15, 2023",
      time: "8:30 PM",
      teams: [
        {
          name: "Lakers",
          odds: "1.85"
        },
        {
          name: "Celtics",
          odds: "2.10"
        }
      ],
      imageUrl: "https://images.unsplash.com/photo-1518409612500-c0d326dc3563?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Events</h2>
          <Link to="/events" className="text-primary hover:text-primary/80 font-medium flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredEvents.map((event) => (
            <FeaturedEvent
              key={event.id}
              id={event.id}
              title={event.title}
              league={event.league}
              description={event.description}
              date={event.date}
              time={event.time}
              teams={event.teams}
              imageUrl={event.imageUrl}
              onViewDetails={() => console.log(`View details for ${event.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;

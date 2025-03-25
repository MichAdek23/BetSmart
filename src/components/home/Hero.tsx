
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Experience the Future of Betting",
      subtitle: "Intelligent, Intuitive, Revolutionary",
      cta: "Discover Events",
      image: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Every Game, Every Moment",
      subtitle: "The best odds for all your favorite sports",
      cta: "Place a Bet",
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Join the Winning Team",
      subtitle: "Smart bets, smarter insights, successful outcomes",
      cta: "Join Now",
      image: "https://images.unsplash.com/photo-1495434942214-9b525bba74e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-10"></div>
      
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.05
          }}
          transition={{ 
            opacity: { duration: 1 },
            scale: { duration: 6 }
          }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
      
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl space-y-6"
          >
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-white/90 text-xl md:text-2xl">
              {slides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center sm:justify-start">
                {slides[currentSlide].cta}
                <ChevronRight className="ml-1 h-5 w-5" />
              </button>
              
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-8" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

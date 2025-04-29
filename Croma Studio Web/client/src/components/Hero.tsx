import GradientBackground from './GradientBackground';
import { useEffect, useState, useRef } from 'react';

const TypewriterText = ({ text, delay = 100, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className={`${className} ${!isComplete ? 'after:content-[""] after:border-r-4 after:border-[#ff7043] after:h-8 after:ml-1 after:animate-[blink-caret_0.75s_step-end_infinite]' : ''}`}>
      {displayText}
    </span>
  );
};

const Hero = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
  useEffect(() => {
    // Show subtitle after title animation is mostly complete
    const titleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 2000);
    
    // Show buttons after subtitle animation starts
    const buttonTimer = setTimeout(() => {
      setShowButtons(true);
    }, 4000);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <GradientBackground />
      
      <div className="w-full max-w-4xl px-5 z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
          <TypewriterText 
            text="Personaliza tu Mundo" 
            className="inline-block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent shadow-white/10"
          />
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-white animate-[fadeInUp_1s_ease-out_forwards]">
          <TypewriterText 
            text="Transformamos tus ideas en productos únicos con la más alta calidad en sublimación y DTF" 
            delay={50}
            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white"
          />
        </p>
        
        {showButtons && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0">
            <a 
              href="#productos" 
              className="relative inline-block px-8 py-3 bg-[#ff7043] text-white rounded-lg font-medium transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-[#E64A19] overflow-hidden group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
              <span className="relative z-10 flex items-center justify-center">
                <i className="fas fa-shopping-bag mr-2"></i>
                Ver Catálogo
              </span>
            </a>
            <a 
              href="#contacto" 
              className="relative inline-block px-8 py-3 bg-white text-[#2180de] rounded-lg font-medium transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-gray-100 mt-3 sm:mt-0 overflow-hidden group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#2180de]/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
              <span className="relative z-10 flex items-center justify-center">
                <i className="fas fa-envelope mr-2"></i>
                Contactar
              </span>
            </a>
          </div>
        )}
      </div>
      
      {/* Floating elements with animations */}
      <div className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => (
          <div 
            key={index} 
            className="absolute w-2 h-2 bg-white rounded-full animate-float"
            style={{ 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${Math.random() * 2 + 0.5})`
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

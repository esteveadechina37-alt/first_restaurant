import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center animate-fade-in">
      <div className="text-center">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center animate-bounce">
          <span className="text-6xl">🍽️</span>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Saveur Bénin
        </h1>
        
        {/* Tagline */}
        <p className="text-gray-600 text-lg">
          Bienvenue dans l'univers gastronomique béninois
        </p>

        {/* Loading indicator */}
        <div className="mt-8 flex justify-center gap-1">
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

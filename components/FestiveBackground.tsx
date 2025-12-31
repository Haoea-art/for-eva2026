
import React from 'react';

const FestiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {/* Animated Mesh Gradients using Google colors */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] blur-[120px] rounded-full opacity-30 animate-pulse"
        style={{ backgroundColor: '#4285F4', animationDuration: '8s' }} 
      />
      <div 
        className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full opacity-20 animate-pulse"
        style={{ backgroundColor: '#34A853', animationDuration: '10s', animationDelay: '1s' }} 
      />
      <div 
        className="absolute bottom-[-10%] left-[10%] w-[55%] h-[55%] blur-[120px] rounded-full opacity-25 animate-pulse"
        style={{ backgroundColor: '#FBBC05', animationDuration: '12s', animationDelay: '2s' }} 
      />
      <div 
        className="absolute bottom-[10%] right-[10%] w-[45%] h-[45%] blur-[120px] rounded-full opacity-20 animate-pulse"
        style={{ backgroundColor: '#EA4335', animationDuration: '9s', animationDelay: '0.5s' }} 
      />
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default FestiveBackground;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function VintageGlowingBulb() {
  const [isOn, setIsOn] = useState(true);
  const [brightness] = useState(80); // 0 to 100
  const [flickerIntensity, setFlickerIntensity] = useState(1);
  const [voltageFluctuation, setVoltageFluctuation] = useState(false);

  // Random voltage fluctuations (flickering of a vintage grid)
  useEffect(() => {
    if (!isOn) return;

    const interval = setInterval(() => {
      // 10% chance of a vintage fluctuation
      if (Math.random() < 0.12) {
        setVoltageFluctuation(true);
        // Short flicker sequence
        let count = 0;
        const flickerInterval = setInterval(() => {
          setFlickerIntensity(Math.random() * 0.4 + 0.6);
          count++;
          if (count > 3) {
            clearInterval(flickerInterval);
            setFlickerIntensity(1);
            setVoltageFluctuation(false);
          }
        }, 80);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isOn]);

  // Click to toggle
  const toggleLight = () => {
    setIsOn(!isOn);
  };

  // Turn key click action
  const [keyRotation, setKeyRotation] = useState(0);
  const turnKey = () => {
    setKeyRotation(prev => prev + 90);
    toggleLight();
  };

  // Calculate current ambient opacity and colors
  const activeBrightness = isOn ? (brightness / 100) * flickerIntensity : 0;
  
  // Custom bulb swing motion transition
  const swingTransition = {
    duration: 8,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse" as const,
  };

  return (
    <div className="absolute right-2 md:right-8 top-0 h-[480px] w-64 z-40 pointer-events-none select-none flex flex-col items-center">
      
      {/* 1. Large Ambient Warm Radial Glow Cast onto the Wooden Table Background */}
      <div 
        className="absolute top-44 w-[450px] h-[450px] rounded-full pointer-events-none transition-opacity duration-300 mix-blend-color-dodge filter blur-3xl"
        style={{
          opacity: activeBrightness * 0.45,
          background: `radial-gradient(circle, rgba(253, 186, 116, 0.4) 0%, rgba(249, 115, 22, 0.08) 50%, rgba(0,0,0,0) 80%)`,
          transform: "translate3d(0, -50px, 0)"
        }}
      />

      {/* 2. Hanging Cable and Assembly with gentle sway */}
      <motion.div
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={swingTransition}
        className="relative flex flex-col items-center origin-top w-full h-full pointer-events-none"
        style={{ originY: 0 }}
      >
        {/* Braided Vintage Textile Cord */}
        <div className="w-1.5 h-24 bg-gradient-to-r from-coffee-dark via-[#1a120b] to-coffee-dark border-x border-[#3a281a]/40 shadow-md relative">
          {/* Braiding spiral texture overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#2e1a0c_25%,transparent_25%,transparent_50%,#2e1a0c_50%,#2e1a0c_75%,transparent_75%,transparent)] bg-[length:6px_6px] opacity-40" />
        </div>

        {/* Vintage Heavy Brass Socket Assembly */}
        <div className="relative flex flex-col items-center -mt-1 z-10">
          
          {/* Antique Cap */}
          <div className="w-10 h-6 rounded-t-md bg-gradient-to-r from-[#8a7355] via-[#d4af37] to-[#735e43] border border-[#5c4a33] shadow-sm" />
          
          {/* Screw Thread Collar */}
          <div className="w-8 h-3 bg-gradient-to-r from-[#6e5c44] via-[#b59632] to-[#5c4a33] border-x border-b border-[#4d3d2a] flex flex-col justify-between p-[1px]">
            <div className="h-[1px] bg-black/20" />
            <div className="h-[1px] bg-black/20" />
          </div>

          {/* Core Socket Housing */}
          <div className="w-12 h-14 bg-gradient-to-r from-[#7d684d] via-[#e4c25a] to-[#69553c] border border-[#524432] rounded-b shadow-md relative flex flex-col items-center justify-between py-1">
            
            {/* Antique Turn Key Switch (Rotatable) */}
            <motion.div 
              className="absolute -right-5 top-4 w-7 h-5 cursor-pointer z-20 flex items-center pointer-events-auto"
              onClick={turnKey}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Key Shaft */}
              <div className="w-3 h-1 bg-gradient-to-b from-[#b59632] to-[#5c4a33] border border-[#443625]" />
              {/* Key Wing Thumb Turn */}
              <motion.div 
                animate={{ rotate: keyRotation }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-4 h-5 rounded-full bg-gradient-to-r from-[#cfa93c] via-[#ecd57f] to-[#8c712e] border border-[#5c4a33] shadow-sm flex items-center justify-center"
              >
                <div className="w-[1px] h-3 bg-black/10" />
              </motion.div>
            </motion.div>

            {/* Embossed Branding Text */}
            <span className="text-[5px] font-mono text-[#5c4a33] tracking-widest mt-0.5 uppercase">EDISON</span>
            <div className="w-8 h-[1px] bg-[#5c4a33]/20" />
            <span className="text-[5px] font-mono text-[#5c4a33]/80">120V PAT.</span>
          </div>

          {/* Black Rubber Insulator Collar */}
          <div className="w-9 h-2 bg-[#1a1a1a] rounded-t-sm" />
        </div>

        {/* 3. The Teardrop Glass Edison Bulb Envelope */}
        <div className="relative -mt-1 cursor-pointer pointer-events-auto" onClick={toggleLight}>
          
          {/* Outer SVG for high quality glass rendering and filaments */}
          <svg 
            width="130" 
            height="180" 
            viewBox="0 0 130 180" 
            className="drop-shadow-2xl overflow-visible"
          >
            <defs>
              {/* Filament Intense Neon Glow Filter */}
              <filter id="bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="blur1" />
                <feGaussianBlur stdDeviation="5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Soft Ambient Internal Gas Glow */}
              <radialGradient id="gas-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fdba74" stopOpacity={activeBrightness * 0.65} />
                <stop offset="60%" stopColor="#ea580c" stopOpacity={activeBrightness * 0.2} />
                <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
              </radialGradient>

              {/* Glass Rim Metallic Reflection */}
              <linearGradient id="glass-reflection" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="25%" stopColor="white" stopOpacity="0.03" />
                <stop offset="75%" stopColor="black" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* A. Soft internal gas light filling the glass */}
            <circle cx="65" cy="100" r="55" fill="url(#gas-glow)" className="pointer-events-none" />

            {/* B. Internal Glass Stem/Support */}
            <g stroke="#5c4e3e" strokeWidth="1" fill="none" opacity="0.65">
              {/* Central Glass Pillar */}
              <line x1="65" y1="20" x2="65" y2="75" strokeWidth="2.5" stroke="#8a7c6a" />
              {/* Support hooks extending to filament */}
              <path d="M65,55 L40,75" strokeWidth="0.8" />
              <path d="M65,55 L90,75" strokeWidth="0.8" />
              <path d="M65,40 L35,115" strokeWidth="0.6" />
              <path d="M65,40 L95,115" strokeWidth="0.6" />
            </g>

            {/* C. The SQUIRREL CAGE FILAMENT (Incandescent Magic) */}
            <AnimatePresence>
              {isOn && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeBrightness }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none"
                >
                  {/* Glowing core filament trace */}
                  <path
                    d="M 45,130 
                       L 35,115 
                       L 40,75 
                       L 55,68 
                       L 65,74 
                       L 75,68 
                       L 90,75 
                       L 95,115 
                       L 85,130"
                    fill="none"
                    stroke="#ffedd5"
                    strokeWidth="1.4"
                    filter="url(#bulb-glow)"
                    style={{
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    }}
                  />
                  
                  {/* Intense center burning yellow core */}
                  <path
                    d="M 45,130 
                       L 35,115 
                       L 40,75 
                       L 55,68 
                       L 65,74 
                       L 75,68 
                       L 90,75 
                       L 95,115 
                       L 85,130"
                    fill="none"
                    stroke="#fed7aa"
                    strokeWidth="0.6"
                    style={{
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    }}
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* D. Outer Teardrop Glass Envelope Contour */}
            <path
              d="M 48,20 
                 C 48,12 30,30 30,75 
                 C 30,115 45,145 65,145 
                 C 85,145 100,115 100,75 
                 C 100,30 82,12 82,20
                 Z"
              fill="url(#glass-reflection)"
              stroke="#5c4e3e"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />

            {/* E. Classy glare reflections on the outer sphere */}
            <path
              d="M 36,55 C 33,75 36,95 44,110"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.22"
            />
            
            <path
              d="M 94,55 C 97,75 94,95 86,110"
              fill="none"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.1"
            />

            <path
              d="M 65,141 C 55,141 44,130 40,120"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.15"
            />

            <ellipse cx="65" cy="144" rx="3.5" ry="1.5" fill="#3a2f22" opacity="0.6" />
          </svg>

          {/* F. Dynamic light ray streaks shooting outwards */}
          {isOn && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div 
                className="w-1.5 h-1.5 bg-amber-200 rounded-full animate-ping"
                style={{
                  transform: "scale(25)",
                  opacity: activeBrightness * 0.1,
                  animationDuration: "3s"
                }}
              />
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}

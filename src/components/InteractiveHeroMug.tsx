import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SteamParticle {
  id: number;
  type: "steam" | "binary" | "bird" | "leaf";
  content: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export default function InteractiveHeroMug() {
  const [particles, setParticles] = useState<SteamParticle[]>([]);
  const [morphMode, setMorphMode] = useState<"steam" | "binary" | "bird" | "leaf">("steam");
  const [isHovered, setIsHovered] = useState(false);

  // Cycle morph modes every 6 seconds automatically
  useEffect(() => {
    const modes: ("steam" | "binary" | "bird" | "leaf")[] = ["steam", "binary", "bird", "leaf"];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % modes.length;
      setMorphMode(modes[currentIndex]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Spawn particles at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      let content = "";
      
      if (morphMode === "binary") {
        content = Math.random() > 0.5 ? "0" : "1";
      } else if (morphMode === "bird") {
        content = "🕊️"; // bird
      } else if (morphMode === "leaf") {
        content = "🌿"; // leaf
      } else {
        content = "░"; // misty steam particle
      }

      const newParticle: SteamParticle = {
        id,
        type: morphMode,
        content,
        // Small horizontal deviation around the center
        x: Math.random() * 24 - 12,
        y: 0,
        rotation: Math.random() * 40 - 20,
        scale: Math.random() * 0.4 + 0.6,
      };

      setParticles((prev) => [...prev.slice(-25), newParticle]);
    }, 800);

    return () => clearInterval(interval);
  }, [morphMode]);

  // Click to manually cycle steam mode
  const handleMugClick = () => {
    const modes: ("steam" | "binary" | "bird" | "leaf")[] = ["steam", "binary", "bird", "leaf"];
    const nextIndex = (modes.indexOf(morphMode) + 1) % modes.length;
    setMorphMode(modes[nextIndex]);

    // Spawn extra particles immediately on click!
    const extra: SteamParticle[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      type: modes[nextIndex],
      content: modes[nextIndex] === "binary" 
        ? (Math.random() > 0.5 ? "1" : "0") 
        : modes[nextIndex] === "bird" ? "🕊️" : modes[nextIndex] === "leaf" ? "🌿" : "░",
      x: Math.random() * 40 - 20,
      y: 0,
      rotation: Math.random() * 60 - 30,
      scale: Math.random() * 0.5 + 0.5,
    }));
    setParticles((prev) => [...prev.slice(-20), ...extra]);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 select-none">
      
      {/* Particle Space above Mug */}
      <div className="relative w-64 h-48 flex items-end justify-center overflow-visible">
        {/* Steam Mode Label */}
        <div className="absolute top-4 bg-coffee-ivory/80 px-2.5 py-0.5 rounded text-[10px] font-mono text-coffee-brown tracking-wider border border-coffee-foam/30 uppercase shadow-sm">
          Steam: <span className="font-semibold text-coffee-caramel">{morphMode}</span>
        </div>

        {/* Animate floating particles */}
        <AnimatePresence>
          {particles.map((p) => {
            let isTextSymbol = p.type !== "steam";
            return (
              <motion.div
                key={p.id}
                initial={{ 
                  opacity: 0, 
                  x: p.x, 
                  y: -10, 
                  scale: p.scale * 0.5,
                  rotate: p.rotation
                }}
                animate={{ 
                  opacity: [0, 0.6, 0.4, 0],
                  y: -180,
                  x: p.x + (p.type === "bird" ? 40 : p.type === "leaf" ? -30 : Math.sin(p.id) * 15),
                  scale: [p.scale * 0.5, p.scale * 1.2, p.scale * 1.5, p.scale * 0.3],
                  rotate: p.rotation + (p.type === "bird" ? -20 : p.type === "leaf" ? 90 : 20)
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: p.type === "bird" ? 3.5 : 4.5, 
                  ease: "easeOut" 
                }}
                className={`absolute pointer-events-none select-none font-mono ${
                  isTextSymbol 
                    ? p.type === "binary" 
                      ? "text-coffee-brown/55 text-xs"
                      : "text-coffee-forest/70 text-sm"
                    : "text-coffee-foam/25 text-lg filter blur-[2px]"
                }`}
              >
                {p.content}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Dynamic rising mist (SVG path animation for standard steam backdrop) */}
        <svg className="absolute bottom-4 w-28 h-32 text-coffee-foam/15 pointer-events-none" viewBox="0 0 100 100">
          <path
            className="steam-path"
            d="M 30,90 Q 20,70 40,50 T 30,10 Q 50,5 60,30 T 40,90"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="steam-path"
            style={{ animationDelay: "1.8s" }}
            d="M 50,90 Q 60,70 40,50 T 60,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="steam-path"
            style={{ animationDelay: "3.2s" }}
            d="M 40,85 Q 30,65 50,45 T 45,15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Ceramic Mug Body */}
      <motion.div
        onClick={handleMugClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative cursor-pointer group flex flex-col items-center"
      >
        {/* Soft shadow below cup */}
        <div className="absolute -bottom-2 w-40 h-5 bg-coffee-black/15 rounded-full filter blur-md transform scale-x-90 group-hover:scale-x-100 transition-all duration-300" />
        
        {/* Saucer */}
        <div className="relative w-44 h-7 bg-[#E6DEC9] border-b-2 border-[#D3C8AD] rounded-full flex items-center justify-center shadow-inner">
          <div className="w-32 h-4 bg-[#DCD4BF] border border-[#CFC5AC]/50 rounded-full" />
        </div>

        {/* Cup Body - placed above saucer */}
        <div className="absolute bottom-3 w-28 h-20 bg-[#ECE5D3] border-x border-b border-[#D8CEB6] rounded-b-[2rem] flex flex-col items-center justify-start overflow-hidden shadow-md">
          {/* Speckled handmade ceramic pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6f4e37_1px,transparent_1px)] [background-size:8px_8px]" />
          
          {/* Natural lighting gradients on cup */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/30 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/10 to-transparent" />
          
          {/* Handmade glaze ring at top */}
          <div className="w-full h-1.5 bg-[#D7C2A4] border-b border-[#BFA785]" />

          {/* Coffee liquid line inside (visible if tilted, mock rim) */}
          <div className="w-full h-1 bg-[#6F4E37]/80" />

          {/* Minimal botanical imprint on cup */}
          <div className="flex-1 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-300 select-none">
            <svg className="w-6 h-6 text-coffee-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22C12 22 12 17 8 13" />
              <path d="M12 22C12 22 12 17 16 13" />
              <path d="M12 22V8" />
              <path d="M12 8C12 8 8 5 8 2" />
              <path d="M12 8C12 8 16 5 16 2" />
            </svg>
          </div>
        </div>

        {/* Cup Handle */}
        <div className="absolute bottom-5 right-2 w-7 h-11 border-[6px] border-[#ECE5D3] group-hover:border-[#F2ECDC] border-l-transparent rounded-r-full shadow-sm transform translate-x-5 -rotate-6 transition-all duration-300" />
      </motion.div>

      {/* Helper text */}
      <div className="mt-4 text-[11px] font-mono text-coffee-brown/60 text-center italic tracking-wide">
        *Click the cup to stir the steam
      </div>
    </div>
  );
}

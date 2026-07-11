import React from "react";
import { motion } from "motion/react";

interface FlipItem {
  id: number;
  direction: "right-to-left" | "left-to-right";
  delay: number;
  duration: number;
  index: number;
  total: number;
}

interface PageFlipTransitionProps {
  flipQueue: FlipItem[];
  paperOverlayMode?: string;
}

export default function PageFlipTransition({
  flipQueue,
  paperOverlayMode = "watercolor"
}: PageFlipTransitionProps) {
  if (flipQueue.length === 0) return null;

  return (
    <div 
      className="absolute inset-0 w-full h-full z-40 pointer-events-none overflow-visible"
      style={{ perspective: "2200px", transformStyle: "preserve-3d" }}
    >
      {flipQueue.map((flip) => (
        <FlippingSheet 
          key={flip.id} 
          flip={flip} 
          paperOverlayMode={paperOverlayMode} 
        />
      ))}
    </div>
  );
}

function FlippingSheet({
  flip,
  paperOverlayMode
}: {
  key?: number | string;
  flip: FlipItem;
  paperOverlayMode: string;
}) {
  const isForward = flip.direction === "right-to-left";

  // Define 3D rotation keyframes and curl (skewY) simulation for realistic bending
  const rotateYKeyframes = isForward ? [0, -90, -180] : [-180, -90, 0];
  // A real page bends as it's flipped, creating a curl at the 90-degree midpoint
  const skewYKeyframes = isForward ? [0, -2, 0] : [0, 2, 0];
  // Slightly scale down and up during the peak of the flip to simulate depth and gravity
  const scaleKeyframes = [1, 1.01, 1];
  // Slight translation on X axis to keep the binding tight
  const xKeyframes = isForward ? [0, -4, 0] : [0, -4, 0];

  return (
    <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
      
      {/* 1. Underlying Casting Desk Shadow: mimic physical page shadow onto the background using lightweight gradient instead of expensive blur-xl */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{
          opacity: [0, 0.35, 0],
          scaleX: isForward ? [1, 0.6, 0.3] : [0.3, 0.6, 1],
          skewY: isForward ? [0, -2, 0] : [0, 2, 0],
          x: isForward ? [0, -30, -60] : [-60, -30, 0],
        }}
        transition={{
          duration: flip.duration,
          delay: flip.delay,
          ease: "easeInOut",
        }}
        className="absolute inset-y-4 left-0 w-1/2 bg-gradient-to-r from-coffee-dark/20 to-transparent origin-left rounded-lg z-10 pointer-events-none will-change-transform"
      />

      {/* 2. The 3D Flipping Sheet */}
      <motion.div
        initial={{ 
          rotateY: isForward ? 0 : -180, 
          skewY: 0, 
          scale: 1,
          x: 0,
          z: 0 
        }}
        animate={{ 
          rotateY: rotateYKeyframes, 
          skewY: skewYKeyframes,
          scale: scaleKeyframes,
          x: xKeyframes,
          z: [0, 60, 0]
        }}
        transition={{
          duration: flip.duration,
          delay: flip.delay,
          ease: [0.25, 1, 0.5, 1], // Custom physical easing (quintic out)
        }}
        className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
        style={{ 
          transformOrigin: "left center",
          transformStyle: "preserve-3d"
        }}
      >
        {/* ================= FRONT FACE OF PAPER ================= */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between p-6 rounded-r border-r border-y border-coffee-foam/25 shadow-sm pointer-events-none overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            backgroundColor: paperOverlayMode === "watercolor" ? "#F5EFE4" : "#EDE4D3"
          }}
        >
          {/* Subtle spine shadow crease */}
          <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-coffee-dark/10 to-transparent pointer-events-none" />

          {/* Aesthetic sketches to show the page turning details */}
          <div className="relative z-10 flex flex-col h-full justify-between opacity-35 select-none">
            {/* Header outline */}
            <div className="flex justify-between text-[7px] font-mono tracking-widest text-coffee-brown/40 border-b border-coffee-foam/15 pb-1.5 uppercase">
              <span>LEDGER SPEC SHEET</span>
              <span>INDEX {flip.index + 1}/{flip.total}</span>
            </div>

            {/* Fine Ink Sketch Branch or Coordinates */}
            <div className="my-auto flex flex-col items-center justify-center">
              <svg className="w-12 h-24 text-coffee-forest/20" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="0.8">
                <path d="M50,180 Q50,90 20,30" />
                <path d="M50,130 Q60,110 75,80" />
                <circle cx="20" cy="30" r="1" fill="currentColor" />
                <circle cx="75" cy="80" r="1" fill="currentColor" />
              </svg>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-[6px] font-mono text-coffee-brown/40 border-t border-coffee-foam/15 pt-1.5 uppercase">
              <span>WABI-SABI DESIGN</span>
              <span>PAGE {flip.index + 1}</span>
            </div>
          </div>

          {/* Glare and shading reflection sweep over the front side (using fast translateX instead of backgroundPosition) */}
          <motion.div 
            animate={{
              opacity: isForward ? [0, 0.25, 0] : [0, 0.08, 0],
              x: isForward ? ["-100%", "100%"] : ["100%", "-100%"]
            }}
            transition={{
              duration: flip.duration,
              delay: flip.delay,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none will-change-transform"
          />

          {/* Progressive curl bending shading overlay */}
          <motion.div 
            animate={{
              opacity: isForward ? [0, 0.25, 0.05] : [0.05, 0.25, 0]
            }}
            transition={{
              duration: flip.duration,
              delay: flip.delay,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-coffee-dark/15 via-transparent to-coffee-dark/5 pointer-events-none will-change-opacity"
          />
        </div>

        {/* ================= BACK FACE OF PAPER ================= */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between p-6 rounded-l border-l border-y border-coffee-foam/25 shadow-sm pointer-events-none overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: paperOverlayMode === "watercolor" ? "#F5EFE4" : "#EDE4D3"
          }}
        >
          {/* Subtle spine shadow crease on reverse */}
          <div className="absolute inset-y-0 right-0 w-2.5 bg-gradient-to-l from-coffee-dark/10 to-transparent pointer-events-none" />

          {/* Elegant decorative reverse details */}
          <div className="relative z-10 flex flex-col h-full justify-between opacity-35 select-none">
            {/* Header */}
            <div className="flex justify-between text-[7px] font-mono tracking-widest text-coffee-brown/40 border-b border-coffee-foam/15 pb-1.5 uppercase">
              <span>FOLIO RECORD REVERSE</span>
              <span>INDEX {flip.index + 1}/{flip.total}</span>
            </div>

            {/* Architectural Blueprint coordinates */}
            <div className="my-auto flex flex-col items-center justify-center">
              <div className="w-12 h-12 border border-dashed border-coffee-brown/15 rounded flex items-center justify-center relative">
                <svg className="w-8 h-8 text-coffee-brown/15" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.5" />
                  <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.4" />
                  <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.4" />
                </svg>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-[6px] font-mono text-coffee-brown/40 border-t border-coffee-foam/15 pt-1.5 uppercase">
              <span>MONSOON SYSTEMS</span>
              <span>REVERSE</span>
            </div>
          </div>

          {/* Glare and shading reflection sweep over the back side */}
          <motion.div 
            animate={{
              opacity: isForward ? [0, 0.08, 0] : [0, 0.25, 0],
              x: isForward ? ["100%", "-100%"] : ["-100%", "100%"]
            }}
            transition={{
              duration: flip.duration,
              delay: flip.delay,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent pointer-events-none will-change-transform"
          />

          {/* Bending shadow gradient overlay */}
          <motion.div 
            animate={{
              opacity: isForward ? [0.05, 0.25, 0] : [0, 0.25, 0.05]
            }}
            transition={{
              duration: flip.duration,
              delay: flip.delay,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-l from-coffee-dark/15 via-transparent to-coffee-dark/5 pointer-events-none will-change-opacity"
          />
        </div>

      </motion.div>
    </div>
  );
}

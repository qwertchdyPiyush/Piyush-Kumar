import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Coffee, Leaf, Feather, BookOpen, Terminal, Cpu, Layers, 
  Compass, Paperclip, Sparkles, Code, Hammer, Award, Send, 
  Github, Linkedin, Mail, ExternalLink, ChevronRight, FileText
} from "lucide-react";

import { ColorSwatch, TextureSample, ToolItem } from "./types";
import InteractiveHeroMug from "./components/InteractiveHeroMug";
import AIJournalTypewriter from "./components/AIJournalTypewriter";
import PageFlipTransition from "./components/PageFlipTransition";
import VintageGlowingBulb from "./components/VintageGlowingBulb";

// Dynamic Generated Image Paths
const IMAGES = {
  coffeeShopStreet: "/src/assets/images/coffee_shop_sketch_1783712682758.jpg",
  openNotebookJournal: "/src/assets/images/journal_notes_illustration_1783712695398.jpg",
  topDownLatte: "/src/assets/images/coffee_latte_cup_1783712708068.jpg"
};

// Design system data
const COLOR_PALETTE: ColorSwatch[] = [
  { name: "Background", hex: "#F8F4EC", bgClass: "bg-[#F8F4EC]", description: "The silent off-white studio base" },
  { name: "Cream", hex: "#F6F1E8", bgClass: "bg-[#F6F1E8]", description: "Premium wabi-sabi cotton fiber paper" },
  { name: "Warm Ivory", hex: "#EFE7D8", bgClass: "bg-[#EFE7D8]", description: "Aged parchment journal leaf" },
  { name: "Bleached Paper", hex: "#E9DFC9", bgClass: "bg-[#E9DFC9]", description: "Deckled letterpress stock" },
  { name: "Coffee Foam", hex: "#D7C2A4", bgClass: "bg-[#D7C2A4]", description: "Creamy foam ring stain tone" },
  { name: "Latte", hex: "#C8A27A", bgClass: "bg-[#C8A27A]", description: "Soft clay earth accent" },
  { name: "Caramel", hex: "#A97042", bgClass: "bg-[#A97042]", description: "Warm timber and leather notes" },
  { name: "Coffee Brown", hex: "#6F4E37", bgClass: "bg-[#6F4E37]", description: "Deep roasted aromatic base" },
  { name: "Dark Chocolate", hex: "#3B2B24", bgClass: "bg-[#3B2B24]", description: "Rich ironwood and ink shadow" },
  { name: "Forest Green Accent", hex: "#4A6446", bgClass: "bg-[#4A6446]", description: "Botanical leaves and moss" },
  { name: "Warm Black", hex: "#1E1C1A", bgClass: "bg-[#1E1C1A]", description: "Premium typography and iron clips" }
];

const TEXTURE_SAMPLES: TextureSample[] = [
  { id: "watercolor", name: "Watercolor", description: "Fibrous watercolor pulp tooth wash", cssClass: "watercolor-paper" },
  { id: "aged", name: "Aged Journal", description: "Slightly stained paper sheet lines", cssClass: "aged-journal" },
  { id: "deckled", name: "Deckled", description: "Deckled edges & torn notebook fibers", cssClass: "torn-edge-right" },
  { id: "cotton", name: "Cotton", description: "Handmade cotton paper fiber texture", cssClass: "paper-fiber-overlay" },
  { id: "stain", name: "Coffee Rings", description: "Hand-poured filter coffee stains", cssClass: "coffee-ring-overlay" }
];

// Tech stack / tools data
const TECH_STACK: ToolItem[] = [
  // Languages
  { name: "Python", icon: "🐍", level: "Senior / 5 Yrs", category: "languages" },
  { name: "C++", icon: "⚙️", level: "Expert / 4 Yrs", category: "languages" },
  { name: "C#", icon: "🎯", level: "Advanced / 3 Yrs", category: "languages" },
  { name: "JavaScript", icon: "⚡", level: "Expert / 6 Yrs", category: "languages" },
  { name: "TypeScript", icon: "🛡️", level: "Expert / 4 Yrs", category: "languages" },
  { name: "Go", icon: "🐹", level: "Intermediate / 2 Yrs", category: "languages" },
  { name: "Rust", icon: "🦀", level: "Intermediate / 1 Yr", category: "languages" },
  { name: "SQL", icon: "📊", level: "Advanced / 5 Yrs", category: "languages" },

  // Frameworks
  { name: "React / Vite", icon: "⚛️", level: "Expert / 5 Yrs", category: "frameworks" },
  { name: "Next.js", icon: "▲", level: "Advanced / 3 Yrs", category: "frameworks" },
  { name: "Express / Node", icon: "🟢", level: "Expert / 5 Yrs", category: "frameworks" },
  { name: "Django", icon: "🦄", level: "Advanced / 3 Yrs", category: "frameworks" },
  { name: "Tailwind CSS", icon: "🎨", level: "Expert / 5 Yrs", category: "frameworks" },

  // Databases
  { name: "PostgreSQL", icon: "🐘", level: "Advanced / 4 Yrs", category: "databases" },
  { name: "SQLite", icon: "🗃️", level: "Expert / 5 Yrs", category: "databases" },
  { name: "Redis", icon: "❤️", level: "Intermediate / 2 Yrs", category: "databases" },

  // Dev Tools
  { name: "Git", icon: "🌿", level: "Expert / 6 Yrs", category: "tools" },
  { name: "Docker", icon: "🐳", level: "Advanced / 3 Yrs", category: "tools" },
  { name: "Linux / Bash", icon: "🐧", level: "Expert / 5 Yrs", category: "tools" },
  { name: "Neovim", icon: "⌨️", level: "Senior / 4 Yrs", category: "tools" },

  // Design
  { name: "Figma", icon: "📐", level: "Advanced / 4 Yrs", category: "design" },
  { name: "Ink & Quill", icon: "✒️", level: "Hobbyist / 10 Yrs", category: "design" },
  { name: "Letterpress Spec", icon: "🔤", level: "Intermediate / 2 Yrs", category: "design" },

  // Cloud
  { name: "Google Cloud", icon: "☁️", level: "Advanced / 3 Yrs", category: "cloud" },
  { name: "AWS", icon: "🍊", level: "Intermediate / 2 Yrs", category: "cloud" }
];

// ==================== VISUAL WABI-SABI PAPERCRAFT ASSETS ====================

// Elegant vector pressed pansy flower
const PressedPansy = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full text-coffee-forest" fill="none" strokeWidth="0.8">
      {/* Pressed dried stem */}
      <path d="M50 48 Q47 75 42 96" stroke="#4A6446" strokeWidth="1.2" strokeLinecap="round" />
      {/* Pansy petals with warm dry colors */}
      <path d="M50 45 C35 25 22 40 45 50 Z" fill="rgba(111, 78, 55, 0.45)" stroke="rgba(111, 78, 55, 0.6)" />
      <path d="M50 45 C65 25 78 40 55 50 Z" fill="rgba(169, 112, 66, 0.35)" stroke="rgba(169, 112, 66, 0.5)" />
      <path d="M50 45 C30 55 42 70 50 50 Z" fill="rgba(200, 162, 122, 0.3)" stroke="rgba(200, 162, 122, 0.4)" />
      <path d="M50 45 C70 55 58 70 50 50 Z" fill="rgba(111, 78, 55, 0.3)" stroke="rgba(111, 78, 55, 0.5)" />
      <path d="M50 32 C40 15 60 15 50 32 Z" fill="rgba(74, 100, 70, 0.25)" stroke="rgba(74, 100, 70, 0.4)" />
      <circle cx="50" cy="45" r="3" fill="#D7C2A4" />
    </svg>
  </div>
);

// Elegant vector pressed fern leaf
const PressedFern = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 200" className="w-full h-full text-coffee-forest" fill="none" strokeWidth="0.8">
      {/* Main leaf stem */}
      <path d="M50 190 Q48 95 46 15" stroke="#4A6446" strokeWidth="1.5" strokeLinecap="round" />
      {/* Feathery organic pinnae */}
      {Array.from({ length: 11 }).map((_, i) => {
        const y = 30 + i * 14;
        const length = 38 - i * 2.5;
        return (
          <g key={i}>
            <path d={`M48 ${y} Q${48 - length} ${y - 12} ${48 - length + 6} ${y - 4}`} stroke="#4A6446" strokeWidth="1" strokeLinecap="round" />
            <path d={`M48 ${y} Q${48 + length} ${y - 12} ${48 + length - 6} ${y - 4}`} stroke="#4A6446" strokeWidth="1" strokeLinecap="round" />
            {/* Tiny leaves */}
            <circle cx={48 - length + 6} cy={y - 4} r="1.5" fill="rgba(74, 100, 70, 0.12)" />
            <circle cx={48 + length - 6} cy={y - 4} r="1.5" fill="rgba(74, 100, 70, 0.12)" />
          </g>
        );
      })}
    </svg>
  </div>
);

// Circular vintage cancellation stamp / postmark
const VintagePostmarkStamp = ({ 
  text1 = "MONSOON ARCHIVE", 
  text2 = "DELIVERED SECURE", 
  date = "10 JUL 2026", 
  rotation = -6,
  className = "" 
}: { 
  text1?: string; 
  text2?: string; 
  date?: string; 
  rotation?: number;
  className?: string;
}) => (
  <div 
    className={`border border-dashed border-coffee-brown/30 rounded-full w-24 h-24 flex flex-col items-center justify-center p-2 text-center text-coffee-brown/40 font-mono text-[8px] tracking-tight uppercase select-none relative pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Wavy ink cancel lines representing stamps */}
    <div className="absolute inset-x-[-14px] h-3 border-y border-coffee-brown/10 -rotate-12 pointer-events-none" />
    <span className="font-bold tracking-widest text-[7px]">{text1}</span>
    <div className="w-12 h-[0.5px] bg-coffee-brown/20 my-1" />
    <span className="font-bold text-coffee-caramel/50 text-[8px]">{date}</span>
    <div className="w-12 h-[0.5px] bg-coffee-brown/20 my-1" />
    <span className="text-[6px] tracking-wide">{text2}</span>
  </div>
);

// Semi-translucent textured Washi tape / Masking tape
const WashiTape = ({ 
  className = "", 
  rotation = -4 
}: { 
  className?: string; 
  rotation?: number;
}) => (
  <div 
    className={`washi-tape absolute w-24 h-6 opacity-65 z-20 pointer-events-none select-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  />
);

// Dark iron vintage Paperclip
const PaperclipMetal = ({ 
  className = "", 
  rotation = -12 
}: { 
  className?: string; 
  rotation?: number;
}) => (
  <div 
    className={`absolute z-30 select-none pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <svg className="w-5 h-10 text-coffee-dark/80 filter drop-shadow-[1px_1px_1px_rgba(0,0,0,0.2)]" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8,36 L8,12 C8,6.5 12,2 16,2 C20,2 24,6.5 24,12 L24,36 C24,41.5 19.5,46 14,46 C8.5,46 4,41.5 4,36 L4,16" strokeLinecap="round" />
    </svg>
  </div>
);

export default function App() {
  // Cursor modes: "standard", "bean", "leaf"
  // Set default standard cursor for ultimate lag-free experience
  const [cursorMode, setCursorMode] = useState<"standard" | "bean" | "leaf">("standard");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Page opening tear animation states
  const [isTorn, setIsTorn] = useState(false);
  const [isTearing, setIsTearing] = useState(false);

  // Core navigation pages: "home", "work", "journal", "playground", "about", "contact"
  const [activePage, setActivePage] = useState<"home" | "work" | "journal" | "playground" | "about" | "contact">("home");
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<"left-to-right" | "right-to-left">("right-to-left");

  // Collage & Interactive Sketchbook state for Playground
  interface CollageItem {
    id: number;
    type: "pansy" | "fern" | "stamp" | "washi" | "maple";
    x: number;
    y: number;
    rotate: number;
    scale: number;
  }
  const [collage, setCollage] = useState<CollageItem[]>([
    { id: 1, type: "pansy", x: 25, y: 30, rotate: 12, scale: 1 },
    { id: 2, type: "washi", x: 20, y: 24, rotate: -4, scale: 0.9 },
    { id: 3, type: "stamp", x: 70, y: 65, rotate: -15, scale: 0.8 },
    { id: 4, type: "fern", x: 60, y: 15, rotate: -8, scale: 0.85 }
  ]);

  const ZEN_QUOTES = [
    "Sip your filter coffee slowly. The code compiles when it is ready.",
    "The wind does not break a leaf that yields to its blow.",
    "Simple wood joints hold the table without a single nail. Let your architecture be as honest.",
    "In the quiet of a rainy morning, a single well-crafted loop is enough.",
    "Subtract until it breaks, then add exactly one piece of beauty back.",
    "Nature never rushes, yet everything is accomplished.",
    "Write your software like laying cotton pulp: thick, deliberate, and lasting."
  ];
  const [activeQuote, setActiveQuote] = useState<string>("Sip your filter coffee slowly. The code compiles when it is ready.");

  // Board states
  const [activeTab, setActiveTab] = useState<string>("languages");
  const [sunlightEnabled, setSunlightEnabled] = useState(true);
  const [paperOverlayMode, setPaperOverlayMode] = useState<string>("watercolor");
  
  // Custom highlights for interactive elements
  const [accentHighlight, setAccentHighlight] = useState<string>("#4A6446"); // default Forest Green
  const [stains, setStains] = useState<{ id: number; x: number; y: number; scale: number }[]>([
    { id: 1, x: 80, y: 15, scale: 0.9 },
    { id: 2, x: 15, y: 75, scale: 0.6 }
  ]);

  // Wind / breeze effects
  const [windBreezeTrigger, setWindBreezeTrigger] = useState(false);
  const [leaves, setLeaves] = useState<{ id: number; left: number; top: number; delay: number }[]>([]);

  // Ambient falling leaves state
  const [ambientLeaves, setAmbientLeaves] = useState<{ id: number; left: number; scale: number; duration: number; delay: number }[]>([]);

  // Audio state for background ambiance (Cozy Rain/Coffee Shop)
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = "https://res.cloudinary.com/vvgr7lqm/video/upload/v1783777020/Monsoon_Coffee_Room_kjlgmu.mp3";
    audio.loop = true;
    audio.volume = 0.5; // 50% volume as requested
    audioRef.current = audio;

    // Sync play state on initial load
    if (isAudioPlaying) {
      audio.play().catch((err) => {
        console.log("Autoplay blocked by browser. Interaction required to start background ambiance.", err);
      });
    }

    // Modern browsers require interaction to play audio.
    // Trigger play upon any interaction (like a click) anywhere on the page.
    const handleFirstInteraction = () => {
      if (isAudioPlaying && audio.paused) {
        audio.play().catch(() => {});
      }
      window.removeEventListener("click", handleFirstInteraction);
    };
    window.addEventListener("click", handleFirstInteraction);

    return () => {
      audio.pause();
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  // Sync isAudioPlaying state changes to actual audio play/pause controls
  useEffect(() => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked on state sync. Waiting for interaction.", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Page flip transition queue state
  interface FlipItem {
    id: number;
    direction: "right-to-left" | "left-to-right";
    delay: number;
    duration: number;
    index: number;
    total: number;
  }
  const [flipQueue, setFlipQueue] = useState<FlipItem[]>([]);

  // Page switching sequence with a gorgeous paper tear transition & multi-page-flip sequence
  const handlePageChange = (page: typeof activePage) => {
    if (page === activePage || isPageTransitioning) return;
    setIsPageTransitioning(true);

    const pages: typeof activePage[] = ["home", "work", "journal", "playground", "about", "contact"];
    const currentIndex = pages.indexOf(activePage);
    const nextIndex = pages.indexOf(page);
    
    const direction = nextIndex > currentIndex ? "right-to-left" : "left-to-right";
    setTransitionDirection(direction);

    // Calculate number of pages to flip (for jumping multiple pages)
    const diff = nextIndex - currentIndex;
    const numFlips = Math.abs(diff);

    // Dynamic flip speeds depending on total flips enqueued
    // Single page flip is detailed; multiple page flips flip fast and staggered like a riffle
    const baseDuration = numFlips === 1 ? 0.50 : Math.max(0.20, 0.40 - numFlips * 0.04);
    const stagger = numFlips === 1 ? 0 : Math.max(0.06, 0.12 - numFlips * 0.012);

    const visualFlips = Math.min(numFlips, 2);
    const newFlips: FlipItem[] = [];
    const now = Date.now();
    for (let i = 0; i < visualFlips; i++) {
      newFlips.push({
        id: now + i,
        direction,
        delay: i * stagger,
        duration: baseDuration,
        index: i,
        total: numFlips
      });
    }

    setFlipQueue(newFlips);

    // Trigger breeze automatic leaf burst
    triggerWindBreeze();

    // Set page immediately for dynamic smooth transitions handled by AnimatePresence
    setActivePage(page);

    // Total animation transition block time
    const totalDurationMs = Math.round(((visualFlips - 1) * stagger + baseDuration) * 1000 + 50);

    setTimeout(() => {
      setIsPageTransitioning(false);
      setFlipQueue([]); // clear queue on completion
    }, Math.max(450, totalDurationMs));
  };

  // Keep an ambient slow drift of leaves descending if page is open
  useEffect(() => {
    if (!isTorn) return;
    const interval = setInterval(() => {
      setAmbientLeaves((prev) => [
        ...prev.slice(-10), // keep cap to prevent layout lag
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 95,
          scale: Math.random() * 0.4 + 0.6,
          duration: Math.random() * 5 + 7,
          delay: 0
        }
      ]);
    }, 2800);
    return () => clearInterval(interval);
  }, [isTorn]);

  // Start page tear sequence
  const startTearAnimation = () => {
    setIsTearing(true);
    // Trigger breeze automatically for gorgeous visual impact
    setTimeout(() => {
      triggerWindBreeze();
    }, 200);

    setTimeout(() => {
      setIsTorn(true);
    }, 1200);
  };

  // Mouse move tracker for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Lock body scroll until the page is torn open
  useEffect(() => {
    if (!isTorn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isTorn]);

  // Handle Board Table clicks to spawn coffee ripples!
  const handleTableClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only spawn if click was on the wood desk directly or specified neutral regions
    if ((e.target as HTMLElement).classList.contains("wood-table-bg") || (e.target as HTMLElement).classList.contains("click-surface")) {
      const id = Date.now();
      const newRipple = {
        id,
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple]);
      
      // Auto-remove ripple
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1200);

      // Randomly spawn a subtle coffee stain drops on a desk with 30% chance!
      if (Math.random() < 0.3) {
        const rect = e.currentTarget.getBoundingClientRect();
        const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
        const relativeY = ((e.clientY - rect.top) / rect.height) * 100;
        const stainId = Date.now() + 1;
        setStains((prev) => [...prev, { id: stainId, x: relativeX, y: relativeY, scale: Math.random() * 0.4 + 0.4 }]);
      }
    }
  };

  // Trigger wind breeze animation
  const triggerWindBreeze = () => {
    setWindBreezeTrigger(true);
    
    // Spawn 10 leaves at random starting heights
    const newLeaves = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 40 - 20, // Start left side
      top: Math.random() * 80 + 10,  // spread out vertically
      delay: Math.random() * 1.5,
    }));
    
    setLeaves(newLeaves);

    setTimeout(() => {
      setWindBreezeTrigger(false);
      setLeaves([]);
    }, 12000);
  };

  // Reset stains
  const resetStains = () => {
    setStains([
      { id: 1, x: 82, y: 12, scale: 0.95 },
      { id: 2, x: 18, y: 78, scale: 0.65 }
    ]);
  };

  const addCollageItem = (type: "pansy" | "fern" | "stamp" | "washi" | "maple") => {
    const randomId = Date.now();
    const x = Math.floor(15 + (randomId % 65));
    const y = Math.floor(12 + ((randomId * 7) % 55));
    const rotate = Math.floor((randomId % 34) - 17);
    const scale = 0.75 + ((randomId % 4) * 0.08);
    setCollage((prev) => [...prev, { id: randomId, type, x, y, rotate, scale }]);
  };

  const handlePourCoffee = () => {
    const id = Date.now();
    const x = Math.floor(25 + (id % 50));
    const y = Math.floor(200 + (id % 160));
    setStains((prev) => [...prev, { id, x, y, scale: 0.75 + (id % 3) * 0.15 }]);
    
    // Choose a new stable quote
    const nextQuote = ZEN_QUOTES[id % ZEN_QUOTES.length];
    setActiveQuote(nextQuote);
  };

  // Get active paper CSS class based on the selected texture
  const getPaperClass = (isTornRight = false, isTornBottom = false) => {
    let base = "paper-texture ";
    if (paperOverlayMode === "aged") {
      base += "aged-journal ";
    } else {
      base += "watercolor-paper ";
    }
    if (isTornRight) {
      base += "deckled-edge ";
    }
    if (isTornBottom) {
      base += "torn-edge-bottom ";
    }
    return base;
  };

  return (
    <div 
      onClick={handleTableClick}
      className="wood-table-bg click-surface min-h-screen w-full text-coffee-black font-sans py-8 px-4 overflow-x-hidden select-text cursor-default relative"
      style={{ cursor: cursorMode !== "standard" ? "none" : "auto" }}
    >
      
      {/* Aesthetic Old Style Glowing Filament Bulb - Viewport Pinned on the right side */}
      <div className="absolute right-0 top-0 h-0 w-0 overflow-visible z-50 hidden md:block">
        <VintageGlowingBulb />
      </div>
      
      {/* -------------------- PHYSICS OVERLAYS -------------------- */}

      {/* Dynamic Cursor Renderer */}
      {cursorMode !== "standard" && (
        <>
          <div 
            className={`pointer-events-none fixed z-[9999] transition-transform duration-75 ${
              cursorMode === "bean" ? "cursor-bean" : "cursor-leaf"
            }`}
            style={{ 
              left: `${mousePos.x}px`, 
              top: `${mousePos.y}px`,
              transform: `translate(-50%, -50%) scale(${isClicking ? 0.9 : 1}) rotate(${isClicking ? -15 : 0}deg)`
            }}
          />
          {/* Custom Cursor ripple trail */}
          {isClicking && (
            <div 
              className="cursor-ripple pointer-events-none"
              style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, opacity: 0.7, animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" }}
            />
          )}
        </>
      )}

      {/* Coffee Click Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="cursor-ripple absolute pointer-events-none border-coffee-brown/40"
          style={{
            left: `${r.x + window.scrollX}px`,
            top: `${r.y + window.scrollY}px`,
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            animation: "ripple-expand 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards"
          }}
        />
      ))}

      {/* Dynamic Wind Leaves */}
      {/* Dynamic Wind Leaves & Ambient Drifting Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        {windBreezeTrigger && leaves.map((l) => {
          const variantIndex = Math.floor(l.id) % 4;
          const leafClass = [
            "floating-leaf-fluid-v1",
            "floating-leaf-fluid-v2",
            "floating-leaf-fluid-v3",
            "floating-leaf-fluid-v4"
          ][variantIndex];
          const scale = ((l.id % 4) * 0.08) + 0.8;
          return (
            <div
              key={l.id}
              className="absolute pointer-events-none"
              style={{
                left: `${l.left + 30}%`,
                top: `${l.top ?? 0}%`,
                transform: `scale(${scale})`,
              }}
            >
              <svg 
                className={`${leafClass} w-8 h-8 text-coffee-forest/50 fill-current`}
                viewBox="0 0 24 24"
                style={{
                  animationDelay: `${l.delay}s`,
                }}
              >
                <path d="M12 2C11.5 4 9 7 9 10C9 13.5 11 16.5 13 18C15 16.5 17 13.5 17 10C17 7 14.5 4 12 2Z" />
                <path d="M12 2V22" stroke="#2D3F2A" strokeWidth="1" />
              </svg>
            </div>
          );
        })}

        {/* Ambient constant drifting leaves */}
        {isTorn && ambientLeaves.map((al) => {
          const variantIndex = Math.floor(al.id) % 4;
          const leafClass = [
            "floating-leaf-fluid-v1",
            "floating-leaf-fluid-v2",
            "floating-leaf-fluid-v3",
            "floating-leaf-fluid-v4"
          ][variantIndex];
          return (
            <div
              key={al.id}
              className="absolute pointer-events-none"
              style={{
                left: `${al.left}%`,
                top: `-20px`,
                transform: `scale(${al.scale})`,
              }}
            >
              <svg 
                className={`${leafClass} w-6 h-6 text-coffee-forest/35 fill-current`}
                viewBox="0 0 24 24"
                style={{
                  animationDuration: `${al.duration}s`,
                }}
              >
                <path d="M12 2C11.5 4 9 7 9 10C9 13.5 11 16.5 13 18C15 16.5 17 13.5 17 10C17 7 14.5 4 12 2Z" />
                <path d="M12 2V22" stroke="#2D3F2A" strokeWidth="1" />
              </svg>
            </div>
          );
        })}

        {/* Warm dust particles floating */}
        {isTorn && Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="dust-particle"
            style={{
              left: `${(i * 7.7) % 100}%`,
              top: `${(i * 12.3) % 100}%`,
              animation: `floatDust ${5 + (i % 3) * 1.5}s ease-in-out infinite`,
              animationDelay: `${(i * 0.25) % 3}s`
            }}
          />
        ))}
      </div>

      {/* Ambient Sun Ray Overlay */}
      {sunlightEnabled && (
        <div className="ambient-sunlight" />
      )}

      {/* -------------------- INITIAL PAGE TEAR COVER OVERLAY -------------------- */}
      <AnimatePresence>
        {!isTorn && (
          <div className="fixed inset-0 z-[10000] overflow-hidden flex select-none pointer-events-auto">
            
            {/* Left Cover Half */}
            <motion.div
              initial={{ x: 0, rotate: 0 }}
              animate={isTearing ? { 
                x: "-102%", 
                rotate: -8, 
                transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] } 
              } : { x: 0, rotate: 0 }}
              className="absolute left-0 top-0 bottom-0 w-[51%] bg-[#F6F1E8] paper-texture torn-edge-right shadow-2xl flex flex-col justify-between p-8 md:p-16 border-r border-[#E9DFC9]/50"
              style={{ originX: 0, originY: 1 }}
            >
              {/* Paper Fiber texture overlay */}
              <div className="paper-fiber-overlay opacity-12" />
              
              {/* Left Column content (Top part) */}
              <div className="flex flex-col gap-2">
                <div className="text-[11px] font-mono tracking-widest text-coffee-caramel uppercase font-bold">
                  LEDGER NO. 2026 / VOL. I
                </div>
                <div className="h-[1px] w-20 bg-coffee-foam/40" />
              </div>

              {/* Central Title Left part */}
              <div className="flex-1 flex flex-col justify-center items-end pr-8 md:pr-16 text-right">
                <span className="font-serif italic text-coffee-latte text-2xl md:text-3xl block font-light">
                  The
                </span>
                <h2 className="font-serif text-4xl md:text-6xl lg:text-[5rem] font-bold text-coffee-dark tracking-tighter leading-none uppercase">
                  Quiet
                </h2>
                <div className="mt-4 max-w-xs text-[11px] font-mono text-coffee-brown/70 leading-relaxed uppercase tracking-wider">
                  Software • Coffee • Nature • Simplicity
                </div>
              </div>

              {/* Bottom Indian Coffee House Stamp/Mark */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-dashed border-coffee-brown/40 flex items-center justify-center font-serif italic text-coffee-brown text-sm">
                  Est.
                </div>
                <div className="text-[9px] font-mono text-coffee-brown/60 leading-tight">
                  INDIAN COFFEE HOUSE<br />
                  MONSOON RAIN DISTRICT
                </div>
              </div>
            </motion.div>

            {/* Right Cover Half */}
            <motion.div
              initial={{ x: 0, rotate: 0 }}
              animate={isTearing ? { 
                x: "102%", 
                rotate: 8, 
                transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] } 
              } : { x: 0, rotate: 0 }}
              className="absolute right-0 top-0 bottom-0 w-[51%] bg-[#F6F1E8] paper-texture torn-edge-left shadow-2xl flex flex-col justify-between p-8 md:p-16 border-l border-[#E9DFC9]/50"
              style={{ originX: 1, originY: 1 }}
            >
              {/* Paper Fiber texture overlay */}
              <div className="paper-fiber-overlay opacity-12" />

              {/* Right Column content (Top part) */}
              <div className="flex flex-col gap-2 items-end">
                <div className="text-[11px] font-mono tracking-widest text-coffee-forest uppercase font-bold">
                  ARJUN'S HANDCRAFTED ARCHIVE
                </div>
                <div className="h-[1px] w-20 bg-coffee-foam/40" />
              </div>

              {/* Central Title Right part */}
              <div className="flex-1 flex flex-col justify-center items-start pl-8 md:pl-16 text-left">
                <span className="font-serif italic text-transparent text-2xl md:text-3xl block select-none">
                  &nbsp;
                </span>
                <h2 className="font-serif text-4xl md:text-6xl lg:text-[5rem] font-bold text-coffee-dark tracking-tighter leading-none uppercase">
                  Engineer
                </h2>
                <div className="mt-4 max-w-xs text-[11px] font-mono text-coffee-brown/70 leading-relaxed uppercase tracking-wider">
                  A Vintage Notebook & Interactive Journal
                </div>
              </div>

              {/* Bottom metadata */}
              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] font-mono text-coffee-brown/50">BUILD VERSION 2.6.4</span>
                <span className="text-[9px] font-mono text-coffee-forest font-bold tracking-widest uppercase">STABLE COMPILATION</span>
              </div>
            </motion.div>

            {/* Central Tear Trigger Button & Line */}
            {!isTearing && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
              >
                {/* Vertical Tear perforation line */}
                <div className="absolute inset-y-0 w-[2px] border-l border-dashed border-coffee-caramel/40 h-full pointer-events-none" />

                {/* Trigger Button Card */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    startTearAnimation();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pointer-events-auto bg-[#F8F4EC] text-coffee-dark border-2 border-coffee-brown/60 p-6 md:p-8 rounded-xl shadow-2xl flex flex-col items-center gap-3 cursor-pointer max-w-xs text-center relative hover:border-coffee-forest transition-colors duration-300"
                >
                  {/* Tiny pins */}
                  <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-coffee-brown/40" />
                  <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-coffee-brown/40" />

                  <div className="w-12 h-12 rounded-full bg-coffee-cream border border-coffee-foam flex items-center justify-center text-coffee-caramel text-xl">
                    ✂️
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-lg font-bold text-coffee-dark uppercase tracking-wide">
                      Open Journal
                    </h3>
                    <p className="text-[10px] font-mono text-coffee-brown/80 mt-1 leading-relaxed uppercase tracking-wider">
                      Tear sheet to explore <br />the quiet engineer
                    </p>
                  </div>

                  <div className="mt-2 text-[9px] font-mono text-coffee-forest font-bold border-t border-dashed border-coffee-foam/60 pt-2 w-full uppercase tracking-widest animate-pulse">
                    Click to Tear Sheet
                  </div>
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
                {/* -------------------- WORKBENCH HEADER & NAVIGATION TABS -------------------- */}
      <div className="max-w-7xl mx-auto mb-6 text-center click-surface relative z-10 flex flex-col items-center">
        {/* Editorial Vintage Crest & Background Ambiance Toggle */}
        <motion.button
          onClick={() => setIsAudioPlaying(!isAudioPlaying)}
          whileHover={{ scale: 1.1, borderColor: "#C8A27A" }}
          whileTap={{ scale: 0.95 }}
          className={`w-11 h-11 rounded-full border flex items-center justify-center mb-3 font-serif italic text-base select-none transition-all duration-300 relative cursor-pointer ${
            isAudioPlaying
              ? "border-[#C8A27A] text-[#C8A27A] bg-coffee-dark/40 shadow-[0_0_12px_rgba(200,162,122,0.35)]"
              : "border-coffee-foam/30 text-coffee-foam/50 bg-transparent hover:text-coffee-foam/80"
          }`}
          title={isAudioPlaying ? "Mute Background Ambiance" : "Play Background Ambiance"}
        >
          Ω
          
          {/* Subtle status indicator dot */}
          <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#1C140E] transition-all duration-300 ${
            isAudioPlaying ? "bg-emerald-500 animate-pulse" : "bg-amber-600/60"
          }`} />

          {/* Pulse Ripple Effect when active */}
          {isAudioPlaying && (
            <span className="absolute inset-0 rounded-full border border-[#C8A27A]/25 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
          )}
        </motion.button>
        
        <h1 className="font-serif text-3xl md:text-[2.6rem] font-semibold text-[#FDFBF7] tracking-tight leading-tight select-none flex items-center gap-2">
          <span className="font-light italic text-[#C8A27A]">The</span> Quiet Engineer
        </h1>
        <p className="text-[10px] md:text-xs text-[#D7C2A4] font-mono tracking-widest mt-1.5 uppercase select-none">
          Portfolio UX Design Spec Board & Interactive Blueprint Archive
        </p>
        
        {/* Coffee Shop Street Stains (dynamically rendered from states) */}
        {stains.map((s) => (
          <div 
            key={s.id} 
            className="coffee-drop select-none pointer-events-none"
            style={{ 
              left: `${s.x}%`, 
              top: `${s.y}px`, 
              transform: `scale(${s.scale}) rotate(${s.id % 360}deg)` 
            }}
          />
        ))}

        {/* Vintage Desk Pinned Card */}
        <div className="absolute right-4 top-0 hidden xl:flex flex-col items-center p-3 bg-coffee-ivory/95 border border-coffee-foam/50 rounded-lg paper-shadow w-44 rotate-3 select-none text-left z-20">
          <PaperclipMetal className="-top-3 left-1/2 transform -translate-x-1/2" rotation={-15} />
          <div className="w-full h-1.5 absolute top-0 left-0 bg-[#A97042]/10" />
          <span className="text-[10px] font-mono text-coffee-forest font-bold tracking-widest uppercase mt-1">LEDGER ACTIVE</span>
          <span className="text-[9px] font-mono text-coffee-brown/80 mt-1 leading-relaxed">
            Archive Vol: No. 108<br />
            Material: Cotton Pulp<br />
            Mode: fully interactive
          </span>
          {/* Faded postmark */}
          <div className="absolute -bottom-3 -right-3 opacity-20 transform scale-50">
            <VintagePostmarkStamp text1="LEDGER" text2="CERTIFIED" date="EST 2026" />
          </div>
        </div>
      </div>

      {/* ==================== TACTILE NAVIGATION MENUS ==================== */}
      <div className="max-w-7xl mx-auto mb-8 relative z-20 select-none flex justify-center flex-wrap gap-2 md:gap-4 px-4">
        {[
          { id: "home", label: "Home", icon: "🏡" },
          { id: "work", label: "Work & Workbench", icon: "🛠️" },
          { id: "journal", label: "Interactive Journal", icon: "✏️" },
          { id: "playground", label: "Aesthetic Sandbox", icon: "🫙" },
          { id: "about", label: "My Journey", icon: "📜" },
          { id: "contact", label: "Contact Letter", icon: "✉️" }
        ].map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handlePageChange(tab.id as any)}
              className={`px-4 py-2.5 text-[11px] md:text-xs font-serif font-bold uppercase tracking-wider relative flex items-center gap-2 transition-all duration-300 border border-coffee-foam/20 rounded shadow-sm hover:border-coffee-latte hover:scale-103 cursor-pointer ${
                isActive 
                  ? "bg-coffee-paper text-coffee-dark border-coffee-latte font-extrabold scale-105" 
                  : "bg-coffee-cream/80 text-coffee-brown/90"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-coffee-caramel rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ==================== -------------------- MAIN PAGE SLIDING CONTAINER -------------------- ==================== */}
      <div className="max-w-7xl mx-auto relative min-h-[600px] z-10 px-2 md:px-4">
        
        {/* Leather spine on left (gives a tactile binder book feel) */}
        <div className="absolute left-[-16px] top-4 bottom-4 w-4 leather-spine rounded-l hidden lg:block z-30" />
        
        {/* Immersive 3D Book Page Flip Overlay */}
        <PageFlipTransition flipQueue={flipQueue} paperOverlayMode={paperOverlayMode} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ 
              opacity: 0, 
              x: transitionDirection === "right-to-left" ? "40px" : "-40px",
              rotate: transitionDirection === "right-to-left" ? 1 : -1,
              clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              rotate: 0,
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            }}
            exit={{ 
              opacity: 0, 
              x: transitionDirection === "right-to-left" ? "-40px" : "40px",
              rotate: transitionDirection === "right-to-left" ? -1 : 1
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            
            {/* -------------------- 1. HOME VIEW -------------------- */}
            {activePage === "home" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Hero introduction plate (Left 7 Cols) */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
                  <div className={`${getPaperClass(true)} paper-shadow rounded-l-md px-6 md:px-10 py-10 flex flex-col justify-between overflow-hidden relative min-h-[500px]`}>
                    
                    {/* Metal paper clip */}
                    <PaperclipMetal className="top-0 left-12" rotation={-10} />
                    
                    {/* Faint fold lines simulated */}
                    <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-coffee-brown/5 opacity-15" />
                    <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-coffee-brown/5 opacity-15" />

                    {/* Pulp Fibers background overlay */}
                    <div className="paper-fiber-overlay opacity-8" />
                    
                    {/* Coffee stain on corner */}
                    <div className="coffee-ring-overlay right-6 top-8 opacity-15 transform scale-110" />
                    <div className="tea-stain absolute -left-12 -bottom-12 w-48 h-48 opacity-15" />

                    {/* Pressed Pansy Flower taped down */}
                    <div className="absolute right-4 bottom-12 w-20 h-20 opacity-80">
                      <WashiTape className="top-0 left-0 w-16 h-5" rotation={15} />
                      <PressedPansy className="w-full h-full" />
                    </div>

                    {/* Fine Ink Sketch branch decoration */}
                    <div className="absolute left-4 bottom-16 opacity-15 pointer-events-none select-none">
                      <svg className="w-20 h-40 text-coffee-forest" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M50,190 Q50,100 25,35" />
                        <path d="M50,140 Q65,115 80,85" />
                        <path d="M50,100 Q30,75 18,50" />
                        <circle cx="25" cy="35" r="2" fill="currentColor" />
                        <circle cx="80" cy="85" r="2" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Header line on paper */}
                    <div className="flex items-center justify-between border-b border-coffee-foam/30 pb-3 mb-6 select-none text-[10px] font-mono tracking-widest text-coffee-brown/70 uppercase">
                      <span>THE QUIET ENGINEER • VOL. 2026</span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-coffee-forest animate-pulse" />
                        STABLE SPEC
                      </span>
                    </div>

                    {/* Editorial intro body */}
                    <div className="flex-1 py-4">
                      <span className="text-xs font-mono text-coffee-forest/80 tracking-widest uppercase mb-3.5 block font-bold">
                        AESTHETIC ARCHITECT STATEMENT
                      </span>
                      
                      <h2 className="font-serif text-3xl md:text-[3.2rem] leading-[1.1] text-coffee-black font-extrabold tracking-tight mb-4">
                        Hello. <br />
                        <span className="italic text-coffee-brown">I'm Arjun.</span> <br />
                        I design software <span className="text-coffee-forest">with silent craft.</span>
                      </h2>
                      
                      <p className="font-serif text-base md:text-lg text-coffee-brown italic leading-relaxed mt-4 max-w-md">
                        "Every loop we construct is like laying brickwork, and every UI design is like pouring coffee. Let us seek simplicity, not volume."
                      </p>

                      {/* Handwritten architectural notes in margin */}
                      <div className="mt-8 font-mono text-[9px] text-coffee-brown/60 space-y-0.5 border-l border-dashed border-coffee-foam/40 pl-3">
                        <div>// load_coefficient = 1.0</div>
                        <div>// entropy_ratio = 0.02 (highly predictable)</div>
                        <div>// location = Bangalore Monsoon District</div>
                      </div>
                    </div>

                    {/* Bottom Specs bar */}
                    <div className="border-t border-coffee-foam/30 pt-3 mt-6 flex items-center justify-between text-[9px] font-mono text-coffee-brown/50 select-none">
                      <span>PAPER: HANDMADE COTTON FIBERS</span>
                      <span>10.07.2026</span>
                    </div>
                  </div>
                </div>

                {/* Top view cup column (Right 5 Cols) */}
                <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                  
                  {/* The interactive tea stained cup tray */}
                  <div className={`${getPaperClass(false, true)} paper-shadow rounded-lg p-6 flex flex-col justify-between relative overflow-hidden min-h-[500px]`}>
                    
                    {/* Washi tape pinning top */}
                    <WashiTape className="top-2 left-1/3 w-32 h-6" rotation={-2} />
                    
                    {/* Pulp texture */}
                    <div className="paper-fiber-overlay opacity-12" />

                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-coffee-caramel uppercase tracking-widest font-bold">INTERACTIVE SPECIMEN Tray</span>
                      <h3 className="font-serif text-xl font-bold text-coffee-dark mt-1">Single-Origin Companion</h3>
                      <p className="text-[11px] text-coffee-brown/80 mt-1 leading-relaxed">
                        Pour cream, stir, and click to spawn splash stains directly on the wood desk base.
                      </p>
                    </div>

                    {/* Central Mug component */}
                    <div className="my-auto flex justify-center items-center py-6 select-none">
                      <InteractiveHeroMug />
                    </div>

                    {/* Postmark stamp */}
                    <div className="flex justify-between items-end border-t border-coffee-foam/30 pt-3 mt-4">
                      <VintagePostmarkStamp text1="KAFFEE HAUS" text2="MONSOON BREW" date="BREWED FRESH" />
                      <div className="text-right text-[9px] font-mono text-coffee-brown/50 uppercase">
                        <div>saucer: walnut wood</div>
                        <div>temperature: 88°c</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* -------------------- 2. WORK VIEW -------------------- */}
            {activePage === "work" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* My Workbench section (Left 7 Cols) */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
                  
                  {/* Thick Letterpress Paper Tool Grid Card */}
                  <div className="letterpress-paper paper-shadow rounded-lg p-6 md:p-8 relative overflow-hidden">
                    
                    {/* Corner Brass paper clip */}
                    <PaperclipMetal className="top-2 left-2" rotation={-45} />
                    
                    {/* Masking tape on top margin */}
                    <WashiTape className="top-2 right-12 w-24 h-6" rotation={10} />

                    {/* Ruled grid background representation */}
                    <div className="absolute inset-0 notebook-grid opacity-15 pointer-events-none" />

                    {/* Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-coffee-foam/40 pb-3 mb-6 relative z-10">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-coffee-dark letterpress-text">My Tech Workbench</h3>
                        <p className="text-[11px] text-coffee-brown/80 mt-0.5">The structural languages and toolchains I work in.</p>
                      </div>
                      
                      {/* Categorized Divider Tabs */}
                      <div className="flex flex-wrap gap-1 mt-3 sm:mt-0 select-none text-[9px] font-mono uppercase tracking-widest">
                        {["languages", "frameworks", "databases", "tools", "design", "cloud"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-2 py-1 rounded border transition-all cursor-pointer ${
                              activeTab === cat 
                                ? "bg-[#C8A27A] border-coffee-brown text-coffee-black font-extrabold" 
                                : "bg-coffee-cream/60 border-coffee-foam/30 text-coffee-brown/80 hover:bg-coffee-cream"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Grid of workbench tools */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                      <AnimatePresence mode="popLayout">
                        {TECH_STACK.filter((t) => t.category === activeTab).map((item, idx) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, delay: idx * 0.04 }}
                            whileHover={{ scale: 1.04, rotate: (idx % 2 === 0 ? 1.5 : -1.5) }}
                            className="p-3 bg-coffee-cream/50 border border-coffee-foam/30 rounded shadow-inner flex flex-col items-center justify-center text-center cursor-help group"
                          >
                            <span className="text-2xl mb-1.5 filter drop-shadow group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="font-serif text-xs font-bold text-coffee-dark block">{item.name}</span>
                            <span className="text-[8px] font-mono text-coffee-brown/50 mt-1 uppercase tracking-widest">{item.level}</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Stitched bottom visual border */}
                    <div className="mt-8 border-t border-dashed border-coffee-foam/40 pt-3 flex justify-between text-[9px] font-mono text-coffee-brown/50">
                      <span>DEBOSSED LETTERPRESS PAPER STOCK</span>
                      <span>ACTIVE PROFILE</span>
                    </div>
                  </div>

                  {/* Things I Build Card */}
                  <div className={`${getPaperClass(true)} paper-shadow rounded-lg p-6 md:p-8 relative overflow-hidden`}>
                    <div className="absolute left-2 top-0 bottom-0 w-3 flex flex-col justify-around py-4 select-none opacity-40">
                      <div className="w-2.5 h-2.5 bg-[#423126]/30 rounded-full border border-coffee-black/10 shadow-inner" />
                      <div className="w-2.5 h-2.5 bg-[#423126]/30 rounded-full border border-coffee-black/10 shadow-inner" />
                      <div className="w-2.5 h-2.5 bg-[#423126]/30 rounded-full border border-coffee-black/10 shadow-inner" />
                    </div>

                    <div className="pl-4">
                      <h3 className="font-serif text-xl font-bold text-coffee-dark">Architectural Fields</h3>
                      <p className="text-xs text-coffee-brown/70 mb-4">The core focus of my engineering cycles.</p>

                      <div className="space-y-4">
                        <div className="pb-3 border-b border-coffee-foam/30">
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-xs md:text-sm font-semibold text-coffee-dark">Backend Orchestrations</span>
                            <span className="text-[9px] font-mono text-coffee-forest bg-coffee-forest/10 px-2 py-0.5 rounded font-bold uppercase">Python / Go</span>
                          </div>
                          <p className="text-[11px] text-coffee-brown/80 mt-1 leading-relaxed">
                            Highly scalable multi-service pipelines with low memory profiles, structured logging, and deterministic latency profiles.
                          </p>
                        </div>
                        <div className="pb-3 border-b border-coffee-foam/30">
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-xs md:text-sm font-semibold text-coffee-dark">Interactive UI Blueprints</span>
                            <span className="text-[9px] font-mono text-coffee-forest bg-coffee-forest/10 px-2 py-0.5 rounded font-bold uppercase">React / TS</span>
                          </div>
                          <p className="text-[11px] text-coffee-brown/80 mt-1 leading-relaxed">
                            Fluid layouts designed using physical physics simulations, customized Canvas/SVG assets, and wabi-sabi grid guidelines.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Featured Project plate (Right 5 Cols) */}
                <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                  <div className={`${getPaperClass(true, true)} paper-shadow rounded-lg p-6 md:p-8 flex flex-col justify-between overflow-hidden relative min-h-[500px]`}>
                    
                    {/* Brass Clip at top */}
                    <div className="absolute top-0 right-16 w-8 h-12 flex justify-center items-start z-10">
                      <PaperclipMetal className="" rotation={12} />
                    </div>

                    {/* Paper fibers texture */}
                    <div className="paper-fiber-overlay opacity-10" />

                    {/* Coffee cup ring stain */}
                    <div className="coffee-ring-overlay -left-8 -bottom-8 opacity-15 transform scale-95" />

                    <div>
                      <span className="text-[10px] font-mono text-coffee-caramel/90 font-bold tracking-widest uppercase mb-1 block">
                        FEATURED PROJECT BLUEPRINT
                      </span>
                      <h3 className="font-serif text-2xl font-extrabold text-coffee-dark tracking-tight">
                        Coffee Shop Manager
                      </h3>
                      <p className="text-xs text-coffee-brown/80 font-serif italic mt-1 leading-relaxed">
                        A wabi-sabi inventory ledger and patron order tracker built for offline roasters.
                      </p>

                      {/* Pencil street sketch illustration container */}
                      <div className="my-5 relative rounded overflow-hidden border border-coffee-foam/40 group shadow-inner">
                        <img 
                          src={IMAGES.coffeeShopStreet} 
                          alt="Coffee Shop Sketch" 
                          referrerPolicy="no-referrer"
                          className="w-full h-44 object-cover filter brightness-[0.95] sepia-[0.12] contrast-[1.05]"
                        />
                        <div className="absolute bottom-2 left-2 bg-coffee-black/80 backdrop-blur-sm text-coffee-cream px-2 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase">
                          CHARCOAL SKETCH NO. 24
                        </div>
                      </div>

                      {/* Stack details info tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4 text-[9px] font-mono">
                        <span className="bg-coffee-foam/20 border border-coffee-foam/30 text-coffee-brown px-2 py-0.5 rounded-full font-semibold">Python</span>
                        <span className="bg-coffee-foam/20 border border-coffee-foam/30 text-coffee-brown px-2 py-0.5 rounded-full font-semibold">Django</span>
                        <span className="bg-coffee-foam/20 border border-coffee-foam/30 text-coffee-brown px-2 py-0.5 rounded-full font-semibold">PostgreSQL</span>
                      </div>

                      <p className="text-xs text-coffee-brown/95 leading-relaxed font-serif">
                        Designed explicitly to let local growers audit single-origin roasts directly in remote monsoon districts of India. Handles low memory and cellular disconnects seamlessly.
                      </p>
                    </div>

                    <div className="border-t border-coffee-foam/30 pt-4 mt-6 flex items-center justify-between">
                      <button className="flex items-center gap-1.5 text-xs font-mono font-bold text-coffee-dark hover:text-coffee-caramel uppercase tracking-widest cursor-pointer">
                        EXPLORE WORKINGS <ExternalLink className="w-3 h-3" />
                      </button>
                      <span className="text-[9px] font-mono text-coffee-brown/50 italic">Draft Ledger Card</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* -------------------- 3. JOURNAL VIEW -------------------- */}
            {activePage === "journal" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Journal Reflections (Left 6 Cols) */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
                  
                  {/* Aged Ruled Notebook paper */}
                  <div className={`${getPaperClass(false, true)} paper-shadow rounded-lg p-6 md:p-8 relative overflow-hidden min-h-[500px] flex flex-col justify-between`}>
                    
                    {/* Ruled faint blue-grey notebook lines */}
                    <div className="absolute inset-0 notebook-ruled opacity-40 pointer-events-none pl-8 pt-12" />
                    {/* Red vertical margin binder line */}
                    <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-red-400 opacity-30" />

                    {/* Pressed leaf ornament */}
                    <div className="absolute right-4 top-10 w-24 h-48 opacity-25">
                      <PressedFern className="w-full h-full" />
                    </div>

                    {/* Stained tea circle */}
                    <div className="coffee-ring-overlay left-1/3 top-1/3 opacity-20 transform scale-110" />

                    <div className="relative z-10 pl-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-coffee-forest font-bold tracking-widest uppercase">
                          JOURNAL SPECIMEN PAGE
                        </span>
                        <span className="text-[10px] font-mono text-coffee-brown/50 font-semibold">
                          ENTRY #108
                        </span>
                      </div>
                      
                      <h3 className="font-serif text-2xl font-bold text-coffee-dark tracking-tight leading-snug">
                        Why I love building things that solve real problems
                      </h3>
                      <p className="text-[10px] font-mono text-coffee-brown/50 uppercase tracking-widest mt-1 mb-4">
                        PUBLISHED • MAY 18, 2026
                      </p>

                      {/* Notebook sketch image */}
                      <div className="my-5 relative rounded overflow-hidden border border-coffee-foam/40 group shadow-inner">
                        <img 
                          src={IMAGES.openNotebookJournal} 
                          alt="Open Notebook Sketch" 
                          referrerPolicy="no-referrer"
                          className="w-full h-44 object-cover filter brightness-[0.95] sepia-[0.1] contrast-[1.05]"
                        />
                        <div className="absolute bottom-2 left-2 bg-coffee-black/80 backdrop-blur-sm text-coffee-cream px-2 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase">
                          INK SKETCH GRAPH NO. 12
                        </div>
                      </div>

                      <p className="font-serif text-sm italic text-coffee-brown/95 leading-relaxed mt-4">
                        "There's something quiet and honest about turning a fuzzy, organic idea into something structured and compiled. It feels like woodcarving, or brewing filter coffee. You must let it sit, let the oil rise to the top, and filter out the noise."
                      </p>
                    </div>

                    <div className="border-t border-coffee-foam/30 pt-4 mt-6 flex items-center justify-between relative z-10 pl-8">
                      <span className="text-[10px] font-mono text-coffee-brown/50 uppercase">ARJUN • REFLECTION DIARY</span>
                      <span className="text-[10px] font-mono text-coffee-brown/50 italic">Ruled Cotton stock</span>
                    </div>
                  </div>
                </div>

                {/* AI Interactive Typewriter (Right 6 Cols) */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">
                  <div className={`${getPaperClass(true)} paper-shadow rounded-lg p-6 md:p-8 relative overflow-hidden min-h-[500px]`}>
                    
                    {/* Washi tape on corner */}
                    <WashiTape className="top-2 left-2 w-28 h-6" rotation={-12} />
                    
                    <div className="paper-fiber-overlay opacity-12" />

                    {/* Render Typewriter container */}
                    <AIJournalTypewriter />

                    {/* Vintage Stamp graphic on typewriter side */}
                    <div className="absolute right-4 bottom-24 opacity-30">
                      <VintagePostmarkStamp text1="AI WORKSPACE" text2="CERTIFIED STAMP" date="GEMINI FLASH" />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* -------------------- 4. PLAYGROUND VIEW -------------------- */}
            {activePage === "playground" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Herbarium Board (Left 7 Cols) */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
                  <div className={`${getPaperClass()} paper-shadow rounded-lg p-6 md:p-8 relative min-h-[560px] flex flex-col justify-between overflow-hidden`}>
                    
                    {/* Metal paper clip holding the canvas */}
                    <PaperclipMetal className="top-0 left-12" rotation={-5} />

                    <div>
                      <span className="text-[10px] font-mono text-coffee-forest uppercase tracking-widest font-bold">THE HERBARIUM CANVAS</span>
                      <h3 className="font-serif text-xl font-bold text-coffee-dark mt-1">Pressed Botanical Arrangement</h3>
                      <p className="text-xs text-coffee-brown/80 mt-1 leading-relaxed">
                        Drag elements on the handmade watercolor sheet to design your quiet composition. Click items below to press fresh dried flora, tape, or vintage cancellation seals.
                      </p>
                    </div>

                    {/* The Interactive Collage Board Sheet */}
                    <div className="my-6 relative w-full h-[320px] bg-[#F6F1E8] border border-coffee-foam/40 rounded shadow-inner overflow-hidden select-none">
                      {/* Subtly textured background inside the frame */}
                      <div className="absolute inset-0 watercolor-paper opacity-50" />
                      
                      {collage.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-coffee-brown/40">
                          <Leaf className="w-8 h-8 mb-2 stroke-1" />
                          <span className="text-xs font-serif italic">This sheet is empty. Press dried specimens below to begin.</span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 pointer-events-none">
                          {collage.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ scale: 0, opacity: 0, rotate: item.rotate - 15 }}
                              animate={{ scale: item.scale, opacity: 1, rotate: item.rotate }}
                              className="absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none"
                              style={{ left: `${item.x}%`, top: `${item.y}%` }}
                              drag
                              dragMomentum={false}
                              dragElastic={0.1}
                              dragConstraints={{ left: 10, right: 360, top: 10, bottom: 220 }}
                            >
                              {item.type === "pansy" && (
                                <div className="w-16 h-16 filter drop-shadow-sm">
                                  <PressedPansy className="w-full h-full" />
                                </div>
                              )}
                              {item.type === "fern" && (
                                <div className="w-16 h-32 filter drop-shadow-sm">
                                  <PressedFern className="w-full h-full" />
                                </div>
                              )}
                              {item.type === "stamp" && (
                                <VintagePostmarkStamp 
                                  className="w-20 h-20 bg-transparent scale-90" 
                                  text1="COLLAGE" 
                                  text2="WABI-SABI" 
                                  date="EST 2026" 
                                />
                              )}
                              {item.type === "washi" && (
                                <div className="w-20 h-5">
                                  <WashiTape className="w-full h-full" rotation={0} />
                                </div>
                              )}
                              {item.type === "maple" && (
                                <div className="w-12 h-12 flex items-center justify-center opacity-70">
                                  <svg className="w-10 h-10 text-coffee-caramel fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2c-.3 0-.6.1-.8.4l-2.5 4-4.5-1.5c-.3-.1-.7 0-.9.3s-.2.7 0 .9l3.5 3-4 1c-.3.1-.5.4-.5.7s.2.6.5.7l4 1-3.5 3c-.2.2-.3.6 0 .9.1.1.3.2.4.2s.3 0 .4-.1l4.5-1.5 2.5 4c.2.3.5.4.8.4s.6-.1.8-.4l2.5-4 4.5 1.5c.1.1.2.1.4.1s.3-.1.4-.2c.2-.2.3-.6 0-.9l-3.5-3 4-1c.3-.1.5-.4.5-.7s-.2-.6-.5-.7l-4-1 3.5-3c.2-.2.3-.6 0-.9-.2-.3-.6-.4-.9-.3l-4.5 1.5-2.5-4c-.2-.3-.5-.4-.8-.4zM12 18v4" stroke="#6F4E37" strokeWidth="0.8" />
                                  </svg>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Specimen Buttons */}
                    <div className="flex flex-wrap gap-2 justify-center py-2 bg-coffee-cream/30 border border-coffee-foam/10 rounded-lg p-2">
                      <button 
                        onClick={() => addCollageItem("pansy")}
                        className="bg-coffee-cream hover:bg-coffee-ivory border border-coffee-foam/30 rounded py-1 px-2.5 text-[10px] font-mono text-coffee-dark cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        🌸 Press Pansy
                      </button>
                      <button 
                        onClick={() => addCollageItem("fern")}
                        className="bg-coffee-cream hover:bg-coffee-ivory border border-coffee-foam/30 rounded py-1 px-2.5 text-[10px] font-mono text-coffee-dark cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        🌿 Press Fern
                      </button>
                      <button 
                        onClick={() => addCollageItem("maple")}
                        className="bg-coffee-cream hover:bg-coffee-ivory border border-coffee-foam/30 rounded py-1 px-2.5 text-[10px] font-mono text-coffee-dark cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        🍁 Press Maple Leaf
                      </button>
                      <button 
                        onClick={() => addCollageItem("washi")}
                        className="bg-coffee-cream hover:bg-coffee-ivory border border-coffee-foam/30 rounded py-1 px-2.5 text-[10px] font-mono text-coffee-dark cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        🎗️ Washi Tape
                      </button>
                      <button 
                        onClick={() => addCollageItem("stamp")}
                        className="bg-coffee-cream hover:bg-coffee-ivory border border-coffee-foam/30 rounded py-1 px-2.5 text-[10px] font-mono text-coffee-dark cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        🎟️ Postmark Seal
                      </button>
                      <button 
                        onClick={() => setCollage([])}
                        className="bg-coffee-cream hover:bg-coffee-ivory border border-red-500/10 text-red-700/80 rounded py-1 px-2.5 text-[10px] font-mono cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        🗑️ Clear Board
                      </button>
                    </div>

                    <div className="mt-4 border-t border-dashed border-coffee-foam/30 pt-3 flex justify-between text-[9px] font-mono text-coffee-brown/50">
                      <span>BOTANICAL COLLAGE SHEET</span>
                      <span>MONSOON HERBARIUM</span>
                    </div>
                  </div>
                </div>

                {/* Ledger & Controls (Right 5 Cols) */}
                <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                  
                  {/* Interactive Coffee Ledger Plate */}
                  <div className="letterpress-paper paper-shadow rounded-lg p-6 md:p-8 relative min-h-[560px] flex flex-col justify-between">
                    
                    {/* Washi tape decor */}
                    <WashiTape className="top-2 right-4 w-24 h-5" rotation={8} />

                    <div>
                      <span className="text-[10px] font-mono text-coffee-caramel uppercase tracking-widest font-bold">COFFEE SENSORY CORNER</span>
                      <h3 className="font-serif text-xl font-bold text-coffee-dark mt-1 letterpress-text">Sensory Spill Ledger</h3>
                      <p className="text-xs text-coffee-brown/80 mt-1 leading-relaxed">
                        Click the handcrafted mug below to drip organic filter coffee stains onto the notebook paper, revealing quiet thoughts.
                      </p>
                    </div>

                    {/* Interactive Drip Station */}
                    <div className="my-6 p-4 bg-[#F8F4EC] border border-coffee-foam/30 rounded-lg shadow-inner relative overflow-hidden flex flex-col items-center justify-center min-h-[200px]">
                      {/* Notebook ruled lines */}
                      <div className="absolute inset-0 notebook-ruled opacity-40" />

                      {/* Top-down Interactive Coffee Mug */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePourCoffee}
                        className="relative z-10 w-24 h-24 rounded-full bg-[#E9DFC9] border-4 border-coffee-brown/40 shadow-md flex items-center justify-center hover:border-coffee-caramel/60 transition-colors cursor-pointer group"
                      >
                        {/* Latte foam swirl inside */}
                        <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-coffee-brown via-coffee-foam to-coffee-cream flex items-center justify-center overflow-hidden relative">
                          <div className="absolute w-12 h-12 border border-coffee-cream/30 rounded-full animate-pulse" />
                          <Coffee className="w-6 h-6 text-coffee-brown/80 group-hover:scale-110 transition-transform" />
                        </div>
                        {/* Handle */}
                        <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-4 h-10 rounded-r bg-[#E9DFC9] border-r-4 border-y-4 border-coffee-brown/40 group-hover:border-coffee-caramel/60" />
                      </motion.button>

                      {/* Display Zen quote */}
                      <motion.div 
                        key={activeQuote}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 mt-6 text-center"
                      >
                        <p className="font-serif text-xs italic text-coffee-dark px-4 font-medium leading-relaxed">
                          "{activeQuote}"
                        </p>
                        <span className="text-[8px] font-mono text-coffee-forest uppercase tracking-widest block mt-2">— LEDGER EXCERPT</span>
                      </motion.div>
                    </div>

                    {/* Settings Toggles inside Right Box */}
                    <div className="space-y-3 pt-3 border-t border-coffee-foam/30">
                      <span className="text-[9px] font-mono text-coffee-forest uppercase tracking-widest font-bold">DESK SPECS</span>
                      
                      {/* Morning Sunlight */}
                      <div className="flex items-center justify-between text-xs p-2 bg-coffee-cream/40 rounded">
                        <span className="font-serif text-coffee-dark font-semibold">Morning Sunlight glare</span>
                        <button 
                          onClick={() => setSunlightEnabled(!sunlightEnabled)}
                          className={`px-2 py-0.5 text-[9px] font-mono rounded border transition-colors cursor-pointer ${
                            sunlightEnabled ? "bg-coffee-forest text-white" : "bg-coffee-cream text-coffee-brown"
                          }`}
                        >
                          {sunlightEnabled ? "ON" : "OFF"}
                        </button>
                      </div>

                      {/* Paper Overlay */}
                      <div className="flex items-center justify-between text-xs p-2 bg-coffee-cream/40 rounded">
                        <span className="font-serif text-coffee-dark font-semibold">Paper Texture base</span>
                        <button 
                          onClick={() => setPaperOverlayMode(paperOverlayMode === "watercolor" ? "aged" : "watercolor")}
                          className="px-2 py-0.5 text-[9px] font-mono rounded border bg-coffee-cream text-coffee-brown cursor-pointer"
                        >
                          {paperOverlayMode === "watercolor" ? "WATERCOLOR PULP" : "AGED PARCHMENT"}
                        </button>
                      </div>

                      {/* Custom Cursor */}
                      <div className="flex items-center justify-between text-xs p-2 bg-coffee-cream/40 rounded">
                        <span className="font-serif text-coffee-dark font-semibold">Tactile Cursor</span>
                        <button 
                          onClick={() => {
                            if (cursorMode === "standard") setCursorMode("bean");
                            else if (cursorMode === "bean") setCursorMode("leaf");
                            else setCursorMode("standard");
                          }}
                          className="px-2 py-0.5 text-[9px] font-mono rounded border bg-coffee-cream text-coffee-brown cursor-pointer"
                        >
                          {cursorMode.toUpperCase()}
                        </button>
                      </div>

                      {/* General Desk clean actions */}
                      <div className="grid grid-cols-2 gap-2 text-[9px] font-mono uppercase">
                        <button 
                          onClick={triggerWindBreeze}
                          className="bg-coffee-cream hover:bg-coffee-ivory py-1.5 px-2 rounded border border-coffee-foam/40 text-center cursor-pointer shadow-sm"
                        >
                          🍃 Wind Breeze
                        </button>
                        <button 
                          onClick={resetStains}
                          className="bg-coffee-cream hover:bg-coffee-ivory py-1.5 px-2 rounded border border-coffee-foam/40 text-center cursor-pointer shadow-sm"
                        >
                          🧽 Clean Stains
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-coffee-foam/30 pt-3 mt-4 flex justify-between text-[9px] font-mono text-coffee-brown/50">
                      <span>SPECS INTERFACE v3.2</span>
                      <span>DRAFTED STUDY</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* -------------------- 5. ABOUT VIEW -------------------- */}
            {activePage === "about" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Arjun's Story plate (Left 7 Cols) */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
                  <div className={`${getPaperClass(true)} paper-shadow rounded-lg p-6 md:p-8 relative overflow-hidden min-h-[500px] flex flex-col justify-between`}>
                    
                    {/* Washi tape strip */}
                    <WashiTape className="top-2 left-6 w-32 h-6" rotation={4} />

                    <div className="paper-fiber-overlay opacity-12" />

                    {/* Pressed pansy on corner */}
                    <div className="absolute right-4 bottom-4 w-24 h-24 opacity-75">
                      <PressedPansy className="w-full h-full" />
                    </div>

                    <div className="relative z-10">
                      <span className="text-[10px] font-mono text-coffee-forest uppercase tracking-widest font-bold">BIOGRAPHY SPEC</span>
                      <h3 className="font-serif text-3xl font-extrabold text-coffee-dark mt-1">The Self-Portrait Draft</h3>
                      <p className="text-xs text-coffee-brown/60 font-mono tracking-wider uppercase mt-1 mb-6">ARCHIVE LOG NO. Arjun-01</p>

                      <div className="space-y-4 font-serif text-sm leading-relaxed text-coffee-brown">
                        <p>
                          "I am a developer who believes software should be crafted with the same patience and manual care as a walnut desktop or a cup of hand-poured roasts."
                        </p>
                        <p>
                          Living in quiet, rainy regions, I spend my hours writing deterministic TypeScript modules, debugging low-level memory loops, and exploring vintage paper mills. Wabi-sabi values shape my design rules: embracing rough textures, asymmetric layouts, and deep, quiet color palettes.
                        </p>
                        <p>
                          I prioritize writing small, modular code files that build cleanly, are robust under heavy loads, and are highly performant.
                        </p>
                      </div>

                      {/* Architectural notes scribble in margin */}
                      <div className="mt-8 font-mono text-[9px] text-coffee-brown/50 space-y-0.5 max-w-sm pl-3 border-l border-coffee-foam/40">
                        <div>// golden_ratio = 1.61803398</div>
                        <div>// design_principle = "subtract_until_it_breaks_then_add_one"</div>
                      </div>
                    </div>

                    <div className="border-t border-coffee-foam/30 pt-4 mt-6 flex justify-between text-[10px] font-mono text-coffee-brown/50">
                      <span>ARJUN • CRAFTSMAN BIO</span>
                      <span>STABLE COMPILE</span>
                    </div>
                  </div>
                </div>

                {/* Overlapping Journey Timeline (Right 5 Cols) */}
                <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                  <div className={`${getPaperClass(false, true)} paper-shadow rounded-lg p-6 md:p-8 relative`}>
                    
                    {/* Spiral binder holes at top */}
                    <div className="absolute top-0 inset-x-12 h-2.5 bg-[#423126] rounded-b flex justify-around select-none">
                      <div className="w-1 h-3 bg-neutral-400 border border-neutral-600 rounded-b transform translate-y-0.5" />
                      <div className="w-1 h-3 bg-neutral-400 border border-neutral-600 rounded-b transform translate-y-0.5" />
                      <div className="w-1 h-3 bg-neutral-400 border border-neutral-600 rounded-b transform translate-y-0.5" />
                    </div>

                    <div className="mb-6 mt-3">
                      <h3 className="font-serif text-xl font-bold text-coffee-dark">Overlapping Journey</h3>
                      <p className="text-xs text-coffee-brown/70">A chronological list of curiosity and compiles.</p>
                    </div>

                    {/* Timeline with hand-crafted index papers style */}
                    <div className="relative pl-6 border-l border-coffee-foam/60 ml-3 space-y-6">
                      {[
                        { id: 1, title: "Curiosity", year: "2016", desc: "Started reading electronic registers, compiling assembly programs, and exploring regional coffee mills." },
                        { id: 2, title: "Systems Code", year: "2018", desc: "Dived deep into systems architecture. Spent hours resolving multi-threaded memory leaks in local roaster cafes." },
                        { id: 3, title: "Building Craft", year: "2021", desc: "Began releasing robust open source tools, proving that simplicity is the ultimate security layer." },
                        { id: 4, title: "The Quiet Era", year: "2024", desc: "Embraced wabi-sabi design guidelines, dedicating cycles to offline-first synchronization ledgers." }
                      ].map((step) => (
                        <div key={step.id} className="relative group">
                          {/* Circle ticket index */}
                          <div className="absolute -left-[30px] top-1 w-4 h-4 bg-coffee-cream border border-coffee-brown rounded-full flex items-center justify-center font-mono text-[8px] font-bold text-coffee-brown shadow-sm">
                            {step.id}
                          </div>
                          <div className="bg-coffee-cream/40 p-2.5 border border-coffee-foam/25 rounded relative hover:scale-101 hover:rotate-1 transition-all">
                            {/* Washi tape snippet */}
                            <div className="absolute top-1 right-1 w-8 h-2 bg-[#A97042]/10 rounded border-l border-r border-dashed border-coffee-brown/20" />
                            <h4 className="font-serif text-xs md:text-sm font-bold text-coffee-dark flex items-center gap-1.5">
                              {step.title} <span className="font-mono text-[8px] text-coffee-forest font-bold uppercase tracking-wider">{step.year}</span>
                            </h4>
                            <p className="text-[10px] text-coffee-brown/80 mt-1 leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* -------------------- 6. CONTACT VIEW -------------------- */}
            {activePage === "contact" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Contact Envelope Plate (Full Width 12 Cols) */}
                <div className="col-span-1 lg:col-span-12">
                  <div className={`${getPaperClass(true, true)} paper-shadow rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative min-h-[440px]`}>
                    
                    {/* Fibers pulp */}
                    <div className="paper-fiber-overlay opacity-12" />

                    {/* Paper clip on corner */}
                    <PaperclipMetal className="top-2 left-12" rotation={-5} />

                    {/* Coffee stain ring behind envelope details */}
                    <div className="coffee-ring-overlay -left-12 -bottom-12 opacity-20 transform scale-125" />

                    {/* Left Column content */}
                    <div className="flex-1 mb-8 md:mb-0 z-10 pr-6">
                      <span className="text-xs font-mono text-coffee-forest font-bold tracking-widest uppercase mb-2 block">
                        COLLABORATION BLUEPRINT LETTER
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-coffee-dark tracking-tight leading-tight">
                        Let's build something <br />meaningful.
                      </h3>
                      <p className="font-serif text-base text-coffee-brown italic mt-3 max-w-md">
                        "I am always open to discussing new projects, organic design systems, or joining remote teams aligned with slow, silent craftsmanship."
                      </p>

                      {/* Simple visual stamp on paper corner */}
                      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <a 
                          href="https://forms.fillout.com/t/oFvVUKrSWCus" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-coffee-brown hover:bg-coffee-dark text-[#FDFBF7] text-xs font-mono tracking-widest uppercase font-bold py-3.5 px-6 rounded shadow-sm flex items-center gap-2 cursor-pointer transition-colors border border-coffee-dark inline-flex"
                        >
                          DISPATCH LETTER <Send className="w-3.5 h-3.5" />
                        </a>
                        
                        <div className="flex items-center gap-3 text-coffee-brown pl-1 select-none">
                          <a href="#github" className="hover:text-coffee-caramel transition-colors p-1.5 border border-coffee-foam/20 rounded-full bg-coffee-cream/40"><Github className="w-4 h-4" /></a>
                          <a href="#linkedin" className="hover:text-coffee-caramel transition-colors p-1.5 border border-coffee-foam/20 rounded-full bg-coffee-cream/40"><Linkedin className="w-4 h-4" /></a>
                          <a href="#mail" className="hover:text-coffee-caramel transition-colors p-1.5 border border-coffee-foam/20 rounded-full bg-coffee-cream/40"><Mail className="w-4 h-4" /></a>
                        </div>
                      </div>
                    </div>

                    {/* Right Column Postage / stamp layout */}
                    <div className="relative w-72 h-56 bg-coffee-ivory/60 border border-coffee-foam/50 rounded-lg p-4 flex flex-col justify-between shadow-inner relative z-10 rotate-1">
                      {/* Grid guideline background */}
                      <div className="absolute inset-0 notebook-grid opacity-15 pointer-events-none" />
                      
                      {/* Postmark cancellation stamp overlay */}
                      <div className="absolute top-2 right-2 z-20">
                        <VintagePostmarkStamp text1="BANGALORE" text2="POST DISTRICT" date="10 JUL 2026" rotation={10} />
                      </div>

                      {/* Small mock address form block */}
                      <div className="space-y-2 mt-12 pl-2">
                        <div className="text-[9px] font-mono text-coffee-brown/40 uppercase tracking-widest font-bold">RECIPIENT ADDRESS</div>
                        <div className="font-serif text-xs font-bold text-coffee-dark italic leading-relaxed">
                          Arjun, The Quiet Engineer<br />
                          Monsoon roasters town<br />
                          India 2026 / Stable compile
                        </div>
                      </div>

                      <div className="border-t border-coffee-foam/30 pt-2 flex justify-between text-[8px] font-mono text-coffee-brown/40 uppercase">
                        <span>POSTAGE CERTIFIED</span>
                        <span>OFFLINE LEDGER</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>



      {/* Small design attribution notice block in desk margins */}
      <div className="max-w-7xl mx-auto mt-12 text-center text-[10px] font-mono text-[#6F4E37]/60 italic tracking-wider select-none click-surface">
        "A line of code, like a leaf on the water, finds its path in its own quiet time."
      </div>

    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface JournalResponse {
  title: string;
  date: string;
  content: string;
  needsConfig?: boolean;
}

export default function AIJournalTypewriter() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [journal, setJournal] = useState<JournalResponse>({
    title: "On Rains & Code Compile",
    date: "July 10, 2026",
    content: "Like drops of rain sliding down a windowpane, functions cascade and resolve. There is comfort in a warm ceramic mug and a clean build log on a gray morning."
  });
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setErrorNotice(null);

    try {
      const response = await fetch("/api/generate-journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to write in journal");
      }

      const data: JournalResponse = await response.json();
      setJournal(data);
      if (data.needsConfig) {
        setErrorNotice("Note: Gemini API is in offline demonstration mode, using local wabi-sabi reflections.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorNotice("The inkwell is blocked. I typed a fallback thought on the paper instead.");
      setJournal({
        title: "A Quiet Drift",
        date: "July 10, 2026",
        content: "We sit under the metal roof, listening to the rain's persistent tap. We write code, we stir cream into coffee, and we let the bugs sleep for just one quiet hour."
      });
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Title */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="font-serif text-lg font-medium text-coffee-dark">The AI Journal</h3>
          <span className="text-[10px] font-mono text-coffee-forest bg-coffee-forest/10 px-2 py-0.5 rounded border border-coffee-forest/20">
            Powered by Gemini
          </span>
        </div>
        <p className="text-xs text-coffee-brown/70">
          Whisper a word or concept to Arjun's notebook. He will reflect on it using code and nature.
        </p>
      </div>

      {/* Dynamic Sheet representing the actual journal paper */}
      <div className="my-4 bg-[#F2ECD9] border border-[#DDD3BC] rounded p-4 relative paper-shadow min-h-[160px] flex flex-col justify-between overflow-hidden">
        {/* Paper fibers and binder lines */}
        <div className="paper-fiber-overlay opacity-12" />
        <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-[#EAC9C9]" /> {/* Red margin line */}
        
        {/* Paper coffee ring background */}
        <div className="coffee-ring-overlay right-2 top-2 opacity-15 transform scale-75" />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-4 z-10"
            >
              {/* Animated Fountain Pen tip illustration drawing in circles */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, -5, 12, 0],
                  x: [0, 5, -3, 8, 0],
                  y: [0, -2, 4, -4, 0]
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-3xl filter drop-shadow"
              >
                🪶
              </motion.div>
              <span className="font-serif italic text-xs text-coffee-brown mt-3">
                Dipping brass nib in ink...
              </span>
              <span className="text-[9px] font-mono text-coffee-brown/50 mt-1">
                Reflecting in quiet thought
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="journal-content"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col justify-between pl-4 z-10"
            >
              <div>
                {/* Journal Date */}
                <div className="text-[10px] font-mono text-coffee-brown/50 tracking-wider flex items-center gap-1.5 mb-1 select-none">
                  <span>✏️</span>
                  <span>{journal.date}</span>
                </div>
                
                {/* Title */}
                <h4 className="font-serif text-[15px] font-semibold text-coffee-dark tracking-wide italic mb-2.5">
                  "{journal.title}"
                </h4>

                {/* Content text */}
                <p className="font-serif text-[13px] text-coffee-brown/90 leading-relaxed italic pr-2">
                  {journal.content}
                </p>
              </div>

              {/* Indian coffee signature stamp */}
              <div className="flex justify-end mt-4 select-none">
                <div className="border border-dashed border-coffee-caramel/40 rounded px-2 py-0.5 text-[8px] font-mono text-coffee-caramel/60 uppercase tracking-widest rotate-[-3deg]">
                  Arjun's Journal
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input / prompt form */}
      <form onSubmit={handleGenerate} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., code compile on rainy mornings, rusty gears, coffee steam..."
          disabled={isLoading}
          className="flex-1 bg-coffee-cream/80 border border-coffee-foam/30 rounded px-3 py-1.5 text-xs text-coffee-dark font-serif italic placeholder-coffee-brown/40 focus:outline-none focus:border-coffee-brown transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="bg-coffee-brown hover:bg-coffee-dark disabled:bg-coffee-foam/40 text-[#FDFBF7] disabled:text-coffee-brown/40 text-xs font-serif font-medium tracking-wide px-4 py-1.5 rounded transition-colors shadow-sm cursor-pointer"
        >
          Type Thought
        </button>
      </form>

      {/* Notice / error banner if any */}
      {errorNotice && (
        <div className="text-[10px] font-mono text-coffee-brown/60 italic mt-2 border-t border-coffee-foam/25 pt-1.5">
          {errorNotice}
        </div>
      )}
    </div>
  );
}

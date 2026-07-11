import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization of GoogleGenAI to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API endpoint to generate a custom wabi-sabi journal entry from Arjun
app.post("/api/generate-journal", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are Arjun, "The Quiet Engineer", a highly thoughtful developer whose design philosophy is "Software, Coffee, Nature, Simplicity." 
You live in a quiet rainy town and appreciate vintage paper journals, brewing fresh filter coffee, and writing clean wabi-sabi code.
Generate a poetic witticism, observation, or brief journal entry based on the user's prompt.
The entry must intertwine software/technology with elements of nature, coffee, or quiet moments.
Keep it brief (2 to 4 sentences), highly reflective, evocative, and editorial.
You must respond with a JSON object containing three keys:
- 'title': a brief, elegant title for the journal entry (e.g., "The Weight of a Line", "In praise of rain and compilation")
- 'date': the current date formatted nicely like "July 10, 2026" (or close to that)
- 'content': the poetic journal entry itself.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Prompt: ${prompt}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            date: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ["title", "date", "content"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    const result = JSON.parse(responseText.trim());
    return res.json(result);

  } catch (error: any) {
    console.error("Error generating journal entry:", error);
    // Return a beautiful fallback if the API key is not configured or fails
    const mockResponses: Record<string, any> = {
      default: {
        title: "On Rains & Code Compile",
        date: "July 10, 2026",
        content: "Like drops of rain sliding down a windowpane, functions cascade and resolve. There is comfort in a warm ceramic mug and a clean build log on a gray morning."
      }
    };
    
    // If it's specifically a missing API key error, return a helpful notice but allow the app to work
    if (error.message && error.message.includes("GEMINI_API_KEY")) {
      return res.json({
        title: "Waiting for ink...",
        date: "July 10, 2026",
        content: `My inkwell is empty (GEMINI_API_KEY is not configured yet). But here is a quiet thought: "A line of code is like a leaf drifting on water. It finds its path, in its own slow time."`,
        needsConfig: true
      });
    }

    return res.json({
      title: "A Quiet Echo",
      date: "July 10, 2026",
      content: `The storm is thick outside, and the lines are busy. But we write anyway. "Coffee cools, compile succeeds, the world turns slowly."`,
      error: error.message
    });
  }
});

// Serve static files / Vite dev server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

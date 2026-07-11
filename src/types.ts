export interface ColorSwatch {
  name: string;
  hex: string;
  bgClass: string;
  description: string;
}

export interface TextureSample {
  id: string;
  name: string;
  description: string;
  cssClass: string;
}

export interface ToolItem {
  name: string;
  icon: string;
  level: string;
  category: "languages" | "frameworks" | "databases" | "tools" | "design" | "cloud";
}

export interface ProjectCard {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  imageUrl: string;
  sketchUrl?: string;
  notes?: string;
}

export interface PageTransitionEffect {
  id: string;
  name: string;
  description: string;
  sketchSvg: string;
}

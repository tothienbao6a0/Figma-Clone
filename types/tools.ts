export interface ToolEffect {
  name: string;
  intensity: number;
  enabled: boolean;
}

export interface TextTool {
  fontFamily: string;
  fontSize: number;
  effects: {
    uneven: boolean;
    inkSpread: number;
    rotation: number;
    roughness: number;
  };
  color: string;
  spacing: number;
}

export interface DrawingTool {
  type: 'marker' | 'pencil' | 'crayon' | 'ballpoint' | 'highlighter';
  size: number;
  color: string;
  opacity: number;
  pressure: boolean;
  tilt: boolean;
  blendMode: string;
}

export interface CollageElement {
  type: 'paper-scrap' | 'photo-frame' | 'cut-paste';
  effects: ToolEffect[];
  transform: {
    rotation: number;
    scale: { x: number; y: number };
    position: { x: number; y: number };
  };
}

export interface DecorativeElement {
  type: 'washi' | 'sticker' | 'stamp';
  variant: string;
  opacity: number;
  scale: number;
  rotation: number;
} 
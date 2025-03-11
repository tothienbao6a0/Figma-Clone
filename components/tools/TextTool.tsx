import React, { useState } from 'react';
import { TextTool as TextToolType } from '@/types/tools';

interface TextToolProps {
  type: string;
  defaultFont?: string;
  effects?: string[];
  onTextAdd: (textConfig: TextToolType) => void;
}

export const TextTool: React.FC<TextToolProps> = ({
  type,
  defaultFont,
  effects = [],
  onTextAdd,
}) => {
  const [config, setConfig] = useState<TextToolType>({
    fontFamily: defaultFont || 'Helvetica',
    fontSize: 16,
    effects: {
      uneven: type === 'typewriter',
      inkSpread: type === 'typewriter' ? 0.3 : 0,
      rotation: type === 'cutout' ? Math.random() * 10 - 5 : 0,
      roughness: type === 'cutout' ? 0.5 : 0,
    },
    color: '#000000',
    spacing: type === 'typewriter' ? 1.2 : 1,
  });

  const handleTextInput = (text: string) => {
    // Apply effects based on tool type
    let processedText = text;
    
    if (type === 'typewriter') {
      processedText = applyTypewriterEffect(text);
    } else if (type === 'cutout') {
      processedText = applyCutoutEffect(text);
    }

    onTextAdd({
      ...config,
      text: processedText,
    });
  };

  const applyTypewriterEffect = (text: string) => {
    // Add slight randomness to character spacing and alignment
    return text.split('').map(char => ({
      char,
      offset: Math.random() * 2 - 1,
      rotation: Math.random() * 2 - 1,
    }));
  };

  const applyCutoutEffect = (text: string) => {
    // Apply rough edges and random rotations to each character
    return text.split('').map(char => ({
      char,
      rotation: Math.random() * 20 - 10,
      roughness: Math.random() * 0.5 + 0.5,
    }));
  };

  return (
    <div className="text-tool">
      <textarea
        className="text-input"
        onChange={(e) => handleTextInput(e.target.value)}
        style={{
          fontFamily: config.fontFamily,
          fontSize: config.fontSize,
          letterSpacing: `${config.spacing}em`,
        }}
      />
      <div className="text-controls">
        {/* Add font size, color, and effect controls */}
      </div>
    </div>
  );
}; 
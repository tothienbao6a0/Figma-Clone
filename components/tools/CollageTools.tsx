import React, { useState } from 'react';
import { CollageElement } from '@/types/tools';

interface CollageToolsProps {
  onCollageAdd: (element: CollageElement) => void;
}

export const CollageTools: React.FC<CollageToolsProps> = ({ onCollageAdd }) => {
  const [selectedEffect, setSelectedEffect] = useState<string>('torn-edge');
  const [config, setConfig] = useState<CollageElement>({
    type: 'paper-scrap',
    effects: [],
    transform: {
      rotation: 0,
      scale: { x: 1, y: 1 },
      position: { x: 0, y: 0 }
    }
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Process the image
    const reader = new FileReader();
    reader.onload = async (event) => {
      const image = new Image();
      image.src = event.target?.result as string;
      
      image.onload = () => {
        // Apply selected effects
        const processedImage = applyCollageEffects(image);
        
        onCollageAdd({
          ...config,
          image: processedImage,
          effects: [
            { name: selectedEffect, intensity: 1, enabled: true }
          ]
        });
      };
    };
    reader.readAsDataURL(file);
  };

  const applyCollageEffects = (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return image;

    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image
    ctx.drawImage(image, 0, 0);

    // Apply effects based on type
    switch (selectedEffect) {
      case 'torn-edge':
        applyTornEdgeEffect(ctx);
        break;
      case 'crumpled':
        applyCrumpledEffect(ctx);
        break;
      case 'folded':
        applyFoldedEffect(ctx);
        break;
    }

    return canvas.toDataURL();
  };

  const applyTornEdgeEffect = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Add rough, torn edge effect
    // Implementation here...
  };

  const applyCrumpledEffect = (ctx: CanvasRenderingContext2D) => {
    // Add paper crumple texture and shadows
    // Implementation here...
  };

  const applyFoldedEffect = (ctx: CanvasRenderingContext2D) => {
    // Add fold lines and shadows
    // Implementation here...
  };

  return (
    <div className="collage-tools">
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <select
        value={selectedEffect}
        onChange={(e) => setSelectedEffect(e.target.value)}
      >
        <option value="torn-edge">Torn Edge</option>
        <option value="crumpled">Crumpled</option>
        <option value="folded">Folded</option>
      </select>
      {/* Additional controls for transformation */}
      <div className="transform-controls">
        <input
          type="range"
          min="-180"
          max="180"
          value={config.transform.rotation}
          onChange={(e) => setConfig({
            ...config,
            transform: {
              ...config.transform,
              rotation: parseInt(e.target.value)
            }
          })}
        />
        {/* Scale and position controls */}
      </div>
    </div>
  );
}; 
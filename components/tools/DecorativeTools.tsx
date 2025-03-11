import React, { useState } from 'react';
import { DecorativeElement } from '@/types/tools';

interface DecorativeToolsProps {
  onElementAdd: (element: DecorativeElement) => void;
}

export const DecorativeTools: React.FC<DecorativeToolsProps> = ({ onElementAdd }) => {
  const [config, setConfig] = useState<DecorativeElement>({
    type: 'washi',
    variant: 'striped',
    opacity: 0.85,
    scale: 1,
    rotation: 0
  });

  const washiPatterns = ['striped', 'floral', 'dots', 'solid'];
  const stickerCategories = ['vintage', 'nature', 'typography', 'symbols'];
  const stampStyles = ['postage', 'date', 'words'];

  const handleElementAdd = () => {
    onElementAdd(config);
  };

  const renderControls = () => {
    switch (config.type) {
      case 'washi':
        return (
          <div className="washi-controls">
            <select
              value={config.variant}
              onChange={(e) => setConfig({ ...config, variant: e.target.value })}
            >
              {washiPatterns.map(pattern => (
                <option key={pattern} value={pattern}>{pattern}</option>
              ))}
            </select>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={config.opacity}
              onChange={(e) => setConfig({ ...config, opacity: parseFloat(e.target.value) })}
            />
          </div>
        );
      case 'sticker':
        return (
          <div className="sticker-controls">
            <select
              value={config.variant}
              onChange={(e) => setConfig({ ...config, variant: e.target.value })}
            >
              {stickerCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="sticker-grid">
              {/* Render sticker options based on selected category */}
            </div>
          </div>
        );
      case 'stamp':
        return (
          <div className="stamp-controls">
            <select
              value={config.variant}
              onChange={(e) => setConfig({ ...config, variant: e.target.value })}
            >
              {stampStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            <input
              type="color"
              value="#000000"
              onChange={(e) => setConfig({ ...config, inkColor: e.target.value })}
            />
          </div>
        );
    }
  };

  return (
    <div className="decorative-tools">
      <div className="type-selector">
        <button
          className={config.type === 'washi' ? 'active' : ''}
          onClick={() => setConfig({ ...config, type: 'washi' })}
        >
          Washi Tape
        </button>
        <button
          className={config.type === 'sticker' ? 'active' : ''}
          onClick={() => setConfig({ ...config, type: 'sticker' })}
        >
          Stickers
        </button>
        <button
          className={config.type === 'stamp' ? 'active' : ''}
          onClick={() => setConfig({ ...config, type: 'stamp' })}
        >
          Stamps
        </button>
      </div>
      {renderControls()}
      <div className="transform-controls">
        <input
          type="range"
          min="-180"
          max="180"
          value={config.rotation}
          onChange={(e) => setConfig({ ...config, rotation: parseInt(e.target.value) })}
        />
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={config.scale}
          onChange={(e) => setConfig({ ...config, scale: parseFloat(e.target.value) })}
        />
      </div>
      <button 
        className="apply-button"
        onClick={handleElementAdd}
      >
        Add to Canvas
      </button>
    </div>
  );
}; 
import React from 'react';
import { TextTool } from './TextTool';
import { DrawingTool } from './DrawingTool';
import { CollageTools } from './CollageTools';
import { DecorativeTools } from './DecorativeTools';

interface ToolHandlerProps {
  activeTool: string;
  onToolAction: (action: any) => void;
}

export const ToolHandler: React.FC<ToolHandlerProps> = ({ activeTool, onToolAction }) => {
  const renderTool = () => {
    switch (activeTool) {
      case 'typewriter':
        return (
          <TextTool
            type="typewriter"
            defaultFont="American Typewriter"
            effects={['uneven-spacing', 'ink-spread']}
            onTextAdd={onToolAction}
          />
        );
      case 'handwriting':
        return (
          <TextTool
            type="handwriting"
            defaultFont="Homemade Apple"
            effects={['pressure-sensitivity', 'natural-flow']}
            onTextAdd={onToolAction}
          />
        );
      case 'cutout':
        return (
          <TextTool
            type="cutout"
            effects={['rough-edge', 'rotate-random']}
            onTextAdd={onToolAction}
          />
        );
      case 'freeform':
        return (
          <DrawingTool
            brushes={['marker', 'pencil', 'crayon', 'ballpoint']}
            pressureSensitive={true}
            onDraw={onToolAction}
          />
        );
      // Add more tool cases...
    }
  };

  return (
    <div className="tool-handler">
      {renderTool()}
    </div>
  );
}; 
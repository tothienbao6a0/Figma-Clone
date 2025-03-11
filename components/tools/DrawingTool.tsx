import React, { useRef, useState, useEffect } from 'react';
import { DrawingTool as DrawingToolType } from '@/types/tools';

interface DrawingToolProps {
  brushes: string[];
  pressureSensitive: boolean;
  onDraw: (drawingConfig: DrawingToolType) => void;
}

export const DrawingTool: React.FC<DrawingToolProps> = ({
  brushes,
  pressureSensitive,
  onDraw,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [config, setConfig] = useState<DrawingToolType>({
    type: 'marker',
    size: 2,
    color: '#000000',
    opacity: 1,
    pressure: true,
    tilt: true,
    blendMode: 'normal'
  });

  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = config.blendMode;
  }, [config.blendMode]);

  const startDrawing = (e: React.PointerEvent) => {
    setIsDrawing(true);
    const point = getPointerPosition(e);
    setLastPoint(point);

    // Capture pointer for pressure sensitivity
    if (pressureSensitive) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const draw = (e: React.PointerEvent) => {
    if (!isDrawing || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx || !lastPoint) return;

    const point = getPointerPosition(e);
    
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    
    // Apply pressure and tilt if available
    if (pressureSensitive) {
      ctx.lineWidth = config.size * (e.pressure || 1);
      if (config.tilt && e.tiltX !== undefined) {
        ctx.rotate(Math.atan2(e.tiltY || 0, e.tiltX));
      }
    } else {
      ctx.lineWidth = config.size;
    }

    ctx.strokeStyle = config.color;
    ctx.globalAlpha = config.opacity;
    
    // Apply different brush effects based on type
    switch (config.type) {
      case 'marker':
        ctx.globalCompositeOperation = 'multiply';
        break;
      case 'pencil':
        applyPencilEffect(ctx);
        break;
      case 'crayon':
        applyCrayonEffect(ctx);
        break;
      case 'highlighter':
        ctx.globalCompositeOperation = 'overlay';
        ctx.globalAlpha = 0.4;
        break;
    }

    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    
    setLastPoint(point);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
    
    // Save the drawing state
    if (canvasRef.current) {
      const imageData = canvasRef.current.toDataURL();
      onDraw({ ...config, imageData });
    }
  };

  const getPointerPosition = (e: React.PointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const applyPencilEffect = (ctx: CanvasRenderingContext2D) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = config.size * 0.8;
  };

  const applyCrayonEffect = (ctx: CanvasRenderingContext2D) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = config.size * 1.5;
    // Add texture
    ctx.shadowColor = config.color;
    ctx.shadowBlur = 1;
  };

  return (
    <div className="drawing-tool">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerOut={stopDrawing}
        style={{ touchAction: 'none' }}
      />
      <div className="drawing-controls">
        <select
          value={config.type}
          onChange={(e) => setConfig({ ...config, type: e.target.value as DrawingToolType['type'] })}
        >
          {brushes.map(brush => (
            <option key={brush} value={brush}>{brush}</option>
          ))}
        </select>
        <input
          type="range"
          min="1"
          max="20"
          value={config.size}
          onChange={(e) => setConfig({ ...config, size: parseInt(e.target.value) })}
        />
        <input
          type="color"
          value={config.color}
          onChange={(e) => setConfig({ ...config, color: e.target.value })}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={config.opacity}
          onChange={(e) => setConfig({ ...config, opacity: parseFloat(e.target.value) })}
        />
        <button 
          className="apply-button"
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas) {
              canvas.isDrawingMode = true;
              canvas.freeDrawingBrush.width = config.size;
              canvas.freeDrawingBrush.color = config.color;
            }
          }}
        >
          Start Drawing
        </button>
      </div>
    </div>
  );
}; 
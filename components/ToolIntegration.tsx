import React, { useRef, useState } from 'react';
import { ToolHandler } from './tools/ToolHandler';
import { TextTool } from './tools/TextTool';
import { DrawingTool } from './tools/DrawingTool';
import { CollageTools } from './tools/CollageTools';
import { DecorativeTools } from './tools/DecorativeTools';
import { PageLayoutTool } from './tools/PageLayoutTool';
import { fabric } from 'fabric';

interface ToolIntegrationProps {
  canvas: fabric.Canvas | null;
  activeTool?: string;
}

const ToolIntegration: React.FC<ToolIntegrationProps> = ({ canvas, activeTool = 'select' }) => {
  const [toolbarVisible, setToolbarVisible] = useState(true);
  
  // Handle tool actions
  const handleToolAction = (action: any) => {
    if (!canvas) return;
    
    switch (activeTool) {
      case 'typewriter':
      case 'handwriting':
      case 'cutout':
      case 'text':
        addTextToCanvas(action);
        break;
      case 'marker':
      case 'pencil':
      case 'highlight':
      case 'correction':
        // Drawing is handled directly by the canvas
        break;
      case 'washi':
      case 'stickers':
      case 'stamps':
        addDecorativeElement(action);
        break;
      case 'paper-scrap':
      case 'photo-frame':
      case 'cut':
        addCollageElement(action);
        break;
      case '8page':
      case 'quarter':
      case 'half':
        applyPageLayout(action);
        break;
    }
  };

  // Add text with special effects to canvas
  const addTextToCanvas = (textConfig: any) => {
    if (!canvas) return;
    
    let textOptions: any = {
      left: 100,
      top: 100,
      fontFamily: textConfig.fontFamily,
      fontSize: textConfig.fontSize,
      fill: textConfig.color,
      charSpacing: (textConfig.spacing - 1) * 100, // Convert to fabric's charSpacing
    };
    
    // Apply special effects based on text type
    if (activeTool === 'typewriter') {
      textOptions.fontFamily = 'American Typewriter';
      textOptions.textBackgroundColor = 'rgba(255,255,255,0.8)';
    } else if (activeTool === 'cutout') {
      // For cut-out letters, we'll create individual letter objects
      const letters = textConfig.text.split('');
      letters.forEach((letter: string, i: number) => {
        const letterObj = new fabric.Text(letter, {
          ...textOptions,
          left: textOptions.left + (i * textOptions.fontSize * 0.6),
          angle: Math.random() * 10 - 5,
          backgroundColor: '#fff',
          padding: 5,
          shadow: new fabric.Shadow({
            color: 'rgba(0,0,0,0.2)',
            blur: 4,
            offsetX: 2,
            offsetY: 2
          })
        });
        canvas.add(letterObj);
      });
      return;
    }
    
    const textObj = new fabric.Text(textConfig.text, textOptions);
    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();
  };

  // Add decorative elements to canvas
  const addDecorativeElement = (config: any) => {
    if (!canvas) return;
    
    // Load the appropriate image based on type and variant
    const imgPath = getDecorativeImagePath(config.type, config.variant);
    
    fabric.Image.fromURL(imgPath, (img) => {
      img.set({
        left: 100,
        top: 100,
        angle: config.rotation,
        scaleX: config.scale,
        scaleY: config.scale,
        opacity: config.opacity
      });
      
      // Apply special effects based on type
      if (config.type === 'washi') {
        img.set({
          width: 300,
          height: 50,
          opacity: 0.85
        });
      } else if (config.type === 'stamp') {
        // Apply stamp effect (ink texture)
        img.filters?.push(new fabric.Image.filters.BlendColor({
          color: config.inkColor || '#000000',
          mode: 'multiply'
        }));
        img.applyFilters();
      }
      
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  };

  // Get image path for decorative elements
  const getDecorativeImagePath = (type: string, variant: string) => {
    // In a real app, you'd have actual assets for these
    const basePath = '/assets/decorative/';
    return `${basePath}${type}-${variant}.png`;
  };

  // Add collage elements to canvas
  const addCollageElement = (config: any) => {
    if (!canvas || !config.image) return;
    
    fabric.Image.fromURL(config.image, (img) => {
      img.set({
        left: 100,
        top: 100,
        angle: config.transform.rotation,
        scaleX: config.transform.scale.x,
        scaleY: config.transform.scale.y
      });
      
      // Apply effects based on type
      if (config.type === 'paper-scrap') {
        // Apply torn edge effect
        img.set({
          clipPath: createTornEdgeClipPath()
        });
      } else if (config.type === 'photo-frame') {
        // Add frame around the image
        addFrameToImage(img);
      }
      
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  };

  // Create torn edge clip path
  const createTornEdgeClipPath = () => {
    // Create a jagged path for torn paper effect
    const points = [];
    const width = 200;
    const height = 150;
    
    // Top edge
    for (let x = 0; x < width; x += 10) {
      const y = Math.random() * 5;
      points.push({ x, y });
    }
    
    // Right edge
    for (let y = 0; y < height; y += 10) {
      const x = width - Math.random() * 5;
      points.push({ x, y });
    }
    
    // Bottom edge
    for (let x = width; x > 0; x -= 10) {
      const y = height - Math.random() * 5;
      points.push({ x, y });
    }
    
    // Left edge
    for (let y = height; y > 0; y -= 10) {
      const x = Math.random() * 5;
      points.push({ x, y });
    }
    
    return new fabric.Polygon(points, {
      left: 0,
      top: 0,
      fill: 'transparent'
    });
  };

  // Add frame to image
  const addFrameToImage = (img: fabric.Image) => {
    if (!canvas) return;
    
    const frame = new fabric.Rect({
      left: img.left! - 10,
      top: img.top! - 10,
      width: img.width! + 20,
      height: img.height! + 20,
      fill: 'white',
      stroke: '#ddd',
      strokeWidth: 2,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.3)',
        blur: 10,
        offsetX: 5,
        offsetY: 5
      })
    });
    
    canvas.add(frame);
    frame.sendToBack();
    canvas.renderAll();
  };

  // Apply page layout
  const applyPageLayout = (layoutConfig: any) => {
    if (!canvas) return;
    
    // Set canvas dimensions based on layout
    canvas.setDimensions({
      width: layoutConfig.dimensions.width * 96, // Convert inches to pixels (approximate)
      height: layoutConfig.dimensions.height * 96
    });
    
    // Add guide lines if needed
    if (layoutConfig.foldLines) {
      addFoldLines(layoutConfig);
    }
    
    if (layoutConfig.bleed) {
      addBleedMarks(layoutConfig);
    }
    
    canvas.renderAll();
  };

  // Add fold lines to canvas
  const addFoldLines = (layoutConfig: any) => {
    if (!canvas) return;
    
    if (layoutConfig.template === '8-panel-fold') {
      // Add horizontal fold line
      const hLine = new fabric.Line([0, canvas.height! / 2, canvas.width!, canvas.height! / 2], {
        stroke: '#aaa',
        strokeDashArray: [5, 5],
        selectable: false
      });
      
      // Add vertical fold lines
      const vLine1 = new fabric.Line([canvas.width! / 3, 0, canvas.width! / 3, canvas.height!], {
        stroke: '#aaa',
        strokeDashArray: [5, 5],
        selectable: false
      });
      
      const vLine2 = new fabric.Line([canvas.width! * 2/3, 0, canvas.width! * 2/3, canvas.height!], {
        stroke: '#aaa',
        strokeDashArray: [5, 5],
        selectable: false
      });
      
      canvas.add(hLine, vLine1, vLine2);
    }
  };

  // Add bleed marks to canvas
  const addBleedMarks = (layoutConfig: any) => {
    if (!canvas) return;
    
    // Add bleed area rectangle
    const bleedRect = new fabric.Rect({
      left: 18,
      top: 18,
      width: canvas.width! - 36,
      height: canvas.height! - 36,
      fill: 'transparent',
      stroke: '#f00',
      strokeDashArray: [5, 5],
      selectable: false
    });
    
    canvas.add(bleedRect);
  };

  // Add this function inside the ToolIntegration component
  const getToolCategory = (toolValue: string) => {
    // Text tools
    if (['typewriter', 'handwriting', 'cutout', 'text'].includes(toolValue)) {
      return 'text';
    }
    
    // Drawing tools
    if (['marker', 'pencil', 'highlight', 'correction', 'freeform'].includes(toolValue)) {
      return 'drawing';
    }
    
    // Decorative tools
    if (['washi', 'sticker', 'stamp'].includes(toolValue)) {
      return 'decorative';
    }
    
    // Collage tools
    if (['paper-scrap', 'photo-frame', 'cut', 'image'].includes(toolValue)) {
      return 'collage';
    }
    
    // Layout tools
    if (['8page', 'quarter', 'half', 'custom'].includes(toolValue)) {
      return 'layout';
    }
    
    return 'select';
  };

  // Render the appropriate tool interface based on active tool
  const renderToolInterface = () => {
    if (!toolbarVisible) return null;
    
    const toolCategory = getToolCategory(activeTool);
    
    switch (toolCategory) {
      case 'text':
        return <TextTool type={activeTool} onTextAdd={handleToolAction} />;
      case 'drawing':
        return <DrawingTool brushes={['marker', 'pencil', 'highlight', 'correction']} pressureSensitive={true} onDraw={handleToolAction} />;
      case 'decorative':
        return <DecorativeTools onElementAdd={handleToolAction} />;
      case 'collage':
        return <CollageTools onCollageAdd={handleToolAction} />;
      case 'layout':
        return <PageLayoutTool onLayoutChange={handleToolAction} />;
      default:
        return <div className="tool-info">Select a tool from the sidebar</div>;
    }
  };

  return (
    <div className="tool-integration">
      <button 
        className="toggle-toolbar"
        onClick={() => setToolbarVisible(!toolbarVisible)}
      >
        {toolbarVisible ? 'Hide Tools' : 'Show Tools'}
      </button>
      
      <div className={`tool-options ${toolbarVisible ? 'visible' : 'hidden'}`}>
        {renderToolInterface()}
      </div>
    </div>
  );
};

export default ToolIntegration; 
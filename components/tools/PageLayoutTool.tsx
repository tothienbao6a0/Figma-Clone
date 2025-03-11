import React, { useState } from 'react';

interface PageLayoutProps {
  onLayoutChange: (layout: any) => void;
}

export const PageLayoutTool: React.FC<PageLayoutProps> = ({ onLayoutChange }) => {
  const [selectedLayout, setSelectedLayout] = useState('8page');

  const layouts = {
    '8page': {
      template: "8-panel-fold",
      dimensions: { width: 8.5, height: 11 },
      panels: 8,
      foldLines: true
    },
    'quarter': {
      template: "quarter-size",
      dimensions: { width: 5.5, height: 4.25 },
      panels: 1,
      bleed: true
    },
    'half': {
      template: "half-size",
      dimensions: { width: 5.5, height: 8.5 },
      panels: 1,
      bleed: true
    }
  };

  const handleLayoutSelect = (layoutType: string) => {
    setSelectedLayout(layoutType);
    onLayoutChange(layouts[layoutType]);
  };

  const renderGuides = (layout: string) => {
    // Render appropriate guide lines based on layout type
    switch (layout) {
      case '8page':
        return <div className="eight-page-guides">
          {/* Fold lines and panel markers */}
          <div className="fold-lines" />
          <div className="panel-numbers" />
          <div className="print-marks" />
        </div>;
      case 'quarter':
      case 'half':
        return <div className="bleed-guides">
          {/* Bleed marks and safe area */}
          <div className="bleed-marks" />
          <div className="safe-area" />
        </div>;
    }
  };

  return (
    <div className="page-layout-tool">
      <div className="layout-selector">
        {Object.keys(layouts).map(layout => (
          <button
            key={layout}
            className={selectedLayout === layout ? 'active' : ''}
            onClick={() => handleLayoutSelect(layout)}
          >
            {layout}
          </button>
        ))}
      </div>
      <div className="layout-preview">
        {renderGuides(selectedLayout)}
      </div>
      <div className="layout-options">
        <label>
          <input
            type="checkbox"
            checked={layouts[selectedLayout].foldLines}
            onChange={(e) => onLayoutChange({
              ...layouts[selectedLayout],
              foldLines: e.target.checked
            })}
          />
          Show Fold Lines
        </label>
        <label>
          <input
            type="checkbox"
            checked={layouts[selectedLayout].bleed}
            onChange={(e) => onLayoutChange({
              ...layouts[selectedLayout],
              bleed: e.target.checked
            })}
          />
          Show Bleed Marks
        </label>
      </div>
    </div>
  );
}; 
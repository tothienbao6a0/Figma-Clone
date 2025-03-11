export const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export const fontFamilyOptions = [
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Brush Script MT", label: "Brush Script MT" },
  // Add zine-specific fonts
  { value: "American Typewriter", label: "American Typewriter" },
  { value: "Homemade Apple", label: "Homemade Apple" },
  { value: "Caveat", label: "Caveat" },
  { value: "Permanent Marker", label: "Permanent Marker" }
];

export const shapeElements = [
  {
    icon: "/assets/rectangle.svg",
    name: "Rectangle",
    value: "rectangle",
  },
  {
    icon: "/assets/circle.svg",
    name: "Circle",
    value: "circle",
  },
  {
    icon: "/assets/triangle.svg",
    name: "Triangle",
    value: "triangle",
  },
  {
    icon: "/assets/line.svg",
    name: "Line",
    value: "line",
  },
  {
    icon: "/assets/image.svg",
    name: "Image",
    value: "image",
  },
  {
    icon: "/assets/freeform.svg",
    name: "Free Drawing",
    value: "freeform",
  },
];

export const navElements = [
  {
    icon: "/assets/select.svg",
    name: "Select & Transform",
    value: "select",
    actions: {
      rotate: true,
      scale: true,
      move: true,
      distort: true
    }
  },
  {
    name: "Text & Typography",
    icon: "/assets/text.svg",
    value: [
      { 
        name: "Typewriter Text", 
        value: "typewriter", 
        icon: "/assets/typewriter.svg",
        fontFamily: "American Typewriter",
        effects: ["uneven-spacing", "ink-spread"]
      },
      { 
        name: "Handwriting", 
        value: "handwriting", 
        icon: "/assets/handwriting.svg",
        fonts: ["Homemade Apple", "Caveat", "Permanent Marker"]
      },
      { 
        name: "Cut-out Letters", 
        value: "cutout", 
        icon: "/assets/cutout.svg",
        effects: ["rough-edge", "rotate-random", "shadow"]
      },
      { 
        name: "Regular Text", 
        value: "text",
        icon: "/assets/text.svg",
        fonts: fontFamilyOptions
      }
    ]
  },
  {
    name: "Shapes & Collage",
    icon: "/assets/rectangle.svg",
    value: [
      ...shapeElements,
      { 
        name: "Paper Scrap", 
        value: "paper-scrap", 
        icon: "/assets/paper-scrap.svg",
        effects: ["torn-edge", "crumpled", "folded"]
      },
      { 
        name: "Photo Frame", 
        value: "photo-frame", 
        icon: "/assets/frame.svg",
        styles: ["polaroid", "film-strip", "newspaper"]
      },
      { 
        name: "Cut & Paste", 
        value: "cut", 
        icon: "/assets/scissors.svg",
        features: ["magnetic-lasso", "rough-cut", "collage-stack"]
      }
    ]
  },
  {
    name: "Drawing Tools",
    icon: "/assets/pen.svg",
    value: [
      {
        name: "Free Drawing",
        value: "freeform",
        icon: "/assets/freeform.svg",
        brushes: ["marker", "pencil", "crayon", "ballpoint"]
      },
      { 
        name: "Highlighter", 
        value: "highlight", 
        icon: "/assets/highlight.svg",
        opacity: 0.5,
        blendMode: "multiply"
      },
      { 
        name: "Correction Tape", 
        value: "correction", 
        icon: "/assets/correction.svg",
        effect: "white-out",
        texture: "rough"
      }
    ]
  },
  {
    name: "Decorative",
    icon: "/assets/decorative.svg",
    value: [
      { 
        name: "Washi Tape", 
        value: "washi", 
        icon: "/assets/washi.svg",
        patterns: ["striped", "floral", "dots", "solid"],
        opacity: 0.85
      },
      { 
        name: "Stickers", 
        value: "stickers", 
        icon: "/assets/stickers.svg",
        categories: ["vintage", "nature", "typography", "symbols"]
      },
      { 
        name: "Stamps", 
        value: "stamps", 
        icon: "/assets/stamps.svg",
        inkColors: ["red", "blue", "black"],
        styles: ["postage", "date", "words"]
      }
    ]
  },
  {
    name: "Page Layout",
    icon: "/assets/layout.svg",
    value: [
      { 
        name: "8-Page Zine", 
        value: "8page", 
        icon: "/assets/8page.svg",
        template: "8-panel-fold",
        guides: true
      },
      { 
        name: "Quarter Size", 
        value: "quarter", 
        icon: "/assets/quarter.svg",
        dimensions: "5.5x4.25",
        bleed: true
      },
      { 
        name: "Half Size", 
        value: "half", 
        icon: "/assets/half.svg",
        dimensions: "5.5x8.5",
        bleed: true
      }
    ]
  },
  {
    icon: "/assets/delete.svg",
    value: "delete",
    name: "Delete",
    options: {
      softDelete: true,
      selective: true,
      restore: true
    }
  },
  {
    icon: "/assets/reset.svg",
    value: "reset",
    name: "Reset",
    resetOptions: {
      position: true,
      style: true,
      all: true
    }
  },
  {
    name: "Comments",
    icon: "/assets/comments.svg",
    value: "comments",
    features: {
      annotations: true,
      collaboration: true,
      resolved: true
    }
  }
];

export const defaultNavElement = {
  icon: "/assets/select.svg",
  name: "Select",
  value: "select",
};

export const directionOptions = [
  { label: "Bring to Front", value: "front", icon: "/assets/front.svg" },
  { label: "Send to Back", value: "back", icon: "/assets/back.svg" },
];

export const fontSizeOptions = [
  {
    value: "10",
    label: "10",
  },
  {
    value: "12",
    label: "12",
  },
  {
    value: "14",
    label: "14",
  },
  {
    value: "16",
    label: "16",
  },
  {
    value: "18",
    label: "18",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "22",
    label: "22",
  },
  {
    value: "24",
    label: "24",
  },
  {
    value: "26",
    label: "26",
  },
  {
    value: "28",
    label: "28",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "32",
    label: "32",
  },
  {
    value: "34",
    label: "34",
  },
  {
    value: "36",
    label: "36",
  },
];

export const fontWeightOptions = [
  {
    value: "400",
    label: "Normal",
  },
  {
    value: "500",
    label: "Semibold",
  },
  {
    value: "600",
    label: "Bold",
  },
];

export const alignmentOptions = [
  { value: "left", label: "Align Left", icon: "/assets/align-left.svg" },
  {
    value: "horizontalCenter",
    label: "Align Horizontal Center",
    icon: "/assets/align-horizontal-center.svg",
  },
  { value: "right", label: "Align Right", icon: "/assets/align-right.svg" },
  { value: "top", label: "Align Top", icon: "/assets/align-top.svg" },
  {
    value: "verticalCenter",
    label: "Align Vertical Center",
    icon: "/assets/align-vertical-center.svg",
  },
  { value: "bottom", label: "Align Bottom", icon: "/assets/align-bottom.svg" },
];

export const shortcuts = [
  {
    key: "1",
    name: "Chat",
    shortcut: "/",
  },
  {
    key: "2",
    name: "Undo",
    shortcut: "⌘ + Z",
  },
  {
    key: "3",
    name: "Redo",
    shortcut: "⌘ + Y",
  },
  {
    key: "4",
    name: "Reactions",
    shortcut: "E",
  },
];

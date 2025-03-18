"use client";

import { useRef, useState, useEffect, MouseEvent } from 'react';

// Define shape interfaces
interface Shape {
  id: string;
  type: 'square' | 'circle' | 'line';
  x: number;
  y: number;
  selected: boolean;
  render: (ctx: CanvasRenderingContext2D) => void;
  containsPoint: (x: number, y: number) => boolean;
}

// Square class
class Square implements Shape {
  id: string;
  type: 'square' = 'square';
  x: number;
  y: number;
  size: number;
  selected: boolean;

  constructor(id: string, x: number, y: number, size: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = size;
    this.selected = false;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    
    if (this.selected) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
    }
    
    ctx.stroke();
  }

  containsPoint(x: number, y: number): boolean {
    return (
      x >= this.x - this.size / 2 &&
      x <= this.x + this.size / 2 &&
      y >= this.y - this.size / 2 &&
      y <= this.y + this.size / 2
    );
  }
}

// Circle class
class Circle implements Shape {
  id: string;
  type: 'circle' = 'circle';
  x: number;
  y: number;
  radius: number;
  selected: boolean;

  constructor(id: string, x: number, y: number, radius: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.selected = false;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    if (this.selected) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
    }
    
    ctx.stroke();
  }

  containsPoint(x: number, y: number): boolean {
    const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    return distance <= this.radius;
  }
}

// Line class
class Line implements Shape {
  id: string;
  type: 'line' = 'line';
  x: number;  // Start x
  y: number;  // Start y
  x2: number; // End x
  y2: number; // End y
  selected: boolean;

  constructor(id: string, x1: number, y1: number, x2: number, y2: number) {
    this.id = id;
    this.x = x1;
    this.y = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.selected = false;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x2, this.y2);
    
    if (this.selected) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
    }
    
    ctx.stroke();
  }

  containsPoint(x: number, y: number): boolean {
    // Calculate distance from point to line
    const A = x - this.x;
    const B = y - this.y;
    const C = this.x2 - this.x;
    const D = this.y2 - this.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = this.x;
      yy = this.y;
    } else if (param > 1) {
      xx = this.x2;
      yy = this.y2;
    } else {
      xx = this.x + param * C;
      yy = this.y + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Line is selected if point is within 5 pixels
    return distance < 5;
  }
}

type Mode = 'select' | 'square' | 'circle' | 'line' | 'erase';

const DrawingEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [mode, setMode] = useState<Mode>('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });

  // Generate unique IDs for shapes
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Redraw all shapes on canvas
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw all shapes
    shapes.forEach(shape => {
      if (shape.type === 'square') {
        renderSquare(ctx, shape);
      } else if (shape.type === 'circle') {
        renderCircle(ctx, shape);
      } else if (shape.type === 'line') {
        renderLine(ctx, shape);
      }
    });
  };

  // Helper functions to render each shape type
  const renderSquare = (ctx: CanvasRenderingContext2D, shape: any) => {
    const { x, y, size, selected } = shape;
    ctx.beginPath();
    ctx.rect(x - size / 2, y - size / 2, size, size);
    
    if (selected) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
    }
    
    ctx.stroke();
  };

  const renderCircle = (ctx: CanvasRenderingContext2D, shape: any) => {
    const { x, y, radius, selected } = shape;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    
    if (selected) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
    }
    
    ctx.stroke();
  };

  const renderLine = (ctx: CanvasRenderingContext2D, shape: any) => {
    const { x, y, x2, y2, selected } = shape;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    
    if (selected) {
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
    } else {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
    }
    
    ctx.stroke();
  };

  // Also modify how we check if a shape contains a point
  const checkIfShapeContainsPoint = (shape: any, x: number, y: number): boolean => {
    if (shape.type === 'square') {
      return (
        x >= shape.x - shape.size / 2 &&
        x <= shape.x + shape.size / 2 &&
        y >= shape.y - shape.size / 2 &&
        y <= shape.y + shape.size / 2
      );
    } else if (shape.type === 'circle') {
      const distance = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
      return distance <= shape.radius;
    } else if (shape.type === 'line') {
      // Calculate distance from point to line
      const A = x - shape.x;
      const B = y - shape.y;
      const C = shape.x2 - shape.x;
      const D = shape.y2 - shape.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;
      
      if (lenSq !== 0) param = dot / lenSq;

      let xx, yy;

      if (param < 0) {
        xx = shape.x;
        yy = shape.y;
      } else if (param > 1) {
        xx = shape.x2;
        yy = shape.y2;
      } else {
        xx = shape.x + param * C;
        yy = shape.y + param * D;
      }

      const dx = x - xx;
      const dy = y - yy;
      const distance = Math.sqrt(dx * dx + dy * dy);

      return distance < 5;
    }
    return false;
  };

  // Initial setup and redraw when shapes change
  useEffect(() => {
    redrawCanvas();
  }, [shapes]);

  // Handle mouse down
  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPoint({ x, y });
    setLastPoint({ x, y });
    
    if (mode === 'select') {
      // Find if we clicked on a shape
      const clickedShape = shapes.find(shape => checkIfShapeContainsPoint(shape, x, y));
      
      // Deselect previously selected shape
      if (selectedShape) {
        setShapes(prev => 
          prev.map(s => s.id === selectedShape.id ? { ...s, selected: false } : s)
        );
      }
      
      if (clickedShape) {
        // Select the clicked shape
        setShapes(prev => 
          prev.map(s => s.id === clickedShape.id ? { ...s, selected: true } : s)
        );
        setSelectedShape(clickedShape);
        setIsDragging(true);
      } else {
        setSelectedShape(null);
      }
    } else if (mode === 'erase') {
      // Find if we clicked on a shape to erase
      const clickedShapeIndex = shapes.findIndex(shape => checkIfShapeContainsPoint(shape, x, y));
      if (clickedShapeIndex !== -1) {
        // Remove the shape
        setShapes(prev => prev.filter((_, index) => index !== clickedShapeIndex));
      }
    } else {
      // Start drawing a new shape
      setIsDrawing(true);
    }
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (isDragging && selectedShape) {
      // Move the selected shape
      const dx = x - lastPoint.x;
      const dy = y - lastPoint.y;
      
      setShapes(prev => 
        prev.map(s => {
          if (s.id === selectedShape.id) {
            if (s.type === 'line') {
              // For lines, we need to move both endpoints
              const line = s as Line;
              return {
                ...line,
                x: line.x + dx,
                y: line.y + dy,
                x2: line.x2 + dx,
                y2: line.y2 + dy
              };
            } else {
              // For other shapes, just move the center
              return {
                ...s,
                x: s.x + dx,
                y: s.y + dy
              };
            }
          }
          return s;
        })
      );
      setLastPoint({ x, y });
    }
  };

  // Handle mouse up
  const handleMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isDrawing) {
      setIsDragging(false);
      return;
    }
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create a new shape based on the current mode
    let newShape: any = null;
    
    if (mode === 'square') {
      const size = Math.max(
        Math.abs(x - startPoint.x),
        Math.abs(y - startPoint.y)
      );
      newShape = {
        id: generateId(),
        type: 'square',
        x: startPoint.x + (x - startPoint.x) / 2,
        y: startPoint.y + (y - startPoint.y) / 2,
        size,
        selected: false
      };
    } else if (mode === 'circle') {
      const radius = Math.sqrt(
        Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
      );
      newShape = {
        id: generateId(),
        type: 'circle',
        x: startPoint.x,
        y: startPoint.y,
        radius,
        selected: false
      };
    } else if (mode === 'line') {
      newShape = {
        id: generateId(),
        type: 'line',
        x: startPoint.x,
        y: startPoint.y,
        x2: x,
        y2: y,
        selected: false
      };
    }
    
    if (newShape) {
      setShapes(prev => [...prev, newShape]);
    }
    
    setIsDrawing(false);
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Drawing Editor</h1>
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded ${mode === 'select' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('select')}
          >
            Select
          </button>
          <button
            className={`px-4 py-2 rounded ${mode === 'square' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('square')}
          >
            Square
          </button>
          <button
            className={`px-4 py-2 rounded ${mode === 'circle' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('circle')}
          >
            Circle
          </button>
          <button
            className={`px-4 py-2 rounded ${mode === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('line')}
          >
            Line
          </button>
          <button
            className={`px-4 py-2 rounded ${mode === 'erase' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('erase')}
          >
            Erase
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-200"
            onClick={() => {
              setShapes([]);
              setSelectedShape(null);
            }}
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="flex-grow p-4 bg-gray-50">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border border-gray-300 bg-white"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setIsDrawing(false);
            setIsDragging(false);
          }}
        />
      </div>
    </div>
  );
};

export default DrawingEditor;
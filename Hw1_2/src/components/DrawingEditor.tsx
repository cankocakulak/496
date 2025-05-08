"use client";

import { useRef, useState, useEffect, MouseEvent } from 'react';
import { ShapeRegistry, ShapeType, Shape } from '@/models/ShapeRegistry';

type Mode = ShapeType | 'select' | 'erase';

/**
 * DrawingEditor Component
 * 
 * This component demonstrates:
 * 1. Object-Oriented Programming principles in a TypeScript/React environment
 * 2. Interactive graphics handling with HTML5 Canvas
 * 3. Event-driven programming with mouse interactions
 * 4. State management for drawing operations
 * 
 * Features:
 * - Create squares, circles, and lines
 * - Move shapes by dragging
 * - Erase shapes
 * - Select and highlight shapes
 */

const DrawingEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [mode, setMode] = useState<Mode>('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });

  /**
   * Generates a unique ID for each shape
   * Demonstrates encapsulation of implementation details
   */
  const generateId = () => Math.random().toString(36).substring(2, 9);

  /**
   * Redraws all shapes on the canvas
   * Demonstrates iteration over object collection and polymorphic rendering
   */
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    shapes.forEach(shape => {
      const config = ShapeRegistry[shape.type as ShapeType];
      config.render(ctx, shape);
    });
  };

  // Initial setup and redraw when shapes change
  useEffect(() => {
    redrawCanvas();
  }, [shapes]);

  /**
   * Mouse event handlers
   * Demonstrate event-driven programming and object manipulation
   */
  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPoint({ x, y });
    setLastPoint({ x, y });
    
    if (mode === 'select') {
      // Find if we clicked on a shape using ShapeRegistry
      const clickedShape = shapes.find(shape => 
        ShapeRegistry[shape.type as ShapeType].containsPoint(shape, x, y)
      );
      
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
      // Find if we clicked on a shape to erase using ShapeRegistry
      const clickedShapeIndex = shapes.findIndex(shape => 
        ShapeRegistry[shape.type as ShapeType].containsPoint(shape, x, y)
      );
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
              const line = s as Shape & { x2: number; y2: number };
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
    } else if (isDrawing && mode in ShapeRegistry) {
      // Preview the shape being drawn
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      // Redraw existing shapes
      redrawCanvas();
      
      // Draw preview shape
      const config = ShapeRegistry[mode as ShapeType];
      const previewShape = config.create(
        'preview',
        startPoint.x,
        startPoint.y,
        x,
        y
      );
      config.render(ctx, previewShape);
    }
    
    setLastPoint({ x, y });
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
    
    if (mode in ShapeRegistry) {
      const config = ShapeRegistry[mode as ShapeType];
      const newShape = config.create(generateId(), startPoint.x, startPoint.y, x, y);
      setShapes(prev => [...prev, newShape]);
    }
    
    setIsDrawing(false);
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* UI Controls - Demonstrate user interaction with objects */}
      <div className="bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Drawing Editor</h1>
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded ${mode === 'select' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('select')}
          >
            Select
          </button>
          {/* Generate shape buttons dynamically */}
          {Object.values(ShapeRegistry).map(config => (
            <button
              key={config.type}
              className={`px-4 py-2 rounded ${mode === config.type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMode(config.type)}
            >
              {config.label}
            </button>
          ))}
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
      
      {/* Canvas - Demonstrates graphics rendering */}
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
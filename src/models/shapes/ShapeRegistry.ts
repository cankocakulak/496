/**
 * Object-Oriented Drawing Editor
 * This file demonstrates core OOP principles:
 * 1. Inheritance: Shape classes inherit from BaseShape
 * 2. Encapsulation: Properties and methods are bundled in classes
 * 3. Polymorphism: Each shape implements its own render and containsPoint methods
 * 4. Abstraction: BaseShape provides a common interface
 */

export type ShapeType = 'square' | 'circle' | 'line';

export interface Shape {
    id: string;
    type: ShapeType;
    x: number;
    y: number;
    selected: boolean;
    size?: number;
    radius?: number;
    x2?: number;
    y2?: number;
}

interface ShapeConfig {
    type: ShapeType;
    label: string;
    render: (ctx: CanvasRenderingContext2D, shape: Shape) => void;
    containsPoint: (shape: Shape, x: number, y: number) => boolean;
    create: (id: string, startX: number, startY: number, endX: number, endY: number) => Shape;
}

export const ShapeRegistry: Record<ShapeType, ShapeConfig> = {
    square: {
        type: 'square',
        label: 'Square',
        render: (ctx, shape) => {
            const { x, y, size, selected } = shape as any;
            ctx.beginPath();
            ctx.rect(x - size/2, y - size/2, size, size);
            ctx.strokeStyle = selected ? 'blue' : 'black';
            ctx.lineWidth = selected ? 2 : 1;
            ctx.stroke();
        },
        containsPoint: (shape, x, y) => {
            const { x: shapeX, y: shapeY, size } = shape as any;
            return (
                x >= shapeX - size/2 &&
                x <= shapeX + size/2 &&
                y >= shapeY - size/2 &&
                y <= shapeY + size/2
            );
        },
        create: (id, startX, startY, endX, endY) => ({
            id,
            type: 'square',
            x: startX + (endX - startX)/2,
            y: startY + (endY - startY)/2,
            size: Math.max(Math.abs(endX - startX), Math.abs(endY - startY)),
            selected: false
        })
    },
    circle: {
        type: 'circle',
        label: 'Circle',
        render: (ctx, shape) => {
            const { x, y, radius, selected } = shape as any;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = selected ? 'blue' : 'black';
            ctx.lineWidth = selected ? 2 : 1;
            ctx.stroke();
        },
        containsPoint: (shape, x, y) => {
            const { x: centerX, y: centerY, radius } = shape as any;
            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            return distance <= radius;
        },
        create: (id, startX, startY, endX, endY) => ({
            id,
            type: 'circle',
            x: startX,
            y: startY,
            radius: Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2),
            selected: false
        })
    },
    line: {
        type: 'line',
        label: 'Line',
        render: (ctx, shape) => {
            const { x, y, x2, y2, selected } = shape as any;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = selected ? 'blue' : 'black';
            ctx.lineWidth = selected ? 2 : 1;
            ctx.stroke();
        },
        containsPoint: (shape, x, y) => {
            const { x: x1, y: y1, x2, y2 } = shape as any;
            const A = x - x1;
            const B = y - y1;
            const C = x2 - x1;
            const D = y2 - y1;
            const dot = A * C + B * D;
            const lenSq = C * C + D * D;
            let param = -1;
            if (lenSq !== 0) param = dot / lenSq;
            let xx, yy;
            if (param < 0) {
                xx = x1;
                yy = y1;
            } else if (param > 1) {
                xx = x2;
                yy = y2;
            } else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }
            const dx = x - xx;
            const dy = y - yy;
            return Math.sqrt(dx * dx + dy * dy) < 5;
        },
        create: (id, startX, startY, endX, endY) => ({
            id,
            type: 'line',
            x: startX,
            y: startY,
            x2: endX,
            y2: endY,
            selected: false
        })
    }
}; 
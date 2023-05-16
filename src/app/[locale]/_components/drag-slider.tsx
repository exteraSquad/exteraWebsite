"use client";

import {ReactNode, useCallback, useEffect, useRef, useState} from "react";

export type DragSliderProps = {
    children: ReactNode;
}

export default function DragSlider({children}: DragSliderProps) {
    const [dragged, setDragged] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const currentTouch = useRef<{ x: number, y: number } | null>(null);
    const velX = useRef(0);
    const accX = useRef(0);
    const decelerationCoefficient = useRef(0.92);

    const startDrag = useCallback((x: number, y: number) => {
        if (!root.current) return;
        const clickedElement = document.elementFromPoint(x, y);
        if (clickedElement?.closest("[data-drag-slider-ignore]")) return;
        setDragged(true)
    }, [])
    const stopDrag = useCallback(() => {
        setDragged(false);
        currentTouch.current = null;
    }, [])
    const updateDrag = useCallback((movX: number) => {
        if (!dragged || !root.current) return;
        accX.current = -movX;
    }, [dragged])

    useEffect(() => {
        let currentFrame = 0;
        const update = () => {
            if (root.current) {
                velX.current += accX.current;
                if (dragged && Math.abs(velX.current) > Math.abs(accX.current)) velX.current = accX.current;
                root.current.scrollLeft += velX.current;
                accX.current = 0;
                velX.current *= decelerationCoefficient.current;
            }
            currentFrame = requestAnimationFrame(update);
        }
        currentFrame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(currentFrame);
    }, [dragged])

    return (
        <div
            className={`px-5 md:px-8 grid grid-flow-col select-none gap-8 items-center w-full max-w-full overflow-x-hidden 
            ${dragged ? 'cursor-grabbing' : 'cursor-grab'}`}

            onMouseDown={e => {
                startDrag(e.clientX, e.clientY);
            }}
            onTouchStart={e => {
                const touch = e.touches[0];
                startDrag(touch.clientX, touch.clientY);
            }}

            onMouseUp={stopDrag}
            onTouchEnd={stopDrag}
            onMouseLeave={stopDrag}

            onMouseMove={e => updateDrag(e.movementX)}
            ref={root}
            onTouchMove={e => {
                const touch = e.touches[0];
                if (currentTouch.current) {
                    const movX = touch.pageX - currentTouch.current.x;
                    updateDrag(movX);
                }

                currentTouch.current = {
                    x: touch.pageX,
                    y: touch.pageY
                }
            }}
        >
            <div className={`contents ${dragged ? 'pointer-events-none' : ''}`}>
                {children}
            </div>
        </div>
    )
}
"use client";

import {ReactNode, useCallback, useEffect, useRef, useState} from "react";

export type DragSliderProps = {
    children: ReactNode;
    buttonHeight?: {
        top: number;
        bottom: number;
    }
}

export default function DragSlider({children, buttonHeight}: DragSliderProps) {
    const [dragged, setDragged] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const currentTouch = useRef<{ x: number, y: number } | null>(null);
    const velX = useRef(0);
    const accX = useRef(0);
    const decelerationCoefficient = useRef(0.4);

    const startDrag = useCallback((pageY: number) => {
        if (!root.current) return;
        const top = root.current.getBoundingClientRect().y - document.body.getBoundingClientRect().y;
        if (buttonHeight && top + buttonHeight.top < pageY && pageY < top + buttonHeight.bottom) return;
        setDragged(true)
    }, [buttonHeight])
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
            className={`grid grid-flow-col select-none gap-8 items-center w-full max-w-full overflow-x-hidden ${dragged ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={e => {
                startDrag(e.pageY)
                decelerationCoefficient.current = 0.4;
            }}
            onTouchStart={e => {
                startDrag(e.touches[0].pageY)
                decelerationCoefficient.current = 0.75;
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
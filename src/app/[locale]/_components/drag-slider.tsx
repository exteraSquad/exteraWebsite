"use client";

import {ReactNode, useCallback, useRef, useState} from "react";

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
        root.current.scrollLeft -= movX;
    }, [dragged])

    return (
        <div
            className={`grid grid-flow-col select-none gap-8 items-center w-full max-w-full overflow-x-hidden ${dragged ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={e => startDrag(e.pageY)}
            onTouchStart={e => {
                startDrag(e.touches[0].pageY)
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
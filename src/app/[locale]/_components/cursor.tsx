"use client";

import {useEffect, useRef} from "react";

export type CursorProps = {
    smoothnessCoefficient?: number;
}

export default function Cursor({smoothnessCoefficient = 0.9}: CursorProps) {
    const trail = useRef<HTMLDivElement>(null);
    const mousePosition = useRef<{ x: number, y: number }>({x: 0, y: 0});
    const trailPosition = useRef<{ x: number, y: number }>({x: 0, y: 0});
    const trailSize = useRef<{ width: number, height: number }>({width: 0, height: 0});
    const pullOpacity = useRef(0);
    const pullText = useRef<HTMLSpanElement>(null);
    const hoveredElement = useRef<Element | null>(null);

    useEffect(() => {
        let currentFrame: number;
        const move = () => {
            hoveredElement.current = document.elementFromPoint(mousePosition.current.x, mousePosition.current.y);
            if (trail.current && pullText.current) {
                const cursorStyle = hoveredElement.current ? window.getComputedStyle(hoveredElement.current)["cursor"] : "auto" as const;

                // Trail position
                trailPosition.current.x = trailPosition.current.x * smoothnessCoefficient + mousePosition.current.x * (1 - smoothnessCoefficient);
                trailPosition.current.y = trailPosition.current.y * smoothnessCoefficient + mousePosition.current.y * (1 - smoothnessCoefficient);

                trail.current.style.left = trailPosition.current.x + "px";
                trail.current.style.top = trailPosition.current.y + "px";

                // Trail size
                const trailSizeTarget =
                    cursorStyle === "pointer" ? {width: 32, height: 32} :
                        cursorStyle === "grab" ? {width: 48, height: 48} :
                            cursorStyle === "grabbing" ? {width: 64, height: 32} :
                                cursorStyle === "help" ? {width: 2, height: 2} :
                                    {width: 16, height: 16};

                trailSize.current.width = trailSize.current.width * smoothnessCoefficient + trailSizeTarget.width * (1 - smoothnessCoefficient);
                trailSize.current.height = trailSize.current.height * smoothnessCoefficient + trailSizeTarget.height * (1 - smoothnessCoefficient);

                trail.current.style.width = trailSize.current.width + "px";
                trail.current.style.height = trailSize.current.height + "px";

                // Pull text opacity
                const pullOpacityTarget = cursorStyle === "grab" ? 1 : 0;
                pullOpacity.current = pullOpacityTarget < 0.001 ? 0 : pullOpacity.current * smoothnessCoefficient + pullOpacityTarget * (1 - smoothnessCoefficient);

                pullText.current.style.opacity = pullOpacity.current + "";
            }
            currentFrame = requestAnimationFrame(move);
        }
        currentFrame = requestAnimationFrame(move);

        const mouseMoveHandler = (e: MouseEvent) => {
            mousePosition.current = {
                x: e.clientX,
                y: e.clientY
            }
        }

        document.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            cancelAnimationFrame(currentFrame)
            document.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, [smoothnessCoefficient]);

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 only-touch:hidden">
            <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full pointer-events-none
                bg-opacity-50 backdrop-filter backdrop-blur-sm"
                ref={trail}
            >
                <span
                    className="relative text-white text-sm font-bold pointer-events-none left-1/4 top-1/3"
                    ref={pullText}
                >
                    Pull
                </span>
            </div>
        </div>
    )
}
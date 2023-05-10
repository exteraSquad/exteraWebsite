"use client";

import {useEffect, useRef, useState} from "react";

export type CursorProps = {
    smoothnessCoefficient?: number;
}

export default function Cursor({smoothnessCoefficient = 0.9}: CursorProps) {
    const trail = useRef<HTMLDivElement>(null);
    const mousePosition = useRef<{ x: number, y: number }>({x: 0, y: 0});
    const trailPosition = useRef<{ x: number, y: number }>({x: 0, y: 0});
    const trailSize = useRef<{ width: number, height: number }>({width: 0, height: 0});
    const pullOpacity = useRef(0);
    const pullText = useRef<HTMLDivElement>(null);
    const hoveredElement = useRef<Element | null>(null);
    const [light, setLight] = useState(false);

    useEffect(() => {
        let currentFrame: number;
        const move = () => {
            hoveredElement.current = document.elementFromPoint(mousePosition.current.x, mousePosition.current.y);
            if (trail.current && pullText.current) {
                const computedStyle = hoveredElement.current ? getComputedStyle(hoveredElement.current) : null;
                const cursorStyle = computedStyle?.cursor || "default";

                // Trail position
                trailPosition.current.x = trailPosition.current.x * smoothnessCoefficient + mousePosition.current.x * (1 - smoothnessCoefficient);
                trailPosition.current.y = trailPosition.current.y * smoothnessCoefficient + mousePosition.current.y * (1 - smoothnessCoefficient);

                trail.current.style.left = trailPosition.current.x + "px";
                trail.current.style.top = trailPosition.current.y + "px";

                // Trail size
                const trailSizeTarget =
                    cursorStyle === "pointer" ? {width: 24, height: 24} :
                        cursorStyle === "grab" ? {width: 64, height: 64} :
                            {width: 12, height: 12};

                trailSize.current.width = trailSize.current.width * smoothnessCoefficient + trailSizeTarget.width * (1 - smoothnessCoefficient);
                trailSize.current.height = trailSize.current.height * smoothnessCoefficient + trailSizeTarget.height * (1 - smoothnessCoefficient);

                trail.current.style.width = trailSize.current.width + "px";
                trail.current.style.height = trailSize.current.height + "px";

                // Light
                const linkParent = hoveredElement.current?.closest("button, a");
                const isLight = (cursorStyle === "pointer" &&
                    linkParent?.className.includes("bg-primary-500")
                ) || cursorStyle === "grab";
                setLight(isLight);

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
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none
                ${light ? "bg-primary-100" : "bg-primary-500"} transition-colors duration-300 ease-in-out`}
                ref={trail}
            >
                <div
                    className="relative flex items-center justify-center w-full h-full"
                    ref={pullText}
                >
                    <span
                        className={`text-sm font-bold ${light ? "text-primary-500" : "text-primary-100"} transition-colors duration-300 ease-in-out`}
                    >
                        PULL
                    </span>
                </div>
            </div>
        </div>
    )
}
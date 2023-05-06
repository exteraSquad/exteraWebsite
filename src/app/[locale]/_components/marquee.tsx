"use client";

import {useEffect, useRef} from "react";

export type MarqueeProps = {
    children: string,
    baseVelocity?: number,
    rotation?: number,
    className?: string,
    repeatCount?: number,
    enableScrollBoost?: boolean
}

export default function Marquee(
    {children, baseVelocity = 1, rotation = 0, repeatCount = 1, enableScrollBoost = false, className}: MarqueeProps
) {
    const previousPageScroll = useRef(0);
    const marqueeScroll = useRef(0);
    const marquee = useRef<HTMLDivElement>(null);
    const reference = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let currentFrame = 0;
        const update = () => {
            if (marquee.current && reference.current) {
                const pageScroll = window.scrollY;
                const pageScrollDelta = pageScroll - previousPageScroll.current;
                previousPageScroll.current = pageScroll;

                marqueeScroll.current += baseVelocity + (pageScrollDelta * baseVelocity * Number(enableScrollBoost));

                const width = reference.current.offsetWidth;
                if (marqueeScroll.current > width) {
                    marqueeScroll.current = 0;
                } else if (marqueeScroll.current < 0) {
                    marqueeScroll.current = width;
                }

                marquee.current.style.transform = `rotate(${rotation}deg) translateX(${-marqueeScroll.current}px)`;
            }
            currentFrame = requestAnimationFrame(update);
        }
        currentFrame = requestAnimationFrame(update);

        return () => cancelAnimationFrame(currentFrame);
    }, [baseVelocity, enableScrollBoost, rotation]);

    return (
        <div className={`whitespace-nowrap ${className}`} ref={marquee}>
            <span ref={reference}>{children}{' '}</span>
            <span aria-hidden="true">{(children + ' ').repeat(repeatCount)}</span>
        </div>
    )
}
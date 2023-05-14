"use client";

import {useEffect, useRef} from "react";
import Image from "next/image";
import {evaluate} from "mathjs";

export type PhoneElement = {
    id: string,
    src: string,
    alt: string,
    width: number,
    height: number,
    z?: number,
    rotate?: string,
    translateX?: string,
    translateY?: string,
    top?: number,
    opacity?: string
}

export type PhoneProps = {
    data: PhoneElement[],
    phone: {
        src: string,
        alt: string,
    }
}

export default function Phone({data, phone: {src, alt}}: PhoneProps) {
    const progress = useRef(0);
    const root = useRef<HTMLDivElement>(null);
    const elements = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        let currentFrame = 0;
        const calculate = (s: string): number => {
            const input = s.replaceAll("{p}", String(progress.current));
            return evaluate(input);
        }
        const render = () => {
            if (root.current) {
                const rect = root.current.getBoundingClientRect();
                const newProgress = Math.min(1, window.scrollY / rect.height * 1.25)
                if (newProgress !== progress.current) {
                    progress.current = newProgress;
                    elements.current.forEach((element, i) => {
                        const item = data[i];
                        if (element) {
                            element.style.opacity = calculate(item.opacity || "1").toString();
                            element.style.transform = `rotate(${calculate(item.rotate || "0")}deg) ` +
                                `translateY(${calculate(item.translateY || "0")}px) ` +
                                `translateX(${calculate(item.translateX || "0")}px)`;
                        }
                    })
                }
            }
            currentFrame = requestAnimationFrame(render);
        }
        currentFrame = requestAnimationFrame(render);

        return () => cancelAnimationFrame(currentFrame);
    }, [data])

    return (
        <div ref={root} className="relative my-32 md:my-48 lg:my-64">
            <div className="hidden md:contents">
                {data.map((item, i) =>
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        className="absolute"
                        style={{
                            zIndex: item.z,
                            top: item.top,
                            opacity: 0,
                            transform: "none"
                        }}
                        ref={ref => {
                            if (ref) elements.current[i] = ref
                        }}
                        key={i}
                    />
                )}
            </div>
            <Image className="mx-auto" src={src} alt={alt} width={288} height={616} />
        </div>
    )
}
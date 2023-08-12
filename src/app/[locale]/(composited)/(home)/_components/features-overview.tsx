"use client";

import {ReactNode, useEffect, useRef, useState} from "react";

export type FeaturesOverviewProps = {
    features: {
        name: string;
        content: ReactNode;
    }[];
    className?: string;
    nextDelay?: number;
    smoothnessCoefficient?: number;
    leftOffset?: number;
}

export default function FeaturesOverview({features, className, smoothnessCoefficient = 0.92, leftOffset = 0, nextDelay = 5000}: FeaturesOverviewProps) {
    const [slide, setSlide] = useState(0);
    const titles = useRef<HTMLDivElement>(null);
    const contents = useRef<HTMLDivElement>(null);
    const nextTimeout = useRef<number | null>(null);

    useEffect(() => {
        const titlesRef = titles.current;
        const contentsRef = contents.current;
        if (!titlesRef || !contentsRef) return;

        if (nextTimeout.current) clearTimeout(nextTimeout.current);
        nextTimeout.current = window.setTimeout(() => {
            setSlide((slide + 1) % features.length);
        }, nextDelay);

        const calculateTarget = (root: HTMLDivElement) =>
            root.children[slide].getBoundingClientRect().x
            - root.getBoundingClientRect().x
            + root.scrollLeft
            - leftOffset;

        let animationFrame = 0;

        const animate = () => {
            const titlesTarget = calculateTarget(titlesRef);
            const contentsTarget = calculateTarget(contentsRef);

            titlesRef.scrollLeft = titlesRef.scrollLeft * smoothnessCoefficient + titlesTarget * (1 - smoothnessCoefficient);
            contentsRef.scrollLeft = contentsRef.scrollLeft * smoothnessCoefficient + contentsTarget * (1 - smoothnessCoefficient);
            animationFrame = requestAnimationFrame(animate);
        }

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame)
        };
    }, [features.length, leftOffset, nextDelay, slide, smoothnessCoefficient]);

    return (
        <div className={"relative flex flex-col gap-4 pt-6 lg:pt-10 " + className || ""}>
            <div
                className="flex flex-row gap-8 overflow-hidden text-2xl lg:text-3xl px-6 lg:px-10 font-display font-bold"
                ref={titles}
            >
                {features.map(({name}, i) => (
                    <a
                        href="#"
                        onClick={e => {
                            e.preventDefault()
                            setSlide(i)
                        }}
                        className={"min-w-max max-h-20 whitespace-pre-line " +
                            (slide !== i ? "text-neutral-500" : "text-black")}
                        key={i}
                    >
                        {name}
                    </a>
                ))}
                <div className="min-w-full h-full" />
            </div>
            <div className="flex flex-row overflow-hidden px-6 lg:px-10 flex-1 gap-14 pb-16 lg:pb-0" ref={contents}>
                {features.map(({content}, i) => (
                    <div key={i} className="min-w-full">
                        {content}
                    </div>
                ))}
            </div>
            <div className="absolute inset-x-0 bottom-16 lg:bottom-0 top-autp w-full h-48 bg-gradient-to-t from-primary-100 to-transparent pointer-events-none rounded-b-3xl" />
            <div className="absolute flex flex-row gap-2 p-3 rounded-full mx-auto bg-neutral-900 bottom-8 lg:-bottom-16 w-fit left-1/2 -translate-x-1/2">
                {features.map((_, i) => (
                    <button
                        key={i}
                        className={"w-2 h-2 rounded-full cursor-pointer " + (slide === i ? "bg-white" : "bg-neutral-800")}
                        onClick={() => setSlide(i)}
                    />
                ))}
            </div>
        </div>
    )
}
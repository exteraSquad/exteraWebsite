"use client";

import {useCallback, useEffect, useRef, useState} from "react";

export type SplashTextProps = {
    splashes: string[];
}

export default function SplashText({splashes}: SplashTextProps) {
    const [active, setActive] = useState(false);
    const [index, setIndex] = useState(0);
    const timeout = useRef(-1);

    const update = useCallback(() => {
        setIndex((index + 1) % splashes.length)
    }, [index, splashes.length])

    useEffect(() => {
        if (!active) {
            if (index !== 0) setIndex(0);
            return;
        }
        timeout.current = setTimeout(update, 600) as unknown as number;
        return () => clearTimeout(timeout.current)
    }, [active, index, splashes, update])

    return <div onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} className="w-full">{splashes[index]}</div>
}
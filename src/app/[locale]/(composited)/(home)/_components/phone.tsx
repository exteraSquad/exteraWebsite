"use client";

import {useEffect, useRef} from "react";
import Image from "next/image";

export default function Phone() {
    const progress = useRef(0);
    const root = useRef<HTMLDivElement>(null);

    const emojis = useRef<HTMLImageElement>(null);
    const speed = useRef<HTMLImageElement>(null);
    const update  = useRef<HTMLImageElement>(null);
    const icons = useRef<HTMLImageElement>(null);
    const settings = useRef<HTMLImageElement>(null);

    useEffect(() => {
        let currentFrame = 0;
        const render = () => {
            if (root.current) {
                const rect = root.current.getBoundingClientRect();
                progress.current = Math.min(1, window.scrollY / rect.height * 1.25);

                emojis.current!.style.transform = `rotate(${progress.current * -3}deg) translateX(${progress.current * -192 + 16}px)`
                speed.current!.style.transform = `rotate(${progress.current * 6}deg) translateY(${progress.current * -64}px)`
                update.current!.style.transform = `rotate(${progress.current * -5 - 3}deg) translateX(${progress.current * -192 + 16}px)`
                icons.current!.style.opacity = String(progress.current)
                icons.current!.style.transform = `rotate(${progress.current * 4}deg) translateX(${progress.current * 192 - 16}px)`
                settings.current!.style.opacity = String(progress.current)
                settings.current!.style.transform = `rotate(${(1 - progress.current) * 5}deg) translateX(${progress.current * 192 - 16}px)`
            }
            currentFrame = requestAnimationFrame(render);
        }
        currentFrame = requestAnimationFrame(render);

        return () => cancelAnimationFrame(currentFrame);
    }, [])

    return (
        <div ref={root} className="relative my-32">
            <div className="hidden md:contents">
                <Image
                    src="/images/phone/emojis.png"
                    className="absolute top-36 -z-10"
                    ref={emojis}
                    alt="emoji picker panel"
                    width={272}
                    height={68}
                />
                <Image
                    src="/images/phone/update.png"
                    className="absolute top-64 -z-10"
                    ref={update}
                    alt="app update panel"
                    width={250}
                    height={340}
                />
                <Image
                    src="/images/phone/speed.png"
                    className="absolute -z-10"
                    ref={speed}
                    alt="speed boost menu"
                    width={272}
                    height={68}
                />
                <Image
                    src="/images/phone/icons.png"
                    className="absolute top-96 z-10 opacity-0"
                    ref={icons}
                    alt="random icons"
                    width={190}
                    height={70}
                />
                <Image
                    src="/images/phone/settings.png"
                    className="absolute top-48 z-10 opacity-0"
                    ref={settings}
                    alt="setting toggles"
                    width={268}
                    height={168}
                />
            </div>
            <Image className="mx-auto" src="/images/phone/phone.png" alt="Phone" width={288} height={616} />
        </div>
    )
}
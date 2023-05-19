"use client";

import {useCallback, useEffect, useRef} from "react";

export type PathData = {
    _name: string;
    d: string;
    fillRule?: CanvasFillRule;
}

export type IconVelocity = {
    y: number,
    rotation: number,
    scale: number
}

export type XFunction = (y: number) => number;

export type Icon = {
    pos: {
        x: number,
        y: number
    },
    xFunction: XFunction;
    velocity: IconVelocity,
    opacity: number,
    scale: number,
    rotation: number,
    path: PathData
}

export type IconVelocityProp = { [k in keyof IconVelocity]?: IconVelocity[k] }

export type IconCanvasProps = {
    /**
     * Probability of a new icon being added this frame.
     * Range: From 0 to 1
     */
    probability: number;
    /**
     * List of possible icon paths.
     */
    paths: PathData[];
    /**
     * Object of minimal possible velocity per icon property.
     */
    minVelocity?: IconVelocityProp;
    /**
     * Object of maximal possible velocity per icon property.
     */
    maxVelocity?: IconVelocityProp;
    /**
     * Minimum possible icon scale.
     */
    minScale?: number;
    /**
     * Maximum possible icon scale.
     */
    maxScale?: number;
    /**
     * Minimum possible icon opacity.
     * Range: 0-255
     */
    minOpacity?: number;
    /**
     * Minimum possible icon opacity.
     * Range: 0-255
     */
    maxOpacity?: number;
    /**
     * Color of the icons in hex format with the #.
     */
    color?: string;
    /**
     * Height of the canvas in pixels.
     */
    height?: number;
    /**
     * Minimum amount of icons that should be on the canvas at any given time.
     */
    minIcons?: number;
}

export default function IconCanvas(
    {
        probability,
        paths,
        minVelocity: {
            y: minYVelocity = -0.1,
            rotation: minRotationVelocity = -0.015625,
            scale: minScaleVelocity = -0.015625,
        } = {},
        maxVelocity: {
            y: maxYVelocity = -0.025,
            rotation: maxRotationVelocity = 0.015625,
            scale: maxScaleVelocity = 0.015625,
        } = {},
        minScale = 2,
        maxScale = 3,
        minOpacity = 16,
        maxOpacity = 64,
        color = "#000000",
        height,
        minIcons = 32
    }: IconCanvasProps
) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const currentFrame = useRef<number>(0);
    const lastFrameTime = useRef<DOMHighResTimeStamp>(0);
    const icons = useRef<Icon[]>([])

    const animate = useCallback((time: DOMHighResTimeStamp) => {
        const c = canvas.current
        const ctx = c?.getContext("2d");
        if (!ctx || !c) return;

        if (lastFrameTime.current) {
            const delta = time - lastFrameTime.current;
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
            const lacksIcons = icons.current.length < minIcons;

            if (Math.random() > (1 - probability) || lacksIcons) {
                const scale = Math.random() * (maxScale - minScale) + minScale;
                const t = Math.random();
                const n = t > 0.3 && t < 0.5 ? 0.3 : t < 0.7 && t > 0.5 ? 0.7 : t;
                const x = n * c.width;
                const fun = (y: number) => (x * c.width + 3 * (x > c.width / 2 ? 1 : -1) * Math.sqrt(y * (2 * x + c.width) ** 2)) / c.width

                icons.current.push({
                    pos: {
                        x,
                        y: lacksIcons ? Math.random() * c.height : c.height + scale * 24,
                    },
                    velocity: {
                        y: Math.random() * (maxYVelocity - minYVelocity) + minYVelocity,
                        rotation: Math.random() * (maxRotationVelocity - minRotationVelocity) + minRotationVelocity,
                        scale: Math.random() * (maxScaleVelocity - minScaleVelocity) + minScaleVelocity
                    },
                    xFunction: fun,
                    opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
                    scale,
                    rotation: Math.random() * 360,
                    path: paths[Math.floor(Math.random() * paths.length)]
                })
            }

            const deletionQueue: number[] = [];
            icons.current.forEach((icon, i) => {
                icon.pos.y += icon.velocity.y * delta;
                icon.pos.x = icon.xFunction(c.height - icon.pos.y);
                icon.rotation += icon.velocity.rotation * delta;
                icon.scale += icon.velocity.scale * delta;
                icon.scale = Math.min(maxScale, Math.max(icon.scale, minScale));

                if (icon.pos.y < -icon.scale * 24) {
                    deletionQueue.push(i);
                    return;
                }
                if (isNaN(icon.pos.x)) return;

                ctx.save();

                ctx.translate(icon.pos.x, icon.pos.y);
                ctx.scale(icon.scale, icon.scale);
                ctx.rotate(icon.rotation * Math.PI / 180);
                let opacity = Math.round(icon.opacity).toString(16);
                if (opacity.length < 2) opacity = "0" + opacity;

                ctx.beginPath();
                ctx.fillStyle = color + opacity;
                const path = new Path2D(icon.path.d);
                ctx.fill(path, icon.path.fillRule);

                ctx.restore();
            })
            deletionQueue.forEach(i => icons.current.splice(i, 1))
        }

        lastFrameTime.current = time;
        currentFrame.current = requestAnimationFrame(animate);
    }, [
        canvas,
        color,
        maxOpacity,
        maxRotationVelocity,
        maxScale,
        maxScaleVelocity,
        maxYVelocity,
        minOpacity,
        minRotationVelocity,
        minScale,
        minScaleVelocity,
        minYVelocity,
        paths,
        probability,
        minIcons
    ])
    const resize = useCallback(() => {
        if (!canvas.current) return;

        canvas.current.width = window.document.body.clientWidth;
        canvas.current.height = height || window.visualViewport?.height || 1080;
    }, [canvas, height])

    useEffect(() => {
        resize();
        window.addEventListener("resize", resize);

        currentFrame.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(currentFrame.current);
    }, [
        animate,
        resize
    ])

    return (
        <canvas ref={canvas} className="absolute pointer-events-none top-0 left-0 -z-10 max-w-full" />
    )
}
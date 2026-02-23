"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
    number?: number;
    className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
    const [meteors, setMeteors] = useState<
        Array<{
            top: string;
            left: string;
            animationDelay: string;
            animationDuration: string;
        }>
    >([]);

    useEffect(() => {
        const newMeteors = new Array(number).fill(true).map(() => ({
            top: Math.floor(Math.random() * 100) + "vh",
            left: Math.floor(Math.random() * 100) + "vw",
            animationDelay: Math.random() * 1 + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
        }));
        setMeteors(newMeteors);
    }, [number]);

    return (
        <>
            {meteors.map((meteor, idx) => (
                <span
                    key={"meteor" + idx}
                    className={cn(
                        "fixed h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
                        "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
                        "animate-meteor -z-10",
                        className
                    )}
                    style={{
                        top: meteor.top,
                        left: meteor.left,
                        animationDelay: meteor.animationDelay,
                        animationDuration: meteor.animationDuration,
                    }}
                ></span>
            ))}
        </>
    );
};

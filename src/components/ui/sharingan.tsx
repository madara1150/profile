"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SharinganProps {
    className?: string;
    isSpinning?: boolean;
}

export function Sharingan({ className, isSpinning = false }: SharinganProps) {
    return (
        <motion.div
            className={cn("relative rounded-full aspect-square overflow-hidden bg-[#8b0000] border-4 border-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_0_30px_rgba(255,0,0,0.5)] flex items-center justify-center", className)}
            animate={{ rotate: isSpinning ? 360 : 0 }}
            transition={{
                repeat: isSpinning ? Infinity : 0,
                duration: 1.5,
                ease: "linear"
            }}
        >
            {/* Target/Pupil rings */}
            <div className="absolute w-[60%] h-[60%] rounded-full border-2 border-black/30" />
            <div className="absolute w-[30%] h-[30%] rounded-full bg-black shadow-[0_0_15px_rgba(0,0,0,0.8)]" />

            {/* Sharingan Tomoe (Three commas) */}
            <Tomoe rotation={0} />
            <Tomoe rotation={120} />
            <Tomoe rotation={240} />
        </motion.div>
    );
}

function Tomoe({ rotation }: { rotation: number }) {
    return (
        <div
            className="absolute w-[18%] h-[18%] top-[18%] left-[41%] origin-[50%_177%]"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                <path fill="currentColor" d="M50 0 C77.6 0 100 22.4 100 50 C100 77.6 77.6 100 50 100 C40 100 30 95 24 88 C32 94 44 94 50 88 C60 78 60 62 50 52 C44 46 36 44 28 46 C20 48 10 58 10 58 C10 58 0 45 0 30 C0 13.4 13.4 0 30 0 C38 0 45 4 50 0 Z" />
            </svg>
        </div>
    );
}

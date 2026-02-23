"use client";

import { motion } from "framer-motion";
import { Sharingan } from "./sharingan";

interface GenjutsuTransitionProps {
    isActive: boolean;
    onComplete: () => void;
}

export function GenjutsuTransition({ isActive, onComplete }: GenjutsuTransitionProps) {
    if (!isActive) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Background overlay that fades to deep crimson/black */}
            <motion.div
                className="absolute inset-0 bg-red-950"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Expanding Sharingan eye effect */}
            <motion.div
                className="relative z-10 w-32 h-32 md:w-64 md:h-64"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 1.2, 1, 20],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{
                    duration: 2.5,
                    times: [0, 0.4, 0.7, 1],
                    ease: "easeInOut"
                }}
                onAnimationComplete={() => {
                    setTimeout(onComplete, 200); // Slight delay before revealing content
                }}
            >
                <Sharingan className="w-full h-full" isSpinning />
            </motion.div>
        </motion.div>
    );
}

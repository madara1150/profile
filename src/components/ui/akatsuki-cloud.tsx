import React from "react";

export function AkatsukiCloud({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 512 512"
            className={className}
            fill="#dc2626" // Tailwind red-600
            stroke="#ffffff"
            strokeWidth="12"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Base Red Cloud Shape */}
            <path d="M380.4 195.3c-7.9-27.1-32.9-46.7-62.5-46.7-26.6 0-49.5 16.1-59.5 39.3-6.8-9.8-17.9-16.1-30.5-16.1-17.4 0-32 11.8-36.2 28-9.7-5.8-20.5-10.8-32.5-10.8-24.8 0-44.9 20.1-44.9 44.9 0 5.6 1.1 11 3 16-19 7-32.5 25.2-32.5 46.7 0 27.5 22.3 49.8 49.8 49.8h228.4c33.3 0 60.2-27 60.2-60.2 0-48.1-17.2-79.7-42.8-90.9z" />

            {/* Akatsuki Cloud Accents (White internal lines/swirls typically found on the logo) */}
            <path
                d="M170 290 Q150 270 170 250"
                fill="none"
                stroke="#ffffff"
                strokeWidth="8"
                strokeLinecap="round"
            />
            <path
                d="M240 230 Q280 200 320 230"
                fill="none"
                stroke="#ffffff"
                strokeWidth="8"
                strokeLinecap="round"
            />
            <path
                d="M290 310 Q320 280 350 310"
                fill="none"
                stroke="#ffffff"
                strokeWidth="8"
                strokeLinecap="round"
            />
        </svg>
    );
}

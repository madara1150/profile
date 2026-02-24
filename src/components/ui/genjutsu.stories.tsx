import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { GenjutsuTransition } from './genjutsu';

const meta = {
    title: 'UI/GenjutsuTransition',
    component: GenjutsuTransition,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof GenjutsuTransition>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to simulate activating the transition
const GenjutsuDemo = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-bold">Interactive Transition Demo</h1>
            <button
                onClick={() => setIsActive(true)}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
            >
                Cast Genjutsu
            </button>
            <p className="text-gray-500">Wait a few seconds for the animation to finish.</p>

            <GenjutsuTransition
                isActive={isActive}
                onComplete={() => setIsActive(false)}
            />
        </div>
    );
};

export const Interactive: Story = {
    render: () => <GenjutsuDemo />,
    args: {
        isActive: false,
        onComplete: () => { },
    }
};

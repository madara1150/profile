import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sharingan } from './sharingan';

const meta = {
    title: 'UI/Sharingan',
    component: Sharingan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isSpinning: { control: 'boolean' },
        className: { control: 'text' },
    },
} satisfies Meta<typeof Sharingan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: 'w-32 h-32',
        isSpinning: false,
    },
};

export const Spinning: Story = {
    args: {
        className: 'w-32 h-32',
        isSpinning: true,
    },
};

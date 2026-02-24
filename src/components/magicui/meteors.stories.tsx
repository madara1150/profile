import type { Meta, StoryObj } from '@storybook/react';
import { Meteors } from './meteors';

const meta = {
    title: 'MagicUI/Meteors',
    component: Meteors,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        number: { control: { type: 'range', min: 1, max: 100, step: 1 } },
    },
} satisfies Meta<typeof Meteors>;

export default meta;
type Story = StoryObj<typeof meta>;

// We need a dark background container to see the meteors properly
const MeteorsDemo = (props: React.ComponentProps<typeof Meteors>) => {
    return (
        <div className="relative w-full h-screen bg-slate-950 overflow-hidden flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white z-10">Look at the sky</h1>
            <Meteors {...props} />
        </div>
    );
};

export const Default: Story = {
    render: (args) => <MeteorsDemo {...args} />,
    args: {
        number: 20,
    },
};

export const HeavyShower: Story = {
    render: (args) => <MeteorsDemo {...args} />,
    args: {
        number: 60,
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from './project-card';
import { Layout } from 'lucide-react';

const meta = {
    title: 'Features/ProjectCard',
    component: ProjectCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        desc: { control: 'text' },
    },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for max-width to simulate grid container
const CardDemo = (args: any) => (
    <div className="w-[400px]">
        <ProjectCard {...args} />
    </div>
);

export const Default: Story = {
    render: (args) => <CardDemo {...args} />,
    args: {
        id: 'test-1',
        icon: <Layout />,
        title: 'S-Rank E-Commerce',
        desc: 'An ultra-premium shopping experience with advanced cart capabilities and real-time inventory tracking.',
        tags: ['Next.js', 'React', 'Tailwind'],
    },
};

export const WithImage: Story = {
    render: (args) => <CardDemo {...args} />,
    args: {
        id: 'test-2',
        icon: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
        title: 'Shinobi Database',
        desc: 'A classified intelligence system built for high-speed searches and secure data handling.',
        tags: ['Go', 'SQLite', 'GraphQL'],
    },
};

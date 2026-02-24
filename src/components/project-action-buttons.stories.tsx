import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProjectActionButtons } from './project-action-buttons';

const meta = {
    title: 'Features/ProjectActionButtons',
    component: ProjectActionButtons,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
    },
} satisfies Meta<typeof ProjectActionButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'demo-project-id',
    },
};

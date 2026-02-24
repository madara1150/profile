import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UserActionButtons } from './user-action-buttons';

const meta = {
    title: 'Features/UserActionButtons',
    component: UserActionButtons,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
    },
} satisfies Meta<typeof UserActionButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'demo-user-id',
    },
};

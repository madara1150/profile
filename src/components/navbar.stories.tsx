import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './navbar';

const meta = {
    title: 'Features/Navbar',
    component: Navbar,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: '/',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// A wrapper to set mocked localStorage state for the Navbar
const NavbarDemo = ({ loggedIn }: { loggedIn: boolean }) => {
    if (typeof window !== 'undefined') {
        if (loggedIn) {
            window.localStorage.setItem('user', JSON.stringify({
                id: '1',
                username: 'itachi_uchiha',
                firstName: 'Itachi',
                lastName: 'Uchiha',
                email: 'itachi@akatsuki.org',
                avatar: 'https://images.unsplash.com/photo-1549416878-b9ca95e26903?auto=format&fit=crop&q=80&w=150&h=150'
            }));
        } else {
            window.localStorage.removeItem('user');
        }
        window.dispatchEvent(new Event('storage'));
    }

    return (
        <div className="w-full h-screen bg-slate-900 pt-20">
            <Navbar />
            <div className="p-8 text-white text-center">
                <p>Scroll or resize to see the floating navbar in action.</p>
                <p className="text-gray-400 mt-2">Current state: {loggedIn ? 'Logged In User' : 'Guest'}</p>
            </div>
        </div>
    );
};

export const LoggedOut: Story = {
    render: () => <NavbarDemo loggedIn={false} />,
};

export const LoggedIn: Story = {
    render: () => <NavbarDemo loggedIn={true} />,
};

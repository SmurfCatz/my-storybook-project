// src/components/TabBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import TabBar from '../components/TabBar';
import { useTabState, Pages } from '../hooks/useTabState';
import { expect, userEvent, within } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom'; // เพิ่ม

const meta = {
  title: 'Components/TabBar',
  component: TabBar,
  decorators: [
    (Story, context) => {
      const { currentPage, changePage } = useTabState();

      // ตั้งค่า path ตาม currentPage
      const pathMap: Record<Pages, string> = {
        [Pages.HOME]: '/',
        [Pages.ABOUT]: '/about',
        [Pages.CONTACT]: '/contact',
      };
      const initialPath = pathMap[currentPage] || '/';

      return (
        <MemoryRouter initialEntries={[initialPath]}>
          <Story args={{ currentPage, onChangePage: changePage }} />
        </MemoryRouter>
      );
    },
  ],
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: { currentPage: Pages.HOME 
  , onChangePage: () => {}
  },
};

// Home Active
export const HomeActive: Story = {
  args: {
    currentPage: Pages.HOME,
    onChangePage: () => {}, // ต้องมี!
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeBtn = canvas.getByRole('link', { name: /Home/i });
    await userEvent.click(homeBtn);
    await expect(homeBtn).toHaveClass('text-blue-600');
  },
};

// About Active
export const AboutActive: Story = {
  args: { 
    currentPage: Pages.ABOUT,
    onChangePage: () => {},
   },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aboutBtn = canvas.getByRole('link', { name: /About/i });

    await userEvent.click(aboutBtn);
    await expect(aboutBtn).toHaveClass('text-blue-600');
  },
};

// Contact Active
export const ContactActive: Story = {
  args: { 
    currentPage: Pages.CONTACT,
    onChangePage: () => {},
   },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const contactBtn = canvas.getByRole('link', { name: /Contact/i });

    await userEvent.click(contactBtn);
    await expect(contactBtn).toHaveClass('text-blue-600');
  },
};
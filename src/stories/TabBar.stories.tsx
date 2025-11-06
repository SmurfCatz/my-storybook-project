import type { Meta, StoryObj } from '@storybook/react';
import TabBar from '../components/TabBar';
import { useTabState, Pages } from '../hooks/useTabState';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const { currentPage, changePage } = useTabState();
      return <Story args={{ currentPage, onChangePage: changePage }} />;
    },
  ],
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { currentPage: Pages.HOME, onChangePage: () => {} },
  
};
export const HomeActive: Story = {
  args: { currentPage: Pages.HOME, onChangePage: () => {} },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ทดสอบว่าปุ่ม Home ถูก render แล้ว
    const homeBtn = await canvas.getByRole('button', { name: /Home/i });

    // ทดสอบว่าปุ่ม Home ถูก click แล้ว
    await userEvent.click(homeBtn);

    // ทดสอบว่าปุ่ม Home มี class text-blue-600
    await expect(homeBtn).toHaveClass('text-blue-600');
  },
};
export const AboutActive: Story = {
  args: { currentPage: Pages.ABOUT, onChangePage: () => {} },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ทดสอบว่าปุ่ม About ถูก render แล้ว
    const aboutBtn = await canvas.getByRole('button', { name: /About/i });

    // ทดสอบว่าปุ่ม About ถูก click แล้ว
    await userEvent.click(aboutBtn);

    // ทดสอบว่าปุ่ม About มี class text-blue-600
    await expect(aboutBtn).toHaveClass('text-blue-600');
  },
};
export const ContactActive: Story = {
  args: { currentPage: Pages.CONTACT, onChangePage: () => {} },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ทดสอบว่าปุ่ม Contact ถูก render แล้ว
    const contactBtn = await canvas.getByRole('button', { name: /Contact/i });

    // ทดสอบว่าปุ่ม Contact ถูก click แล้ว
    await userEvent.click(contactBtn);

    // ทดสอบว่าปุ่ม Contact มี class text-blue-600
    await expect(contactBtn).toHaveClass('text-blue-600');
  },
};


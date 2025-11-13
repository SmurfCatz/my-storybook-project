import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../components/Footer';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Components/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // ทดสอบว่าหัวข้อ "© 2025 Storybook. All rights reserved." ถูก render แล้ว
    expect(canvas.getByText('© 2025 Storybook. All rights reserved.')).toBeInTheDocument();
  },
};

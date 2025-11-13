import type { Meta, StoryObj } from '@storybook/react';
import Home from '../components/Home';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Components/Home',
  component: Home,
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // ทดสอบว่าหัวข้อ "หน้าหลัก" ถูก render แล้ว
    expect(canvas.getByText('หน้าหลัก')).toBeInTheDocument();

    // ทดสอบว่าหัวข้อ "ยินดีต้อนรับเข้าสู่ Storybook" ถูก render แล้ว
    expect(canvas.getByText('ยินดีต้อนรับเข้าสู่ Storybook')).toBeInTheDocument();

    // ทดสอบว่า carousel ถูก render แล้ว
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  },
};

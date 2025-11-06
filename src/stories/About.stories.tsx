import type { Meta, StoryObj } from '@storybook/react';
import About from '../components/About';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Components/About',
  component: About,
  tags: ['autodocs'],
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // ทดสอบว่าหัวข้อ "เกี่ยวกับเรา" ถูก render แล้ว
    expect(canvas.getByTestId('about-heading')).toHaveTextContent('เกี่ยวกับเรา');

    // ทดสอบว่าข้อความ "เกี่ยวกับเรา" ถูก render แล้ว
    expect(canvas.getByTestId('about-text')).toHaveTextContent('เกี่ยวกับเรา');
  },
};
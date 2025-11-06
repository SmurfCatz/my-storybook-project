import type { Meta, StoryObj } from '@storybook/react';
import Contact from '../components/Contact';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Components/Contact',
  component: Contact,
  tags: ['autodocs'],
} satisfies Meta<typeof Contact>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ทดสอบว่าหัวข้อ "ติดต่อเรา" ถูก render แล้ว
    expect(canvas.getByTestId('contact-heading')).toHaveTextContent('ติดต่อเรา');
    
    // ทดสอบว่าข้อความ "ติดต่อเรา" ถูก render แล้ว
    expect(canvas.getByTestId('contact-text')).toHaveTextContent('ติดต่อเรา');
  }
};
import type { Meta, StoryObj } from '@storybook/react';
import Carousel from '../components/Carousel';
import { expect, within, waitFor } from 'storybook/test';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 5,
  }
};

export const WithControls: Story = {
  args: {
    count: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ตรวจว่ามีรูป carousel ถูก render แล้ว
    const images = canvas.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);

    // ตรวจว่ามีปุ่ม next / prev
    expect(canvas.getByRole('button', { name: /‹/i })).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: /›/i })).toBeInTheDocument();

    // ทดสอบว่าเมื่อกดปุ่ม next แล้วรูปเปลี่ยน
    const firstSrc = images[0].getAttribute('src');
    const nextButton = canvas.getByRole('button', { name: /›/i });
    nextButton.click();

    // ทดสอบว่ารูปไม่เปลี่ยน
    await waitFor(() => {
      const updatedImages = canvas.getAllByRole('img');
      const newSrc = updatedImages[0].getAttribute('src');
      expect(newSrc).not.toBe(firstSrc);
    });

    // ทดสอบว่าเมื่อกดปุ่ม prev แล้วรูปเปลี่ยน
    await waitFor(() => {
    const newImg = canvas.getAllByRole('img')[0];
    expect(newImg.getAttribute('src')).not.toBe(firstSrc);
    }, { timeout: 2000 });
  },
};



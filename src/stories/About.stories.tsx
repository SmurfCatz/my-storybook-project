import type { Meta, StoryObj } from '@storybook/react';
import About from '../components/About';
import { expect, within, waitFor } from 'storybook/test';

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

    // รอให้ข้อมูลโหลดเสร็จ (ในกรณีที่ useAbout มี async fetch)
    await waitFor(() => {
      expect(canvas.queryByText('กำลังโหลดข้อมูล...')).not.toBeInTheDocument();
    });

    // ตรวจว่ามี element ที่มี testid 'about-heading' อย่างน้อย 1 ตัว
    const headings = canvas.getAllByTestId('about-heading');
    expect(headings.length).toBeGreaterThan(0);

    // ตรวจว่ามี element ที่มี testid 'about-text' อย่างน้อย 1 ตัว
    const texts = canvas.getAllByTestId('about-text');
    expect(texts.length).toBeGreaterThan(0);

    // ตรวจว่ามีข้อความแสดงใน heading และ description จริง
    expect(headings[0].textContent?.length).toBeGreaterThan(0);
    expect(texts[0].textContent?.length).toBeGreaterThan(0);
  },
};
// src/components/Home.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Home from '../components/Home';
import { expect, within, waitFor } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Components/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. หัวข้อหลัก
    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: 'หน้าหลัก' })).toBeInTheDocument();
    });

    // 2. ข้อความต้อนรับ (ป้องกัน render ซ้อน)
    await waitFor(() => {
      const welcome = canvas.getAllByTestId('welcome-title');
      expect(welcome[0]).toBeInTheDocument();           // มีอย่างน้อย 1 ตัว
      expect(welcome[0]).toHaveTextContent('ยินดีต้อนรับเข้าสู่ Storybook');
    });

    // 3. Carousel มีรูปภาพ
    await waitFor(() => {
      const images = canvas.getAllByRole('img');
      expect(images.length).toBeGreaterThanOrEqual(1);
      expect(canvas.getByAltText(/Slide|carousel|hero/i)).toBeInTheDocument();
    });

    // 4. BlogList แสดง skeleton ก่อน (ถ้ามี loading)
    await waitFor(
      () => {
        expect(canvas.getAllByTestId('skeleton-card')).toHaveLength(3);
      },
      { timeout: 1000 }
    );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

    // 5. หลังโหลดเสร็จ → แสดง BlogCard จริง 3 ตัว
    await waitFor(() => {
      expect(canvas.getAllByTestId('blog-card')).toHaveLength(3);
    });

    // 6. เช็คข้อมูลตัวอย่างที่ควรมี
    expect(canvas.getByText('เรียนรู้ React Hooks อย่างลึกซึ้ง')).toBeInTheDocument();
    expect(canvas.getAllByTestId('blog-author')[0]).toHaveTextContent('สมชาย ใจดี');
    expect(canvas.getByText('#React')).toBeInTheDocument();
  },
};
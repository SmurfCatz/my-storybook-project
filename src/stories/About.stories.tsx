// src/components/About.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, waitFor } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import About from '../components/About';

const mockAbout = [
  {
    title: 'วิสัยทัศน์',
    description: 'เป็นผู้นำด้านเทคโนโลยีที่สร้างคุณค่าให้สังคม',
  },
  {
    title: 'พันธกิจ',
    description: 'พัฒนาโซลูชันที่ตอบโจทย์ผู้ใช้ด้วยความใส่ใจ',
  },
  {
    title: 'ค่านิยม',
    description: 'ซื่อสัตย์ รับผิดชอบ และมุ่งมั่นสู่ความเป็นเลิศ',
  },
];

const meta = {
  title: 'Components/About',
  component: About,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4001/graphql', async () => {
          await delay(800);
          return HttpResponse.json({
            data: { about: mockAbout },
          });
        }),
      ],
    },
  },
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(
      () => expect(canvas.queryByText(/กำลังโหลด/i)).not.toBeInTheDocument(),
      { timeout: 3000 }
    );

    const headings = canvas.getAllByTestId('about-heading');
    const texts = canvas.getAllByTestId('about-text');

    expect(headings).toHaveLength(3);
    expect(texts).toHaveLength(3);

    expect(headings[0]).toHaveTextContent('วิสัยทัศน์');
    expect(texts[1]).toHaveTextContent(/พันธกิจ/);
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4001/graphql', async () => {
          await delay(3000);
          return HttpResponse.json({
            data: { about: mockAbout },
          });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(/กำลังโหลด/i)).toBeInTheDocument();

    await waitFor(
      () => expect(canvas.queryByText(/กำลังโหลด/i)).not.toBeInTheDocument(),
      { timeout: 5000 }
    );

    expect(canvas.getAllByTestId('about-heading')).toHaveLength(3);
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4001/graphql', async () => {
          await delay(800);
          return HttpResponse.json({
            data: { about: [] },
          });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText(/ไม่พบข้อมูล/i)).toBeInTheDocument();
    });
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4001/graphql', async () => {
          await delay(800);
          return HttpResponse.json(
            { errors: [{ message: 'Server error' }] },
            { status: 500 }
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.getByText(/เกิดข้อผิดพลาด/i)).toBeInTheDocument();
    });
  },
};
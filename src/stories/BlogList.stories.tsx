// src/components/BlogList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor, expect } from 'storybook/test';
import BlogList from '../components/BlogList';
import { MemoryRouter } from 'react-router-dom';
import { loadingThenSuccessHandler } from '../mocks/handlers';

const meta = {
  title: 'Components/BlogList',
  component: BlogList,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div className="p-6 max-w-7xl mx-auto">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof BlogList>;

export default meta;
type Story = StoryObj<typeof meta>;

// src/components/BlogList.stories.tsx
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(
      () => {
        expect(canvas.getByText('บทความล่าสุด')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // 1. ตรวจสอบจำนวนการ์ด
    const cards = canvas.getAllByTestId('blog-card');
    expect(cards).toHaveLength(3);

    // 2. ตรวจสอบผู้เขียนด้วย data-testid (ดีที่สุด)
    const authorElements = canvas.getAllByTestId('blog-author');
    expect(authorElements).toHaveLength(3);
    expect(authorElements[0]).toHaveTextContent('สมชาย ใจดี');
    expect(authorElements[1]).toHaveTextContent('กิตติชัย สุนทร');
    expect(authorElements[2]).toHaveTextContent('สมชาย ใจดี');

    // 3. ตรวจสอบ tag
    expect(canvas.getByText('#React')).toBeInTheDocument();
    expect(canvas.getByText('#GraphQL')).toBeInTheDocument();
    expect(canvas.getByText('#TypeScript')).toBeInTheDocument();
  },
};

export const Loading: Story = {
  parameters: {
    msw: { handlers: [loadingThenSuccessHandler] },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ตรวจสอบว่ามี skeleton 3 ตัว
    await waitFor(() => {
      expect(canvas.getAllByTestId('skeleton-card')).toHaveLength(3);
    });

    // เพิ่ม delay เพื่อเห็น UI นานขึ้น (ไม่จำเป็น แต่ช่วย)
    await new Promise((resolve) => setTimeout(resolve, 2000));
  },
};

export const EmptySearch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => expect(canvas.getByText('บทความล่าสุด')).toBeInTheDocument());

    const input = canvas.getByPlaceholderText('ค้นหาบทความ...');
    await userEvent.type(input, 'ไม่มีแน่นอน', { delay: 100 });

    await waitFor(() => {
      expect(canvas.getByText(/ไม่พบบทความที่ตรงกับ/)).toBeInTheDocument();
    });
  },
};
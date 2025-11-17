// src/stories/BlogCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import BlogCard from '../components/BlogCard';
import { MemoryRouter } from 'react-router-dom';
import { baseBlog } from '../mocks/mockData';

const meta = {
  title: 'Components/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="max-w-sm mx-auto p-4">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    onDeleted: { action: 'deleted' },
  },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: baseBlog,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('blog-title')).toHaveTextContent(baseBlog.title);
  },
};

export const OwnerView: Story = {
  args: baseBlog,
  globals: { currentUserId: '1' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /ลบ/i })).toBeInTheDocument();
  },
};

export const NonOwnerView: Story = {
  args: { ...baseBlog, author: { id: '2', name: 'กิตติชัย สุนทร' } },
  globals: { currentUserId: '2' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', { name: /ลบ/i })).not.toBeInTheDocument();
  },
};

export const LongTitle: Story = {
  args: {
    ...baseBlog,
    title: 'นี่คือชื่อบทความที่ยาวมากๆ เพื่อทดสอบการตัดข้อความเมื่อเกินบรรทัดที่กำหนดใน UI Component ของเราให้ดีที่สุด',
  },
};

export const NoCoverImage: Story = {
  args: { ...baseBlog, coverImage: '' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // ไม่มี img
    await expect(canvas.queryByTestId('cover-image')).not.toBeInTheDocument();
    
    // ไม่มี skeleton
    await expect(canvas.queryByTestId('skeleton-image')).not.toBeInTheDocument();
    
    // มี placeholder
    await expect(canvas.getByTestId('no-cover-placeholder')).toBeInTheDocument();
    await expect(canvas.getByText('ไม่มีรูปภาพ')).toBeInTheDocument();
  },
};
export const ManyTags: Story = {
  args: {
    ...baseBlog,
    tags: ['GraphQL', 'React', 'TypeScript', 'Storybook', 'UI', 'Frontend', 'Backend', 'DevOps'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByTestId('blog-tag')).toHaveLength(8);
  },
};
// src/components/CreateBlogModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import CreateBlogModal from '../components/CreateBlogModal';
import { within, userEvent, waitFor, expect } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import { GRAPHQL_ENDPOINT } from '../lib/api';

const meta = {
  title: 'Components/CreateBlogModal',
  component: CreateBlogModal,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        // Mock การสร้างบล็อกสำเร็จ
        http.post(GRAPHQL_ENDPOINT, async () => {
          await delay(1000); // จำลอง loading
          return HttpResponse.json({
            data: {
              createBlog: {
                id: "999",
                title: "ทดสอบจาก Storybook",
                coverImage: "https://picsum.photos/600/300?random=999",
                createdAt: new Date().toISOString(),
              },
            },
          });
        }),
      ],
    },
  },
  argTypes: {
    onCreated: { action: 'created!' },
  },
} satisfies Meta<typeof CreateBlogModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // เปิด Modal
    await user.click(canvas.getByRole('button', { name: 'โพสต์' }));

    // รอ modal ขึ้น (ใช้ heading แทน role="dialog")
    await waitFor(() => {
        expect(canvas.getByRole('heading', { name: 'โพสต์บทความใหม่' })).toBeInTheDocument();
    });

    // กรอกฟอร์ม
    await user.type(canvas.getByPlaceholderText('ชื่อบทความ'), 'ทดสอบ Modal');
    await user.type(canvas.getByPlaceholderText('เนื้อหา...'), 'เนื้อหาจาก Storybook');

    // กดบันทึก
    const saveBtn = canvas.getByTestId('submit-button');
    await waitFor(() => expect(saveBtn).toBeEnabled());
    await user.click(saveBtn);

    // รอ modal ปิด
    await waitFor(() => {
        expect(canvas.queryByRole('heading', { name: 'โพสต์บทความใหม่' })).not.toBeInTheDocument();
    });
    },
};

export const SubmitError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4000', async () => {
          await delay(1000);
          return HttpResponse.json({
            errors: [{ message: 'ชื่อบทความซ้ำ!' }],
          });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await user.click(canvas.getByRole('button', { name: 'โพสต์' }));

    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());

    await user.type(canvas.getByPlaceholderText('ชื่อบทความ'), 'ซ้ำ');
    await user.type(canvas.getByPlaceholderText('เนื้อหา...'), 'อะไรก็ได้');

    await user.click(canvas.getByRole('button', { name: 'บันทึก' }));

    await waitFor(() => {
      const errorEl = canvas.getByTestId('error-message');
      expect(errorEl).toBeInTheDocument();
      expect(errorEl).toHaveTextContent('ชื่อบทความซ้ำ!');
    });

    // modal ต้องยังเปิดอยู่
    expect(canvas.getByRole('dialog')).toBeInTheDocument();
  },
};

export const LoadingState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4000', async () => {
          await delay('infinite'); // หรือ 10000 ก็ได้ ไม่ต้องรอจริง
          return HttpResponse.json({ data: { createBlog: {} } });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // เปิด modal
    await user.click(canvas.getByRole('button', { name: 'โพสต์' }));

    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());

    // กรอกฟอร์มให้ครบ
    await user.type(canvas.getByPlaceholderText('ชื่อบทความ'), 'รอหน่อย');
    await user.type(canvas.getByPlaceholderText('เนื้อหา...'), 'กำลังโหลด');

    // ใช้ data-testid หรือ regex แทนการพึ่ง text ที่เปลี่ยน
    await user.click(canvas.getByTestId('submit-button')); // ดีที่สุด

    // ตรวจสอบสถานะ loading
    await waitFor(() => {
      const loadingBtn = canvas.getByRole('button', { name: 'กำลังบันทึก...' });
      expect(loadingBtn).toBeInTheDocument();
      expect(loadingBtn).toBeDisabled();
    });

    // ยืนยันว่า modal ยังเปิดอยู่
    expect(canvas.getByRole('dialog')).toBeInTheDocument();
  },
};

export const ClosedByDefault: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
    expect(canvas.getByText('โพสต์')).toBeInTheDocument();
  },
};
// src/components/Contact.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, waitFor, userEvent } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import Contact from '../components/Contact';

// Mock ข้อมูล
const mockContacts = [
  {
    id: '1',
    name: 'ธานอส สมบัติพูน',
    phone: '081-234-5678',
    position: 'ผู้ดูแลระบบ',
    avatar: 'https://picsum.photos/100?random=1',
  },
  {
    id: '2',
    name: 'กิตติชัย สุนทร',
    phone: '082-987-6543',
    position: 'นักพัฒนา',
    avatar: 'https://picsum.photos/100?random=2',
  },
  {
    id: '3',
    name: 'วรัญญา ภักดีผล',
    phone: '083-456-7890',
    position: 'นักออกแบบ UI/UX',
    avatar: 'https://picsum.photos/100?random=3',
  },
];

const meta = {
  title: 'Components/Contact',
  component: Contact,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4001/graphql', () => {
          return HttpResponse.json({
            data: { contacts: mockContacts },
          });
        }),
      ],
    },
  },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => expect(canvas.queryByText(/กำลังโหลด/)).not.toBeInTheDocument(), {
      timeout: 3000,
    });

    const heading = canvas.getByRole('heading', { name: /ติดต่อเรา/i });
    expect(heading).toBeInTheDocument();

    await waitFor(() => {
      expect(canvas.getByText(/จำนวนผู้ติดต่อทั้งหมด: 3 คน/)).toBeInTheDocument();
    });

    expect(canvas.getByText('ธานอส สมบัติพูน')).toBeInTheDocument();
    expect(canvas.getByText('กิตติชัย สุนทร')).toBeInTheDocument();
    expect(canvas.getByText('วรัญญา ภักดีผล')).toBeInTheDocument();

    expect(canvas.getByText('ผู้ดูแลระบบ')).toBeInTheDocument();
    expect(canvas.getByText('นักพัฒนา')).toBeInTheDocument();
    expect(canvas.getByText('นักออกแบบ UI/UX')).toBeInTheDocument();

    expect(canvas.getByText('081-234-5678')).toBeInTheDocument();
    expect(canvas.getByText('082-987-6543')).toBeInTheDocument();
    expect(canvas.getByText('083-456-7890')).toBeInTheDocument();

    const images = canvas.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('alt', 'ธานอส สมบัติพูน');
  },
};

// Loading Story
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4001/graphql', async () => {
          console.log('[MSW] Starting 5s delay...');
          await delay(5000);
          console.log('[MSW] Sending response');
          return HttpResponse.json({
            data: { contacts: mockContacts },
          });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    console.log('[Story] Waiting for loading...');

    const loadingText = await canvas.findByText(/กำลังโหลดข้อมูล/i);
    expect(loadingText).toBeInTheDocument();

    await waitFor(
      () => expect(canvas.queryByText(/กำลังโหลดข้อมูล/i)).not.toBeInTheDocument(),
      { timeout: 7000 }
    );

    expect(canvas.getByText(/3 คน/)).toBeInTheDocument();
  },
};

// Empty Story
export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4001/graphql', async () => {
          await delay(800);
          return HttpResponse.json({
            data: { contacts: [] },
          });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      expect(canvas.queryByText(/กำลังโหลด/i)).not.toBeInTheDocument();
    });

    expect(canvas.getByText(/จำนวนผู้ติดต่อทั้งหมด: 0 คน/)).toBeInTheDocument();
    expect(canvas.getByText(/ยังไม่มีรายชื่อผู้ติดต่อ/)).toBeInTheDocument();

    // ไม่มีรูป
    const images = canvas.queryAllByRole('img');
    expect(images).toHaveLength(0);
  },
};

// Error Story
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('http://localhost:4001/graphql', async () => {
          await delay(800);
          return HttpResponse.json(
            { errors: [{ message: 'Failed to fetch contacts' }] },
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

    expect(canvas.getByText(/Failed to fetch contacts/i)).toBeInTheDocument();

    // มีปุ่ม "ลองใหม่"
    const retryButton = canvas.getByRole('button', { name: /ลองใหม่/i });
    expect(retryButton).toBeInTheDocument();

    // กดปุ่ม → ควรโหลดใหม่ (แต่ mock ยัง error)
    const user = userEvent.setup();
    await user.click(retryButton);

    // ยังเห็น error
    await waitFor(() => {
      expect(canvas.getByText(/Failed to fetch contacts/i)).toBeInTheDocument();
    });
  },
};
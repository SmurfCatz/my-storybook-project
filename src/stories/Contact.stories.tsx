// src/components/Contact.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, waitFor, userEvent } from 'storybook/test';
import { http, HttpResponse, delay } from 'msw';
import Contact from '../components/Contact';

// Mock ข้อมูลจาก server จริง
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
    // ตั้งค่า MSW สำหรับ mock API
    msw: {
      handlers: [
        http.post('http://localhost:4001/graphql', () => {
          return HttpResponse.json({
            data: {
              contacts: mockContacts,
            },
          });
        }),
      ],
    },
  },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story: Default (แสดงข้อมูลจริง)
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. รอให้ loading หายไป
    await waitFor(() => expect(canvas.queryByText(/กำลังโหลด/)).not.toBeInTheDocument(), {
      timeout: 3000,
    });

    // 2. ตรวจสอบหัวข้อ
    const heading = canvas.getByRole('heading', { name: /ติดต่อเรา/i });
    expect(heading).toBeInTheDocument();

    // 3. ตรวจสอบจำนวนผู้ติดต่อ
    await waitFor(() => {
      expect(canvas.getByText(/จำนวนผู้ติดต่อทั้งหมด: 3 คน/)).toBeInTheDocument();
    });

    // 4. ตรวจสอบรายชื่อแต่ละคน
    expect(canvas.getByText('ธานอส สมบัติพูน')).toBeInTheDocument();
    expect(canvas.getByText('กิตติชัย สุนทร')).toBeInTheDocument();
    expect(canvas.getByText('วรัญญา ภักดีผล')).toBeInTheDocument();

    // 5. ตรวจสอบตำแหน่งงาน
    expect(canvas.getByText('ผู้ดูแลระบบ')).toBeInTheDocument();
    expect(canvas.getByText('นักพัฒนา')).toBeInTheDocument();
    expect(canvas.getByText('นักออกแบบ UI/UX')).toBeInTheDocument();

    // 6. ตรวจสอบเบอร์โทร
    expect(canvas.getByText('081-234-5678')).toBeInTheDocument();
    expect(canvas.getByText('082-987-6543')).toBeInTheDocument();
    expect(canvas.getByText('083-456-7890')).toBeInTheDocument();

    // 7. ตรวจสอบรูป (img tag)
    const images = canvas.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('alt', 'ธานอส สมบัติพูน');
  },
};

// src/components/Contact.stories.tsx
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

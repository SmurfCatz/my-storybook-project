// src/App.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import App from './App';
import { Pages } from './hooks/useTabState';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

function StatefulAppWrapper(args: any) {
  const [page, setPage] = useState(args.currentPage ?? Pages.HOME);

  return (
    <App
      {...args}
      currentPage={page}
      changePage={(newPage: Pages) => {
        setPage(newPage);
        args.changePage?.(newPage); 
      }}
    />
  );
}


const meta = {
  title: 'Layout/App',
  component: StatefulAppWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;


// หน้าแรก (Home)
export const HomePage: Story = {
  args: {
    currentPage: Pages.HOME,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // ตรวจสอบว่า heading แสดงคำว่า "Home"
    const heading = await canvas.findByText(/Home/i);
    await expect(heading).toBeInTheDocument();
  },
};

// หน้า About
export const AboutPage: Story = {
  args: {
    currentPage: Pages.ABOUT,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // ตรวจสอบ heading
    const heading = await canvas.findByText(/About/i);
    await expect(heading).toBeInTheDocument();
  },
};

// หน้า Contact
export const ContactPage: Story = {
  args: {
    currentPage: Pages.CONTACT,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = await canvas.findByText(/ติดต่อเรา/i);
    await expect(heading).toBeInTheDocument();
  },
};

// 🔹 Interaction test: เปลี่ยนจาก Home → Contact
export const HomeToContact: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ตรวจสอบว่าเริ่มจากหน้า Home
    const homeHeading = await canvas.findByText(/Home/i);
    await expect(homeHeading).toBeInTheDocument();

    // คลิกแท็บ Contact
    const contactTab = await canvas.findByRole('button', { name: /Contact/i });
    await userEvent.click(contactTab);

    // ตรวจสอบว่าเปลี่ยนไปหน้า Contact สำเร็จ
    const contactHeading = await canvas.findByText((text) =>
      text.includes('ติดต่อเรา')
    );
    await expect(contactHeading).toBeInTheDocument();
  },
};

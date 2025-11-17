import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from 'storybook/test';
import SearchBar from '../components/SearchBar';
import { fn } from 'storybook/test';
import { mockAuthors,mockTags } from '../mocks/mockData';


const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onSearch: { action: 'searched' },
    onFilterTag: { action: 'tag filtered' },
    onFilterAuthor: { action: 'author filtered' },
  },
  args: {
    allTags: mockTags,
    allAuthors: mockAuthors,
    onSearch: fn(),
    onFilterTag: fn(),
    onFilterAuthor: fn(),
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default ---
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ตรวจสอบว่ามี input และ dropdown button
    await canvas.findByPlaceholderText('ค้นหาบทความ...');
    await canvas.findByText('Tag');
    await canvas.findByText('ผู้เขียน');
  },
};

// --- Search Interaction ---
export const SearchInput: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText('ค้นหาบทความ...');

    await userEvent.type(searchInput, 'React', { delay: 100 });

    // ตรวจสอบว่า onSearch ถูกเรียก
    expect(args.onSearch).toHaveBeenCalledWith('React');
  },
};

// --- Filter by Tag ---
export const FilterByTag: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const tagButton = canvas.getByRole('button', { name: /Tag/i });
    await userEvent.click(tagButton);

    const tagOption = await canvas.findByRole('button', { name: '#TypeScript' });
    await userEvent.click(tagOption);

    expect(args.onFilterTag).toHaveBeenCalledWith('TypeScript');
  },
};

// --- Filter by Author ---
export const FilterByAuthor: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const authorButton = canvas.getByRole('button', { name: /ผู้เขียน/i });
    await userEvent.click(authorButton);

    const authorOption = await canvas.findByRole('button', { name: 'กิตติชัย สุนทร' });
    await userEvent.click(authorOption);

    expect(args.onFilterAuthor).toHaveBeenCalledWith('2');
  },
};

// --- Clear Filters ---
export const ClearTagFilter: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // เปิด dropdown และเลือก tag ก่อน
    const tagButton = canvas.getByRole('button', { name: /Tag/i });
    await userEvent.click(tagButton);
    await userEvent.click(await canvas.findByRole('button', { name: '#GraphQL' }));
    expect(args.onFilterTag).toHaveBeenCalledWith('GraphQL');

    // กด "ทั้งหมด" เพื่อล้าง
    await userEvent.click(tagButton);
    await userEvent.click(await canvas.findByRole('button', { name: 'ทั้งหมด' }));

    expect(args.onFilterTag).toHaveBeenCalledWith(null);
  },
};


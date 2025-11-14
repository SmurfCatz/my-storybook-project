// src/mocks/mockData.ts
import { Blog } from '../hooks/useSearchBlogs';

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'เรียนรู้ React Hooks อย่างลึกซึ้ง',
    content: 'React Hooks เปลี่ยนวิธีการเขียน component ไปอย่างสิ้นเชิง...',
    coverImage: 'https://picsum.photos/seed/react/400/300',
    createdAt: '2025-11-10T10:00:00Z',
    author: { id: '1', name: 'สมชาย ใจดี' },
    tags: ['React', 'Frontend'],
  },
  {
    id: '2',
    title: 'GraphQL vs REST',
    content: 'ในยุคที่ API เป็นหัวใจ...',
    coverImage: 'https://picsum.photos/seed/graphql/400/300',
    createdAt: '2025-11-08T14:30:00Z',
    author: { id: '2', name: 'กิตติชัย สุนทร' },
    tags: ['GraphQL', 'Backend'],
  },
  {
    id: '3',
    title: 'TypeScript สำหรับมือใหม่',
    content: 'TypeScript ไม่ใช่แค่ typing...',
    coverImage: '',
    createdAt: '2025-11-05T09:15:00Z',
    author: { id: '1', name: 'สมชาย ใจดี' },
    tags: ['TypeScript', 'Frontend'],
  },
];
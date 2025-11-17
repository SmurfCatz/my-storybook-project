// src/mocks/mockData.ts
import { Blog } from '../hooks/useSearchBlogs';
import type { BlogCardProps } from '../components/BlogCard';

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

export const baseBlog: BlogCardProps = {
  id: '1',
  title: 'เริ่มต้นกับ GraphQL ใน React',
  excerpt: 'GraphQL คือภาษาสำหรับ query API ที่ช่วยให้ client ขอข้อมูลเฉพาะที่ต้องการได้...',
  coverImage: 'https://picsum.photos/600/300?random=10',
  author: { id: '1', name: 'ธานอส สมบัติพูน' },
  tags: ['GraphQL', 'React'],
  createdAt: '2025-04-05T10:00:00Z',
};

export const mockTags = ['React', 'TypeScript', 'GraphQL', 'Frontend', 'Backend'];

export const mockAuthors = [
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


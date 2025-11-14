// src/mocks/baseBlog.ts
import type { BlogCardProps } from '../components/BlogCard';

export const baseBlog: BlogCardProps = {
  id: '1',
  title: 'เริ่มต้นกับ GraphQL ใน React',
  excerpt: 'GraphQL คือภาษาสำหรับ query API ที่ช่วยให้ client ขอข้อมูลเฉพาะที่ต้องการได้...',
  coverImage: 'https://picsum.photos/600/300?random=10',
  author: { id: '1', name: 'ธานอส สมบัติพูน' },
  tags: ['GraphQL', 'React'],
  createdAt: '2025-04-05T10:00:00Z',
};
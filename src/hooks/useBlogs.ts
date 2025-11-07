// src/hooks/useBlogs.ts
import { useState, useEffect } from "react";

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags?: string[];
  createdAt: string;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockBlogs: Blog[] = [
      {
        id: "1",
        title: "เริ่มต้นกับ GraphQL",
        excerpt:
          "GraphQL คือภาษาสำหรับ query API ที่ช่วยให้ client ขอข้อมูลเฉพาะที่ต้องการได้...",
        coverImage: "https://picsum.photos/400/250?random=1",
        author: "ธานอส",
        tags: ["GraphQL", "API", "Backend"],
        createdAt: "2025-11-07T10:00:00Z",
      },
      {
        id: "2",
        title: "Storybook คืออะไร?",
        excerpt:
          "Storybook เป็นเครื่องมือที่ช่วยให้เราพัฒนา UI Components ได้อย่างอิสระ...",
        coverImage: "https://picsum.photos/400/250?random=2",
        author: "กิตติชัย",
        tags: ["React", "UI", "Testing"],
        createdAt: "2025-11-06T15:00:00Z",
      },
      {
        id: "3",
        title: "พื้นฐาน Tailwind CSS",
        excerpt:
          "Tailwind CSS คือ utility-first framework ที่ช่วยให้การจัดการ style ใน React ง่ายขึ้น...",
        coverImage: "https://picsum.photos/400/250?random=3",
        author: "วรัญญา",
        tags: ["Tailwind", "CSS", "Frontend"],
        createdAt: "2025-11-05T09:30:00Z",
      },
    ];

    // จำลอง delay เพื่อให้มีสถานะ loading
    const timer = setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { blogs, loading };
}

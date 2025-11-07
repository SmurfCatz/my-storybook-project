// src/hooks/useCreateBlog.ts
import { useState } from "react";

export function useCreateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ ฟังก์ชันสร้างบทความ
  const createBlog = async (data: {
    title: string;
    content: string;
    coverImage?: string;
    authorId: string;
    tags: string[];
  }): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const randomCover =
        data.coverImage && data.coverImage.trim() !== ""
          ? data.coverImage
          : `https://picsum.photos/600/300?random=${Math.floor(
              Math.random() * 1000
            )}`;

      // 👇 เรียก GraphQL Mutation ผ่าน Fetch API
      const res = await fetch("http://localhost:4000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateBlog(
              $title: String!
              $content: String!
              $coverImage: String
              $authorId: ID!
              $tags: [String!]
            ) {
              createBlog(
                title: $title
                content: $content
                coverImage: $coverImage
                authorId: $authorId
                tags: $tags
              ) {
                id
                title
                coverImage
                createdAt
              }
            }
          `,
          variables: {
            title: data.title,
            content: data.content,
            coverImage: randomCover,
            authorId: data.authorId,
            tags: data.tags,
          },
        }),
      });

      const json = await res.json();

      // ถ้ามี error จาก GraphQL
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      return true;
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการสร้างบทความ");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createBlog, loading, error };
}

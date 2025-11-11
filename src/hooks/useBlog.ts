// src/hooks/useBlog.ts
import { useState, useEffect } from "react";

export interface Blog {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  author: { id: string; name: string; avatar?: string };
  tags?: string[];
  createdAt: string;
}

export function useBlog(id: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch("http://localhost:4000", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query Blog($id: ID!) {
                blog(id: $id) {
                  id
                  title
                  content
                  coverImage
                  createdAt
                  author {
                    id
                    name
                    avatar
                  }
                  tags
                }
              }
            `,
            variables: { id },
          }),
        });

        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0].message);
        if (!json.data.blog) throw new Error("ไม่พบบทความ");

        setBlog(json.data.blog);
      } catch (err: any) {
        setError(err.message || "โหลดข้อมูลไม่ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { blog, loading, error };
}
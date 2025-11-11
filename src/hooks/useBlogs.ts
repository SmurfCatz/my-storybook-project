// src/hooks/useBlogs.ts
import { useState, useEffect } from "react";
import { GRAPHQL_ENDPOINT } from "../lib/api";

export function useBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                blogs {
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
          }),
        });

        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0].message);
        setBlogs(json.data.blogs || []);
      } catch (err: any) {
        setError(err.message || "ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}
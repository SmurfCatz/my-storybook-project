import { useState, useEffect, useCallback } from "react";
import { GRAPHQL_ENDPOINT } from "../lib/api";

export interface Blog {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  createdAt: string;
  author: { id: string; name: string };
  tags: string[];
}

export function useSearchBlogs() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ดึงข้อมูลทั้งหมดครั้งเดียว
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                blogs {
                  id title content coverImage createdAt author { id name } tags
                }
              }
            `,
          }),
        });

        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0].message);
        setAllBlogs(json.data.blogs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  // กรองข้อมูลตาม query, tag, author
  const filteredBlogs = useCallback(() => {
    let results = allBlogs;

    // กรองตาม keyword
    if (query) {
      results = results.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase())
      );
    }

    // กรองตาม tag
    if (selectedTag) {
      results = results.filter((blog) => blog.tags.includes(selectedTag));
    }

    // กรองตาม author
    if (selectedAuthor) {
      results = results.filter((blog) => blog.author.id === selectedAuthor);
    }

    return results;
  }, [allBlogs, query, selectedTag, selectedAuthor]);

  return {
    blogs: filteredBlogs(),
    loading,
    error,
    query,
    setQuery,
    selectedTag,
    setSelectedTag,
    selectedAuthor,
    setSelectedAuthor,
    allBlogs,
  };
}
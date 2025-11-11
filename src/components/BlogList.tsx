// src/components/BlogList.tsx
import BlogCard from "./BlogCard";
import CreateBlogModal from "./CreateBlogModal";
import SkeletonCard from "./SkeletonCard";
import SearchBar from "./SearchBar";
import { useSearchBlogs } from "../hooks/useSearchBlogs";
import { useBlogs } from "../hooks/useBlogs";
import { useMemo } from "react";

export default function BlogList() {
  const { blogs: allBlogs, loading: allBlogsLoading } = useBlogs();

  const {
    blogs,
    loading: searchLoading,
    error,
    query,
    setQuery,
    selectedTag,
    setSelectedTag,
    selectedAuthor,
    setSelectedAuthor,
  } = useSearchBlogs();

  // คำนวณ tags และ authors อย่างปลอดภัย
  const { allTags, allAuthors } = useMemo(() => {
    if (!allBlogs || allBlogs.length === 0) {
      return { allTags: [], allAuthors: [] };
    }

    const tags = Array.from(new Set(allBlogs.flatMap((b) => b.tags || [])));
    const authorMap = new Map<string, { id: string; name: string }>();

    allBlogs.forEach((b) => {
      if (b.author && !authorMap.has(b.author.id)) {
        authorMap.set(b.author.id, { id: b.author.id, name: b.author.name });
      }
    });

    return { allTags: tags, allAuthors: Array.from(authorMap.values()) };
  }, [allBlogs]);

  const handleRefresh = () => {
    // ถ้า useSearchBlogs ไม่รองรับ refetch → ใช้ reload
    window.location.reload();
  };

  if (allBlogsLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-300 rounded w-64 animate-pulse"></div>
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">บทความล่าสุด</h2>
        <CreateBlogModal onCreated={handleRefresh} />
      </div>

      <SearchBar
        onSearch={setQuery}
        onFilterTag={setSelectedTag}
        onFilterAuthor={setSelectedAuthor}
        allTags={allTags}
        allAuthors={allAuthors}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {searchLoading ? (
          [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
        ) : blogs.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-12 text-lg">
            ไม่พบบทความที่ตรงกับ
            <span className="font-medium text-gray-700">
              {query
                ? ` "${query}"`
                : selectedTag
                ? ` #${selectedTag}`
                : selectedAuthor
                ? ` "${allAuthors.find((a) => a.id === selectedAuthor)?.name}"`
                : ""}
            </span>
          </p>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              excerpt={blog.content}
              coverImage={blog.coverImage}
              author={blog.author}
              tags={blog.tags}
              createdAt={blog.createdAt}
              onDeleted={handleRefresh}
            />
          ))
        )}
      </div>
    </div>
  );
}
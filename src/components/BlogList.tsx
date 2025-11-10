// src/components/BlogList.tsx
import BlogCard from "./BlogCard";
import CreateBlogModal from "./CreateBlogModal";
import SkeletonCard from "./SkeletonCard";
import SearchBar from "./SearchBar";
import { useSearchBlogs } from "../hooks/useSearchBlogs";
import { useBlogs } from "../hooks/useBlogs"; // ไว้ดึง tags + authors

export default function BlogList() {
  // ดึงข้อมูลทั้งหมดเพื่อใช้ใน filter
  const { blogs: allBlogs } = useBlogs();

  // ใช้ hook search
  const {
    blogs,
    loading,
    error,
    query,
    setQuery,
    selectedTag,
    setSelectedTag,
    selectedAuthor,
    setSelectedAuthor,
  } = useSearchBlogs();

  // ดึง tags และ authors ทั้งหมด
  const allTags = Array.from(new Set(allBlogs.flatMap(b => b.tags || [])));
  const allAuthors = Array.from(
    new Set(allBlogs.map(b => b.author).filter(Boolean)),
    (a) => ({ id: a.id, name: a.name })
  );

  // แสดง error
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>
      {/* Header + ปุ่มสร้าง */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">บทความล่าสุด</h2>
        <CreateBlogModal onCreated={() => window.location.reload()} />
      </div>

      {/* Search + Filter */}
      <SearchBar
        onSearch={setQuery}
        onFilterTag={setSelectedTag}
        onFilterAuthor={setSelectedAuthor}
        allTags={allTags}
        allAuthors={allAuthors}
      />

      {/* ผลลัพธ์ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? (
          // Skeleton
          [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
        ) : blogs.length === 0 ? (
          // ไม่พบ
          <p className="col-span-full text-center text-gray-500 py-12 text-lg">
            ไม่พบบทความที่ตรงกับ
            <span className="font-medium text-gray-700">
              {query ? ` "${query}"` : selectedTag ? ` #${selectedTag}` : ` "${selectedAuthor ? allAuthors.find(a => a.id === selectedAuthor)?.name : ''}"`}
            </span>
          </p>
        ) : (
          // แสดงผล
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
              onDeleted={() => window.location.reload()}
            />
          ))
        )}
      </div>
    </div>
  );
}
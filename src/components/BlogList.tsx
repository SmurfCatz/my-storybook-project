// src/components/BlogList.tsx
import BlogCard from "./BlogCard";
import CreateBlogModal from "./CreateBlogModal";
import { useBlogs } from "../hooks/useBlogs";

export default function BlogList() {
  const { blogs, loading, error } = useBlogs();

  if (loading) return <p className="p-6">กำลังโหลดบทความ...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">บทความล่าสุด</h2>
        {/* ปุ่มเปิด Modal สร้าง Blog */}
        <CreateBlogModal onCreated={() => window.location.reload()} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            excerpt={blog.content}
            coverImage={blog.coverImage}
            author={blog.author}
            tags={blog.tags}
            createdAt={blog.createdAt}
            onDeleted={() => {
              window.location.reload();
            }}
          />
        ))}
      </div>
    </div>
  );
}

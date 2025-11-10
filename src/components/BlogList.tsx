// src/components/BlogList.tsx
import BlogCard from "./BlogCard";
import CreateBlogModal from "./CreateBlogModal";
import { useBlogs } from "../hooks/useBlogs";
import SkeletonCard from "./SkeletonCard";

export default function BlogList() {
  const { blogs, loading, error } = useBlogs();

  // แสดง error
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">บทความล่าสุด</h2>
        <CreateBlogModal onCreated={() => window.location.reload()} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? (
          // แสดง Skeleton 3 อัน
          [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          // แสดง BlogCard จริง
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
// src/components/BlogDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import SkeletonDetail from "./SkeletonDetail";
import { CURRENT_USER_ID } from "../lib/auth";
import { useState } from "react";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { blog, loading, error } = useBlog(id!);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isOwner = blog?.author.id === CURRENT_USER_ID;

  const handleDeleted = () => {
    window.location.href = "/";
  };

  if (loading) return <SkeletonDetail />;
  if (error) return <p className="text-red-500 text-center py-12">{error}</p>;
  if (!blog) return <p className="text-center py-12">ไม่พบบทความ</p>;

  return (
    <article className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-6"
      >
        ← กลับหน้าหลัก
      </Link>

      <div className="relative mb-8">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-300 rounded-xl animate-pulse" />
        )}
        <img
          src={`${blog.coverImage}?width=1200`}
          alt={blog.title}
          className={`w-full h-64 md:h-96 object-cover rounded-xl transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            {blog.author.avatar && (
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{blog.author.name}</span>
          </div>
          <span>·</span>
          <time>
            {new Date(blog.createdAt).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <section
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br>") }}
      />

      {isOwner && (
        <div className="mt-12 flex justify-end">
          <button
            onClick={async () => {
              if (!confirm(`ลบ "${blog.title}" หรือไม่?`)) return;
              try {
                const res = await fetch("http://localhost:4000", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    query: `
                      mutation DeleteBlog($id: ID!) {
                        deleteBlog(id: $id)
                      }
                    `,
                    variables: { id: blog.id },
                  }),
                });
                const json = await res.json();
                if (json.errors) throw new Error(json.errors[0].message);
                handleDeleted();
              } catch (err: any) {
                alert(err.message || "ลบไม่สำเร็จ");
              }
            }}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            ลบบทความ
          </button>
        </div>
      )}
    </article>
  );
}
// src/components/BlogCard.tsx
import { useDeleteBlog } from "../hooks/useDeleteBlog";
import { useState } from "react";
import { CURRENT_USER_ID } from "../lib/auth";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

export interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: { id: string; name: string; avatar?: string };
  tags?: string[];
  createdAt: string;
  onDeleted?: () => void;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  coverImage,
  author,
  tags = [],
  createdAt,
  onDeleted,
}: BlogCardProps) {
  const { deleteBlog } = useDeleteBlog(onDeleted);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isOwner = author.id === CURRENT_USER_ID;

  return (
    <div data-testid="blog-card" className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col relative">
      <Link to={`/blog/${id}`} className="block">
        {/* ภาพปก - เงื่อนไขแสดง */}
        {coverImage ? (
          <div className="p-4 relative">
            {!imageLoaded && (
              <div
                data-testid="skeleton-image"
                className="absolute inset-0 bg-gray-300 rounded-lg animate-pulse"
              />
            )}
            <img
              data-testid="cover-image"
              src={`${coverImage}?blur=2&width=600`}
              alt={title}
              className={`w-full h-48 object-cover rounded-lg transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        ) : (
          <div className="p-4">
            <div
              data-testid="no-cover-placeholder"
              className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm"
            >
              ไม่มีรูปภาพ
            </div>
          </div>
        )}
      </Link>

      <div className="p-4 flex-grow">
        <Link to={`/blog/${id}`} className="block">
          <h3
            data-testid="blog-title"
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
          >
            {title}
          </h3>
        </Link>

        <p data-testid="blog-excerpt" className="text-sm text-gray-600 mt-2 line-clamp-2">
          {excerpt}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              data-testid="blog-tag"
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div data-testid="blog-meta" className="mt-3 text-xs text-gray-500">
          เขียนโดย <span data-testid="blog-author">{author.name}</span> •{" "}
          {new Date(createdAt).toLocaleDateString("th-TH")}
        </div>
      </div>

      {isOwner && (
        <div className="absolute top-2 right-2">
          <DeleteButton
            onDelete={() => deleteBlog(id)}
            itemName={`บทความ "${title}"`}
          />
        </div>
      )}
    </div>
  );
}
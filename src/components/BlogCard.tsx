import { useDeleteBlog } from "../hooks/useDeleteBlog";
import { useState } from "react";
import { CURRENT_USER_ID } from "../lib/auth";
import DeleteButton from "./DeleteButton";


interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: { id: string; name: string };
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
  const { deleteBlog, loading } = useDeleteBlog(onDeleted);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isOwner = author.id === CURRENT_USER_ID;


  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col relative">
      {/* รูปปก */}
      <div className="p-4 relative">
        {/* Skeleton สำหรับรูป */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-300 rounded-lg animate-pulse" />
        )}
        <img
          src={`${coverImage}?blur=2&width=600`}
          alt={title}
          className={`w-full h-48 object-cover rounded-lg transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* เนื้อหา */}
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{excerpt}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-3 text-xs text-gray-500">
          เขียนโดย {author.name} • {new Date(createdAt).toLocaleDateString("th-TH")}
        </div>
      </div>

      {/* ปุ่มลบ */}
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
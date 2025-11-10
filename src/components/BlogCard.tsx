import { useDeleteBlog } from "../hooks/useDeleteBlog";
import { useState } from "react";
import { CURRENT_USER_ID } from "../lib/auth";


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
  const [showConfirm, setShowConfirm] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isOwner = author.id === CURRENT_USER_ID;

  const handleDelete = async () => {
    const success = await deleteBlog(id);
    if (success) {
      setShowConfirm(false);
    }
  };

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

      {/* ปุ่มลบ (เฉพาะเจ้าของ) */}
      {isOwner && (
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            title="ลบบทความ"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800">ยืนยันการลบ</h3>
            <p className="text-sm text-gray-600 mt-2">คุณแน่ใจหรือไม่ที่จะลบบทความนี้?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "กำลังลบ..." : "ลบ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
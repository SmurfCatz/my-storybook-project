import React, { useState } from "react";
import { useCreateBlog } from "../hooks/useCreateBlog";

interface Props {
  onCreated?: () => void;
}

export default function CreateBlogModal({ onCreated }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { createBlog, loading, error } = useCreateBlog();

  const [form, setForm] = useState({
    title: "",
    content: "",
    coverImage: "",
    authorId: "1",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = form.tags
      ? form.tags.split(",").map((t) => t.trim())
      : [];

    const ok = await createBlog({
      title: form.title,
      content: form.content,
      coverImage:
        form.coverImage ||
        `https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}`,
      authorId: form.authorId,
      tags: tagsArray,
    });


    if (ok) {
      setForm({ title: "", content: "", coverImage: "", authorId: "1", tags: "" });
      setIsOpen(false);
      onCreated?.();
    }
  };

  return (
    <>
      {/* ปุ่มเปิด Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        โพสต์
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              โพสต์บทความใหม่
            </h2>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="ชื่อบทความ"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                required
              />

              <textarea
                placeholder="เนื้อหา..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 h-28"
                required
              />

              <input
                type="text"
                placeholder="URL รูปปก (ปล่อยว่างเพื่อสุ่ม)"
                value={form.coverImage}
                onChange={(e) =>
                  setForm({ ...form, coverImage: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="text"
                placeholder="แท็ก (เช่น GraphQL,React)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? "กำลังบันทึก..." : "บันทึก"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

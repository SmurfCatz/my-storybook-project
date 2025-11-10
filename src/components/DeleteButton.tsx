// src/components/DeleteButton.tsx
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface DeleteButtonProps {
  onDelete: () => Promise<boolean>;
  itemName?: string;
}

export default function DeleteButton({ onDelete, itemName = "รายการนี้" }: DeleteButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const success = await onDelete();
    setLoading(false);
    if (success) setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
        title="ลบ"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      <ConfirmModal
        isOpen={showModal}
        title="ยืนยันการลบ"
        message={`คุณแน่ใจหรือไม่ที่จะลบ${itemName}?`}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
        loading={loading}
      />
    </>
  );
}
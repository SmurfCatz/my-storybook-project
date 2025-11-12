// src/components/Contact.tsx
import { useContacts } from "../hooks/useContacts";

export default function Contact() {
  const { contacts, loading, error, refetch } = useContacts();

  if (loading && contacts.length === 0) {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-64 flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-lg font-medium text-blue-700 animate-pulse">
          กำลังโหลดข้อมูล... (5 วินาที)
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">ติดต่อเรา</h2>
        <p className="mt-2 text-red-600">เกิดข้อผิดพลาด: {error}</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="mt-2 text-gray-600">
        จำนวนผู้ติดต่อทั้งหมด: {contacts.length} คน
      </p>

      {contacts.length === 0 ? (
        <p className="mt-4 text-gray-500">ยังไม่มีรายชื่อผู้ติดต่อ</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contacts.map((person) => (
            <div
              key={person.id}
              className="border rounded-lg p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={person.avatar}
                alt={person.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{person.name}</p>
                <p className="text-sm text-gray-600">{person.position}</p>
                <p className="text-sm text-gray-500">{person.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
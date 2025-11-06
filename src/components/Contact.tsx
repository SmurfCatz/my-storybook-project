import { useContacts } from "../hooks/useContacts";

export default function Contact() {
  const { contacts, loading } = useContacts();

  if (loading)
    return <p className="p-6 text-gray-600">กำลังโหลดข้อมูล...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800">ติดต่อเรา</h2>
      <p className="mt-2 text-gray-600">
        จำนวนผู้ติดต่อทั้งหมด: {contacts.length} คน
      </p>

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
    </div>
  );
}

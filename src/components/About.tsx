import { useAbout } from "../hooks/useAbout";

export default function About() {
  const { About, loading } = useAbout();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 animate-pulse">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

   return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        เกี่ยวกับเรา
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {About.map((item) => (
          <div
            key={item.title}
            className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow bg-white"
          >
            <div className="flex flex-col h-full">
              <h2
                data-testid="about-heading"
                className="text-xl font-semibold text-gray-800 mb-2"
              >
                {item.title}
              </h2>
              <p
                data-testid="about-text"
                className="text-gray-600 leading-relaxed text-sm"
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import Carousel from "./Carousel";
import BlogList from "./BlogList";

export default function Home() {


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800">หน้าหลัก</h2>
      <p className="mt-2 text-gray-600">ยินดีต้อนรับเข้าสู่ Storybook</p>

      <div className="mt-4">
        <Carousel count={5} />
      </div>
      <div className="mt-8">
        <BlogList  />
      </div>
    </div>
  );
}
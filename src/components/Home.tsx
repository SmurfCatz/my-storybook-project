import Carousel from "./Carousel";
import BlogList from "./BlogList";
import { Outlet } from "react-router-dom";

export default function Home() {


  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">หน้าหลัก</h1>
      <h2 data-testid="welcome-title" className="text-2xl mt-4">
        ยินดีต้อนรับเข้าสู่ Storybook
      </h2>

      <div className="mt-4">
        <Carousel count={5} />
      </div>
      <div className="mt-8">
        <BlogList  />
      </div>

      <Outlet />
    </div>
  );
}
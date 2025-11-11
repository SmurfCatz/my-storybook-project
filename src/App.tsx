// src/App.tsx
import { ReactNode } from "react";
import TabBar from "./components/TabBar";
import Footer from "./components/Footer";
import { Pages, useTabState } from "./hooks/useTabState";
import { Outlet, useLocation } from "react-router-dom";

interface AppProps {
  children?: ReactNode;
  currentPage?: Pages;
  changePage?: (page: Pages) => void;
}

function App({ children, currentPage: propPage, changePage: propChange }: AppProps) {
  const { currentPage: hookPage, changePage: hookChange } =
    propPage === undefined
      ? useTabState()
      : { currentPage: propPage!, changePage: propChange! };

  const currentPage = propPage ?? hookPage;
  const changePage = propChange ?? hookChange;
  const location = useLocation();
  const isBlogDetail = location.pathname.startsWith("/blog/");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* TabBar) */}
        <header className="bg-white shadow-sm border-b">
          <TabBar currentPage={currentPage} onChangePage={changePage} />
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-8 min-h-full">
            <Outlet />
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
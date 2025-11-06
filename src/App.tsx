// src/App.tsx
import { ReactNode } from 'react';
import TabBar from './components/TabBar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Pages, useTabState } from './hooks/useTabState';

interface AppProps {
  children?: ReactNode;
  currentPage?: Pages;
  changePage?: (page: Pages) => void;
}

function App({ children, currentPage: propPage, changePage: propChange }: AppProps) {
  // ใช้ props ถ้ามี (สำหรับ Storybook), มิฉะนั้นใช้ hook (สำหรับแอปจริง)
  const { currentPage: hookPage, changePage: hookChange } = 
    propPage === undefined ? useTabState() : { currentPage: propPage, changePage: propChange! };

  const currentPage = propPage ?? hookPage;
  const changePage = propChange ?? hookChange;

  const renderContent = () => {
    switch (currentPage) {
      case Pages.HOME:
        return <Home />;
      case Pages.ABOUT:
        return <About />;
      case Pages.CONTACT:
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <TabBar currentPage={currentPage} onChangePage={changePage} />
        </header>

        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm p-8 min-h-full">
            {renderContent()}
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
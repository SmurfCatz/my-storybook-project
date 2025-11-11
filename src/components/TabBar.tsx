// src/components/TabBar.tsx
import { Pages, TabBarProps } from "../hooks/useTabState";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const tabs = [
  { id: Pages.HOME, label: "Home", path: "/" },
  { id: Pages.ABOUT, label: "About", path: "/about" },
  { id: Pages.CONTACT, label: "Contact", path: "/contact" },
];

export default function TabBar({ currentPage, onChangePage }: TabBarProps) {
  const location = useLocation();

  // ซิงค์ URL กับ currentPage
  useEffect(() => {
    const path = location.pathname;
    const tab = tabs.find((t) => t.path === path);
    if (tab && currentPage !== tab.id) {
      onChangePage(tab.id);
    }
  }, [location.pathname, currentPage, onChangePage]);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              My Storybook
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={() => onChangePage(tab.id)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${currentPage === tab.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }
                `}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
import { Pages, TabBarProps } from '../hooks/useTabState';

const tabs = [
  { id: Pages.HOME, label: 'Home' },
  { id: Pages.ABOUT, label: 'About' },
  { id: Pages.CONTACT, label: 'Contact' },
];

export default function TabBar({ currentPage, onChangePage }: TabBarProps) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / App Name */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">My Storybook</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onChangePage(tab.id)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${currentPage === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
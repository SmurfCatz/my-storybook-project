import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterTag: (tag: string | null) => void;
  onFilterAuthor: (authorId: string | null) => void;
  allTags: string[];
  allAuthors: { id: string; name: string }[];
}

export default function SearchBar({
  onSearch,
  onFilterTag,
  onFilterAuthor,
  allTags,
  allAuthors,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* ช่องค้นหา */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="ค้นหาบทความ..."
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* กรองตาม Tag */}
      <div className="relative">
        <button
          onClick={() => setShowTagDropdown(!showTagDropdown)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-1 transition"
        >
          Tag <span className="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </span>
        </button>
        {showTagDropdown && (
          <div className="absolute top-full mt-1 w-48 bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            <button
              onClick={() => { onFilterTag(null); setShowTagDropdown(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              ทั้งหมด
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => { onFilterTag(tag); setShowTagDropdown(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* กรองตามผู้เขียน */}
      <div className="relative">
        <button
          onClick={() => setShowAuthorDropdown(!showAuthorDropdown)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-1 transition"
        >
          ผู้เขียน <span className="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </span>
        </button>
        {showAuthorDropdown && (
          <div className="absolute top-full mt-1 w-48 bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            <button
              onClick={() => { onFilterAuthor(null); setShowAuthorDropdown(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              ทั้งหมด
            </button>
            {allAuthors.map((author) => (
              <button
                key={author.id}
                onClick={() => { onFilterAuthor(author.id); setShowAuthorDropdown(false); }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {author.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
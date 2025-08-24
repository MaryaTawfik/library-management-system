import { FaSearch, FaChevronDown } from "react-icons/fa";

const categories = [
  "All Categories",
  "Computer Science",
  "Mathematics",
  "Physics",
  "History",
];

export default function SearchBar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}) {
  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("All Categories");
  };

  return (
    <div className="px-6 py-6 border-gray-400 rounded-lg mb-7 bg-gray-100">
      {/* Heading with icon */}
      <div className="flex items-center text-orange-800 text-lg font-semibold mb-3">
        <FaSearch className="mr-2 text-orange-600" />
        <span>Search & Filter</span>
      </div>

      {/* Search + Category + All Books */}
      <div className="flex justify-between items-center gap-4">
        {/* Left side Search + Category */}
        <div className="flex items-center gap-3 flex-1 max-w-3xl">
          {/* Search box */}
          <div className="flex items-center flex-grow bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-amber-600">
            <input
              type="text"
              placeholder="Search by title, author, or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* Category Dropdown with Icon */}
          <div className="relative min-w-[140px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* Chevron Down Icon */}
            <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Right side All Books button */}
        <button
          onClick={handleResetFilters}
          className="text-sm px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md border border-gray-300 shadow-sm"
        >
          All Books
        </button>
      </div>
    </div>
  );
}

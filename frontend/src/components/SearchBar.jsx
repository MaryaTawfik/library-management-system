import { FaSearch, FaChevronDown } from "react-icons/fa";

export default function SearchBar({
  search,
  setSearch,
  selectedCatagory,
  setSelectedCatagory,
  catagories,
}) {
  const handleResetFilters = () => {
    setSearch("");
    setSelectedCatagory("All Catagories");
  };

  return (
    <div className="px-6 py-2 border-gray-200 shadow-lg rounded-lg mb-7 bg-stone-100">
      {/* Heading with icon */}
      <div className="flex items-center text-yellow-900 text-lg font-semibold mb-3">
        <FaSearch className="mr-2 text-yellow-800" />
        <span>Search & Filter</span>
      </div>

      {/* Search + Category + All Books */}
      <div className="flex justify-between items-center gap-4">
        {/* Left side Search + Category */}
        <div className="flex items-center gap-3 flex-1 max-w-3xl">
          {/* Search box */}
          <div className="flex items-center flex-grow bg-white  rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-amber-600">
            <input
              type="text"
              placeholder="Search by title, author, or catagory"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* Category Dropdown with Icon */}
          <div className="relative min-w-[140px]">
            <select
              value={selectedCatagory}
              onChange={(e) => setSelectedCatagory(e.target.value)}
              className="w-full appearance-none bg-white border-gray-100 rounded-md px-3 py-2 pr-8 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-100"
            >
              {catagories.map((cat) => (
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

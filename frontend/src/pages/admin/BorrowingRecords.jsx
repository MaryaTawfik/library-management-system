import React, { useState, useEffect } from "react";
import { FaBook, FaUser } from "react-icons/fa";
import {
  getAllBorrows,
  updateBorrowStatus,
} from "../../services/borrowService";
import { toast } from "react-toastify"; // ✅ import toast

export default function BorrowingRecords() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 6;

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      
      const res = await getAllBorrows();
      const list = Array.isArray(res) ? res : res?.data || [];
      setRecords(list);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load borrowing records");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const normalizeRecord = (r) => {
    const id = r._id || r.id || null;
    const book = r.book ||
      r.bookDetails || { title: "Unknown", author: "-", imageUrl: "" };
    const user = r.user || r.userDetails || { name: "-", email: "" };
    const borrowDate = r.borrowDate || r.borrowedAt || r.createdAt || null;
    const dueDate = r.dueDate || null;
    const returnDate = r.returnDate || r.returnedAt || null;
    const status = (r.status || "").toString() || "unknown";
    return { id, book, user, borrowDate, dueDate, returnDate, status, raw: r };
  };

  const normalized = records.map(normalizeRecord);

  const filteredRecords = normalized.filter((record) => {
    const bookTitle = (record.book?.title || "").toLowerCase();
    const bookAuthor = (record.book?.author || "").toLowerCase();
    const userName = (record.user?.name || "").toLowerCase();

    const matchesSearch =
      bookTitle.includes(searchTerm.toLowerCase()) ||
      bookAuthor.includes(searchTerm.toLowerCase()) ||
      userName.includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / recordsPerPage)
  );

  const statusColor = {
    borrowed: "bg-green-100 text-green-700",
    overdue: "bg-red-100 text-red-700",
    returned: "bg-gray-100 text-gray-700",
    unknown: "bg-gray-100 text-gray-700",
  };

  const getInitials = (name) => {
    if (!name) return "-";
    return name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className=" bg-white border-4 border-white dark:border-0 shadow-sm min-h-screen rounded-2xl font-[sanif sarif]  dark:bg-gray-900 dark:border-gray-700 p-6">
      <h1 className="text-2xl text-yellow-700 font-bold font-[inter] mb-1">
        Borrowing Records
      </h1>
      <p className="text-gray-800 mt-3 font-[inter] dark:text-gray-300">
        View all borrowing and return history
      </p>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 mt-6 border-8 border-gray-50 bg-white px-4 rounded shadow-xl dark:bg-gray-900 dark:border-gray-600 dark:border-1">
        <input
          type="text"
          placeholder="Search by book title, user name, or author…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 border-gray-50  text-gray-800 bg-white px-4 py-2 rounded w-full dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border-0 border-gray-50 bg-white text-gray-700 text-sm px-4 pl-10 py-2 rounded w-full sm:w-35 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="all" >All Status</option>
          <option value="borrowed">Borrowed</option>
          <option value="returned">Returned</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow dark:bg-gray-700 ">
        <table className="w-full text-sm  overflow-x-scroll">
          <thead className="bg-white border-2 border-gray-50 text-black font-[roboto] dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:border-0">
            <tr>
              <th className="text-left px-4 py-3">Book</th>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Borrow Date</th>
              <th className="text-left px-4 py-3">Due Date</th>
              <th className="text-left px-4 py-3">Return Date</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 dark:text-gray-300">
                  Loading records…
                </td>
              </tr>
            )}

            {!loading &&
              paginatedRecords.map((record) => (
                <tr
                  key={record.id || JSON.stringify(record.raw)}
                  className="border-6 border-white shadow-black odd:bg-gray-100 even:bg-gray-white dark:odd:bg-gray-800 dark:even:bg-gray-900 dark:border-gray-700 dark:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={record.book?.imageUrl}
                        alt={record.book?.title}
                        className="w-10 h-14 object-cover rounded shadow-sm"
                      />
                      <div>
                        <div
                          className="font-medium flex items-center gap-1 dark:text-gray-300"
                          title={record.book?.title || ""}
                        >
                          <FaBook className="text-yellow-600 dark:text-yellow-400" />
                          <span>{record.book?.title || "Untitled"}</span>
                        </div>
                        <div className="text-gray-500 text-xs dark:text-gray-400 ">
                          by {record.book?.author || "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full font-semibold text-gray-700">
                        {getInitials(record.user?.name)}
                      </div>
                      <div>
                        <div
                          className="font-medium flex items-center gap-1 dark:text-gray-300"
                          title={record.user?.name || record.user?.email || ""}
                        >
                          <FaUser className="text-yellow-600 dark:text-yellow-400" />
                          <span>
                            {record.user?.name ||
                              record.user?.email ||
                              "Unknown"}
                          </span>
                        </div>
                        <div className="text-gray-500 text-xs dark:text-gray-400" title={record.user?.email || ""}>
                          {record.user?.email || "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                    {record.borrowDate
                      ? new Date(record.borrowDate).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-300">
                    {record.dueDate ? (
                      new Date(record.dueDate).toLocaleString()
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                    {record.returnDate ? (
                      new Date(record.returnDate).toLocaleString()
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 dark:bg-gray-700 dark:text-gray-300 rounded text-xs font-medium  ${
                        statusColor[record.status || "unknown"]
                      }`}
                      title={record.status || "unknown"}
                    >
                      {(record.status || "unknown").charAt(0).toUpperCase() +
                        (record.status || "unknown").slice(1)}
                    </span>
                  </td>
                </tr>
              ))}

            {!loading && paginatedRecords.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 text-sm dark:text-gray-300"
                >
                  No borrowing records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-6 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <span className="dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

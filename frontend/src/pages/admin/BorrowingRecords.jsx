import React, { useState, useEffect } from "react";
import { FaBook, FaUser } from "react-icons/fa";
import {
  getAllBorrows,
  updateBorrowStatus,
} from "../../services/borrowService";

export default function BorrowingRecords() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const recordsPerPage = 6;

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllBorrows();
      const list = Array.isArray(res) ? res : res?.data || [];
      setRecords(list);
    } catch (err) {
      setError(err.message || "Failed to load records");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const normalizeRecord = (r) => {
    const id = r._id || r.id || r.recordId || null;
    const book = r.book ||
      r.bookDetails || { title: "Unknown", author: "-", cover: "" };
    const user = r.user ||
      r.userDetails ||
      r.userInfo || {
        name: r.user?.name || r.user?.firstName || "-",
        email: r.user?.email || "",
      };
    const borrowDate = r.borrowDate || r.borrowedAt || r.createdAt || null;
    const dueDate = r.dueDate || r.due || null;
    const returnDate = r.returnDate || r.returnedAt || null;
    const status = (r.status || "").toString() || "unknown";
    return { id, book, user, borrowDate, dueDate, returnDate, status, raw: r };
  };

  const normalized = records.map(normalizeRecord);

  const filteredRecords = normalized.filter((record) => {
    const bookTitle = (record.book?.title || "").toString().toLowerCase();
    const bookAuthor = (record.book?.author || "").toString().toLowerCase();
    const userName = (record.user?.name || record.user?.firstName || "")
      .toString()
      .toLowerCase();

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
      .toString()
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // const handleMarkReturned = async (recordId) => {
  //   setLoading(true);
  //   try {
  //     await updateBorrowStatus(recordId, "returned");
  //     await fetchRecords();
  //   } catch (err) {
  //     console.error(err);
  //     setError("Failed to update record");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="p-6 bg-stone-500  border-yellow-600 min-h-screen rounded-2xl">
      <h1 className="text-2xl text-white text-shadow-yellow-600 font-bold mb-1">
        Borrowing Records
      </h1>
      <p className="text-gray-300 mb-6">
        View all borrowing and return history
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 bg-stone-600 p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by book title, user name, or author…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 border text-gray-700 bg-white px-4 py-2 rounded w-full"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border bg-white text-gray-700 px-4 py-2 rounded w-full sm:w-48"
        >
          <option value="all">All Status</option>
          <option value="borrowed">Borrowed</option>
          <option value="returned">Returned</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="bg-white  shadow overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className="bg-slate-800  text-white">
            <tr>
              <th className="text-left px-4 py-3">Book</th>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Borrow Date</th>
              <th className="text-left px-4 py-3">Due Date</th>
              <th className="text-left px-4 py-3">Return Date</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Loading records…
                </td>
              </tr>
            )}
            {!loading &&
              paginatedRecords.map((record) => (
                <tr
                  key={
                    record.id || record.raw?.id || JSON.stringify(record.raw)
                  }
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={record.book?.imageUrl || ""}
                        alt={record.book?.title || ""}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div>
                        <div
                          className="font-medium flex items-center gap-1"
                          title={record.book?.title || ""}
                        >
                          <FaBook className="text-yellow-600" />
                          <span>{record.book?.title || "Untitled"}</span>
                        </div>
                        <div className="text-gray-500 text-xs">
                          by {record.book?.author || "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full font-semibold text-gray-700">
                        {getInitials(
                          record.user?.name ||
                            `${record.user?.firstName || ""} ${
                              record.user?.lastName || ""
                            }`
                        )}
                      </div>
                      <div>
                        <div
                          className="font-medium flex items-center gap-1"
                          title={record.user?.name || record.user?.email || ""}
                        >
                          <FaUser className="text-yellow-600" />
                          <span>
                            {record.user?.name ||
                              record.user?.firstName ||
                              record.user?.email ||
                              "Unknown"}
                          </span>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {record.user?.email || "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {record.borrowDate
                      ? new Date(record.borrowDate).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {record.supposedReturnDate ? (
                      new Date(record.supposedReturnDate).toLocaleString()
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {record.returnDate ? (
                      new Date(record.returnDate).toLocaleString()
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusColor[record.status || "unknown"]
                      }`}
                      title={record.status || "unknown"}
                    >
                      {(record.status || "unknown")
                        .toString()
                        .charAt(0)
                        .toUpperCase() +
                        (record.status || "unknown").toString().slice(1)}
                    </span>
                  </td>
                  {/* <td className="px-4 py-3">
                    {record.status === "borrowed" && (
                      <button
                        onClick={() =>
                          handleMarkReturned(record.id || record.raw?.id)
                        }
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        Mark returned
                      </button>
                    )}
                  </td> */}
                </tr>
              ))}
            {!loading && paginatedRecords.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No borrowing records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 gap-2 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// src/pages/AdminPayments.jsx
import React, { useEffect, useState } from "react";
import {
  getAllPayments,
  updatePaymentStatus,
} from "../services/paymentsService";
import { Eye, CheckCircle, XCircle, User } from "lucide-react";

const PAGE_SIZE = 5;

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [view, setView] = useState("pending"); // pending | processed
  const [page, setPage] = useState(1);

  // Fetch payments on mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getAllPayments();
        setPayments(res);
      } catch (err) {
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Handle Approve/Reject
  const handleAction = async (id, action) => {
    try {
      await updatePaymentStatus(id, action);
      setPayments((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: action } : p))
      );
    } catch (err) {
      console.error("Error updating payment:", err);
    }
  };

  // Search & Filter logic
  const filteredPayments = payments.filter((p) => {
    const nameMatch = p.userId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const emailMatch = p.userId?.email
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      filterStatus === "all" ? true : p.status === filterStatus;

    return (nameMatch || emailMatch) && statusMatch;
  });

  const pendingPayments = filteredPayments.filter(
    (p) => p.status === "pending"
  );
  const processedPayments = filteredPayments.filter(
    (p) => p.status !== "pending"
  );

  // Choose which data to display
  const activeData = view === "pending" ? pendingPayments : processedPayments;

  // Pagination
  const totalPages = Math.ceil(activeData.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const paginatedData = activeData.slice(startIdx, startIdx + PAGE_SIZE);

  if (loading) return <p className="p-6 dark:text-gray-300">Loading payments...</p>;

  return (
    <div className="max-w-5xl mx-auto  space-y-6 border-0 border-white shadow-sm rounded-2xl min-h-screen fon-[sanif sarif] dark:bg-gray-900 p-6 dark:border-gray-700">
      <h1 className="text-2xl font-[inter] font-bold mb-6 text-center dark:text-gray-300">
        Payment Management
      </h1>
      <div className="flex flex-row border-0 border-gray-50 shadow-lg rounded-xl gap-4 mb-4 dark:bg-gray-900 p-2 dark:border-gray-600">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border-2 border-white rounded-lg focus:outline-none focus:ring focus:ring-blue-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-gray-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border-2 shadow border-gray-50 rounded-lg focus:outline-none  focus:ring-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-gray-500"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {/* Switcher */}
      <div className=" flex justify-between items-center mb-6 bg-white font-[inter] p-2 rounded-lg border-0 border-gray-50 shadow-lg dark:bg-gray-900 dark:border-gray-600">
        {view === "pending" ? (
          <div>
            <h2 className="text-lg font-semibold mb-1 mt-4 dark:text-gray-400">
              Pending Payments ({pendingPayments.length})
            </h2>
            {pendingPayments.length === 0 && (
              <p className="text-gray-500 dark:text-gray-300">No pending payments 🎉</p>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-1 mt-3 font-[inter] dark:text-gray-300">
              Recent Processed Payments
            </h2>
            {processedPayments.length === 0 && (
              <p className="text-gray-500 dark:text-gray-300">No processed payments yet</p>
            )}
          </div>
        )}

        {/*toggle button */}
        <button
          onClick={() => {
            setView(view === "pending" ? "processed" : "pending");
            setPage(1);
          }}
          className={`px-1 py-1 rounded ${
            view === "pending"
              ? "bg-yellow-600 text-white mb-1 mt-3 hover:bg-gray-400 dark:bg-yellow-650 dark:hover:bg-yellow-500"
              : "bg-yellow-500 text-white mb-1 mt-3 hover:bg-gray-500 dark:bg-yellow-650 dark:hover:bg-yellow-500"
          }`}
        >
          {view === "pending" ? "View Processed →" : "← Back to Pending"}
        </button>
      </div>
      {/* Payments List */}
      {paginatedData.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          {view === "pending"
            ? "No pending payments 🎉"
            : "No processed payments yet."}
        </p>
      ) : (
        <div className="space-y-4">
          {paginatedData.map((p) => (
            <div
              key={p._id}
              className="bg-gray-50 rounded-lg shadow p-1 flex justify-between items-center dark:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-600">
                  <User className="text-gray-500 dark:text-gray-300" size={20} />
                </div>
                <div className="flex flex-row gap-15">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-300">
                      {p.userId?.name || "Unknown User"}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {p.userId?.email || "No email"}
                    </div>
                  </div>
                  <div className="mt-1 gap-2 text-sm ">
                    <div className="text-yellow-600 dark:text-yellow-400 font-semibold">
                      Amount: {p.amount} birr
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 dark:text-gray-300">
                {p.status === "pending" ? (
                  <>
                    <button
                      onClick={() => setSelectedScreenshot(p.paymentProof)}
                      className="border border-slate-100 bg-white px-3 py-1 rounded text-gray-600 hover:bg-gray-100 flex items-center gap-1 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button
                      onClick={() => handleAction(p._id, "approved")}
                      className="bg-white text-yellow-600 px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1 dark:bg-gray-600 dark:text-yellow-400 dark:hover:bg-green-600"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button
                      onClick={() => handleAction(p._id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1 dark:bg-red-600 dark:hover:bg-red-800"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded ${
                      p.status === "approved"
                        ? "bg-white text-yellow-700 dark:text-yellow-400"
                        : "bg-white text-red-600 dark:text-red-400"
                    }`}
                  >
                    {p.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}{" "}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 space-x-2">
          {" "}
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-1 py-1 bg-white border-1 border-slate-400 rounded disabled:opacity-50 "
          >
            {" "}
            ◀ prev{" "}
          </button>{" "}
          <span className="dark:text-gray-300">
            {" "}
            Page {page} of {totalPages}{" "}
          </span>{" "}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-1 py-1 bg-gray-200  border-2 border-slate-400 rounded disabled:opacity-50"
          >
            {" "}
            Next ▶{" "}
          </button>{" "}
        </div>
      )}
      {/* Screenshot Modal (fixed size) */}
      {selectedScreenshot && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4">
            <h3 className="text-lg font-semibold mb-3">Payment Screenshot</h3>
            <img
              src={selectedScreenshot}
              alt="Payment Screenshot"
              className="w-full h-[200px] object-contain rounded"
            />
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedScreenshot(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;

// src/pages/AdminPayments.jsx
import React, { useEffect, useState } from "react";
import {
  getAllPayments,
  updatePaymentStatus,
} from "../services/paymentsService";
import { Eye, CheckCircle, XCircle, User } from "lucide-react";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

  if (loading) return <p className="p-6">Loading payments...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6 border-8 border-white  shadow-2xl rounded-4xl min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Payment Management</h1>

      {/* Search & Filter */}
      <div className="flex flex-row  border-4 border-white shadow rounded-xl  gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border-2  border-white rounded-lg focus:outline-none focus:ring focus:ring-blue-50"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border-2  shadow border-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-gray-50"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Pending Payments */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Pending Payments ({pendingPayments.length})
        </h2>
        {pendingPayments.length === 0 ? (
          <p className="text-gray-500">No pending payments 🎉</p>
        ) : (
          <div className="space-y-4 max-h-70 overflow-y-auto pr-2">
            {pendingPayments.map((p) => (
              <div
                key={p._id}
                className="bg-gray-50 rounded-lg shadow p-1 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="text-gray-500" size={20} />
                  </div>
                  <div className="flex flex-row gap-12">
                    <div>
                      <div className="font-medium text-gray-900">
                        {p.userId?.name || "Unknown User"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {p.userId?.email || "No email"}
                      </div>
                    </div>
                    <div className="mt-1 gap-2 text-sm">
                      <div className="text-yellow-600">
                        Amount: {p.amount} birr
                      </div>
                      <span className="text-gray-700">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedScreenshot(p.paymentProof)}
                    className="border px-3 py-1 rounded text-gray-600 hover:bg-gray-100 flex items-center gap-1"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => handleAction(p._id, "approved")}
                    className="bg-white text-yellow-600 px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                  <button
                    onClick={() => handleAction(p._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Processed Payments */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Recent Processed Payments
        </h2>
        {processedPayments.length === 0 ? (
          <p className="text-gray-500">No processed payments yet</p>
        ) : (
          <div className="space-y-4 max-h-70 overflow-y-auto pr-2">
            {processedPayments.map((p) => (
              <div
                key={p._id}
                className="bg-gray-50 rounded-lg shadow p-1 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="text-gray-500" size={20} />
                  </div>
                  <div className="flex flex-row gap-12">
                    <div>
                      <div className="font-medium text-gray-900">
                        {p.userId?.name || "Unknown User"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {p.userId?.email || "No email"}
                      </div>
                    </div>
                    <div className="mt-1 gap-2 text-sm">
                      <div className="text-yellow-600">
                        Amount: {p.amount} birr
                      </div>
                      <span className="text-gray-700">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {p.status === "approved" ? (
                    <span className="bg-white text-yellow-700 px-3 py-1 rounded">
                      Approved
                    </span>
                  ) : (
                    <span className="bg-white text-red-600 px-3 py-1 rounded">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Screenshot Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4">
            <h3 className="text-lg font-semibold mb-3">Payment Screenshot</h3>
            <img
              src={selectedScreenshot}
              alt="Payment Screenshot"
              className="w-full rounded"
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

import React, { useEffect, useState } from "react";
import {
  getDashboardStats,
  getPendingPayments,
  getRecentBorrowings,
  updatePaymentStatus,
} from "../services/adminservice";

const AdminDash = () => {
  const [stats, setStats] = useState({});
  const [pendingPayments, setPendingPayments] = useState([]);
  const [recentBorrows, setRecentBorrows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dashboardData = await getDashboardStats();
    setStats(dashboardData);

    const payments = await getPendingPayments();
    setPendingPayments(payments);

    const borrows = await getRecentBorrowings();
    setRecentBorrows(borrows);
  };

  const handlePaymentAction = async (id, action) => {
    await updatePaymentStatus(id, action);
    fetchData(); // refresh dashboard
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Overview of your library management system
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-lg">
          Total Books: <b>{stats.totalBooks}</b>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          Total Users: <b>{stats.totalUsers}</b>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          Active Members: <b>{stats.activeMembers}</b>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          Pending Payments: <b>{stats.pendingPayments}</b>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          Total Borrowings: <b>{stats.totalBorrowings}</b>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          Overdue Books: <b>{stats.overdueBooks}</b>
        </div>
      </div>

      {/* Pending Payments */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Pending Payments</h2>
          {pendingPayments.map((p) => (
            <div
              key={p._id}
              className="flex justify-between items-center mb-2 border-b pb-2"
            >
              <div>
                <p className="font-medium">{p.userName}</p>
                <p className="text-sm text-gray-500">
                  {p.duration} - ${p.amount}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handlePaymentAction(p._id, "approved")}
                  className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handlePaymentAction(p._id, "rejected")}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Borrowings */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Recent Borrowings</h2>
          {recentBorrows.map((b) => (
            <div
              key={b._id}
              className="flex justify-between items-center mb-2 border-b pb-2"
            >
              <div>
                <p className="font-medium">{b.bookTitle}</p>
                <p className="text-sm text-gray-500">by {b.userName}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-white text-xs ${
                  b.status === "overdue" ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDash;

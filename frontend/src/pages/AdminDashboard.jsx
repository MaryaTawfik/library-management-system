import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "@/atoms/themeAtom"; // make sure you have this


import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  UserCheck,
  CreditCard,
  List,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAllBooks } from "@/services/booksService";
import { getAllUsers } from "@/services/usersService";
import { getAllBorrows } from "@/services/borrowService";
import { getAllPayments } from "@/services/paymentsService";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [borrowings, setBorrowings] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme] = useAtom(themeAtom);


  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [booksData, usersData, borrowingsData, paymentsData] =
        await Promise.all([
          getAllBooks(),
          getAllUsers(),
          getAllBorrows(),
          getAllPayments(),
        ]);

      setBooks(booksData.data || booksData);
      setUsers(usersData.data || usersData);
      setBorrowings(borrowingsData.data || borrowingsData);

      const pending = (paymentsData || []).filter(
        (p) => p.status.toLowerCase() === "pending"
      );
      setPendingPayments(pending);
    } catch (error) {
      console.error(error);
      setPendingPayments([]);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Stats
  const totalBooks = books.length;
  const totalUsers = users.length;
  const activeMembers = users.filter(
    (u) => u.is_member && u.status === "active"
  ).length;
  const totalBorrowings = borrowings.length;
  const overdueBooks = borrowings.filter(
    (b) => b.status !== "returned" && new Date(b.dueDate) < new Date()
  ).length;

  // Book categories count
  const categoryCounts = books.reduce((acc, book) => {
    const cat = book.catagory || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(categoryCounts).map((key) => ({
    category: key,
    count: categoryCounts[key],
  }));

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl text-yellow-700 font-bold">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1 dark:text-gray-300">
            Overview of your library management system
          </p>
        </div>
        <button
          onClick={loadDashboardData}
          className="flex items-center bg-yellow-700 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          <RefreshCw className="mr-2" />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <Card className="flex flex-col items-center p-4 rounded-3xl shadow-lg border-2 border-white dark:border-gray-700">
          <BookOpen className="text-blue-500 mb-2 dark:text-blue-300" />
          <h2 className="text-xl font-bold dark:text-blue-300">{totalBooks}</h2>
          <p className="text-black dark:text-gray-300">Total Books</p>
        </Card>
        <Card className="flex flex-col items-center p-4 rounded-3xl shadow-lg border-2 border-white dark:border-gray-700">
          <Users className="text-green-500 mb-2 dark:text-green-300" />
          <h2 className="text-xl font-bold dark:text-green-300">{totalUsers}</h2>
          <p className="text-black dark:text-gray-300">Total Users</p>
        </Card>
        <Card className="flex flex-col items-center p-4 rounded-3xl shadow-lg border-2 border-white dark:border-gray-700">
          <UserCheck className="text-purple-500 mb-2 dark:text-purple-300" />
          <h2 className="text-xl font-bold dark:text-purple-300">{activeMembers}</h2>
          <p className="text-black dark:text-gray-300">Active Members</p>
        </Card>
        <Card className="flex flex-col items-center p-4 rounded-3xl shadow-lg border-2 border-white dark:border-gray-700">
          <CreditCard className="text-yellow-500 mb-2 dark:text-yellow-300" />
          <h2 className="text-xl font-bold dark:text-yellow-300">{pendingPayments.length}</h2>
          <p className="text-black dark:text-gray-300">Pending Payments</p>
        </Card>
        <Card className="flex flex-col items-center p-4 rounded-3xl shadow-lg border-2 border-white dark:border-gray-700">
          <List className="text-indigo-500 mb-2 dark:text-indigo-300" />
          <h2 className="text-xl font-bold dark:text-indigo-300">{totalBorrowings}</h2>
          <p className="text-black dark:text-gray-300">Total Borrowings</p>
        </Card>
        <Card className="flex flex-col items-center p-4 rounded-3xl shadow-lg border-2 border-white dark:border-gray-700">
          <AlertTriangle className="text-red-500 mb-2 dark:text-red-300" />
          <h2 className="text-xl font-bold dark:text-red-300">{overdueBooks}</h2>
          <p className="text-black dark:text-gray-300">Overdue Books</p>
        </Card>
      </div>

      {/* Pending Payments & Recent Borrowings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Payments */}
        <Card className="p-4 rounded-3xl shadow-lg border-2 border-white dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Pending Payments</h2>
          <CardContent className="space-y-3 max-h-64 overflow-y-auto">
            {pendingPayments.length === 0 && <p className=" dark:text-gray-400">No pending payments.</p>}
            {pendingPayments.map((p) => (
              <div
                key={p._id}
                className="bg-gray-50 rounded-lg p-2 shadow-sm flex justify-between gap-1 animate-fadeIn dark:bg-gray-800"
              >
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200 ">
                    👤 {p.userId?.firstName} {p.userId?.lastName}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {p.duration} - birr {p.amount}
                  </div>
                </div>
                <span className="text-sm bg-white text-yellow-600 px-1 py-1 rounded dark:bg-gray-800 dark:text-yellow-600 ">
                  Pending
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Borrowings */}
        <Card className="p-4 rounded-3xl shadow-lg border-2 border-white dark:border-gray-700 ">
          <h2 className="text-lg font-semibold mb-3 dark:text-gray-300">📖 Recent Borrowings</h2>
          <CardContent>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {borrowings
                .sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate))
                .map((b) => (
                  <div
                    key={b.borrowId}
                    className="bg-gray-50 rounded-lg p-2 shadow-sm flex justify-between gap-1 animate-fadeIn dark:bg-gray-800"
                  >
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-400">
                        {b.book?.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        👤 {b.user?.name}
                      </div>
                    </div>
                    <div className="mt-1 dark:bg-gray-800">
                      {b.status === "returned" ? (
                        <span className="text-xs bg-white text-blue-600 px-2 py-0.5 rounded dark:bg-gray-800 dark:text-blue-700">
                          Returned
                        </span>
                      ) : new Date(b.dueDate) < new Date() ? (
                        <span className="text-xs bg-white text-red-600 px-2 py-0.5 rounded dark:bg-gray-800 dark:text-red-700">
                          Overdue
                        </span>
                      ) : (
                        <span className="text-xs bg-white text-green-600 px-2 py-0.5 rounded dark:bg-gray-800 dark:text-green-700">
                          Borrowed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <div className="md:col-span-2 flex justify-center w-full dark:text-gray-300">
          <Card className="p-4 rounded-3xl shadow-lg border-2 border-white w-full dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-3 text-center dark:text-gray-300">
              Books by Category
            </h2>
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={barData}>
    <CartesianGrid stroke={theme === "dark" ? "#374151" : "#e5e7eb"} strokeDasharray="3 3" />
    <XAxis dataKey="category" stroke={theme === "dark" ? "#d1d5db" : "#111827"} />
    <YAxis stroke={theme === "dark" ? "#d1d5db" : "#111827"} />
    <Tooltip
      contentStyle={{
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", // gray-800 vs white
        color: theme === "dark" ? "#f3f4f6" : "#111827", // gray-100 vs gray-900
        borderRadius: "0.5rem",
      }}
      formatter={(value) => [`${value} books`]}
    />
    <Legend
      wrapperStyle={{
        color: theme === "dark" ? "#f3f4f6" : "#111827",
      }}
    />
    <Bar dataKey="count" fill={theme === "dark" ? "#b8860b" : "#b8860b"} />
  </BarChart>
</ResponsiveContainer>
</Card>
        </div>
      </div>
    </div>
  );
}

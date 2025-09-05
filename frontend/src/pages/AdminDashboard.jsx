import React, { useEffect, useState } from "react";
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
  PieChart,
  Pie,
  Cell,
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

      // Correctly filter pending payments
      const pending = (paymentsData || []).filter(
        (p) => p.status.toLowerCase() === "pending"
      );

      setPendingPayments(pending);

      toast.success("🔄 Dashboard data refreshed!");
    } catch (error) {
      console.error(error);
      setPendingPayments([]);
      toast.error("❌ Failed to load dashboard data");
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
  const categoryCounts = books.reduce((acc, book) => {
    const cat = book.catagory || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(categoryCounts).map((key) => ({
    name: key,
    value: categoryCounts[key],
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A569BD",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F333FF",
    "#33FFF5",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-yellow-700 font-bold">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of your library management system
          </p>
        </div>
        <button
          onClick={loadDashboardData}
          className="flex items-center bg-slate-700 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          <RefreshCw className="mr-2" />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="flex flex-col items-center border-8 border-white shadow-cyan-900 p-4 rounded-3xl shadow">
          <BookOpen className="text-blue-500 mb-2" />
          <h2 className="text-xl font-bold">{totalBooks}</h2>
          <p>Total Books</p>
        </Card>
        <Card className="flex flex-col items-center border-8 border-white shadow-cyan-900 p-4 rounded-3xl shadow">
          <Users className="text-green-500 mb-2" />
          <h2 className="text-xl font-bold">{totalUsers}</h2>
          <p>Total Users</p>
        </Card>
        <Card className="flex flex-col items-center border-8 border-white shadow-cyan-900 p-4 rounded-3xl shadow">
          <UserCheck className="text-purple-500 mb-2" />
          <h2 className="text-xl font-bold">{activeMembers}</h2>
          <p>Active Members</p>
        </Card>
        <Card className="flex flex-col items-center border-8 border-white shadow-cyan-900 p-4 rounded-3xl shadow">
          <CreditCard className="text-yellow-500 mb-2" />
          <h2 className="text-xl font-bold">{pendingPayments.length}</h2>
          <p>Pending Payments</p>
        </Card>
        <Card className="flex flex-col items-center border-8 border-white shadow-cyan-900 p-4 rounded-3xl shadow">
          <List className="text-indigo-500 mb-2" />
          <h2 className="text-xl font-bold">{totalBorrowings}</h2>
          <p>Total Borrowings</p>
        </Card>
        <Card className="flex flex-col items-center border-8 border-white shadow-cyan-900 p-4 rounded-3xl shadow">
          <AlertTriangle className="text-red-500 mb-2" />
          <h2 className="text-xl font-bold">{overdueBooks}</h2>
          <p>Overdue Books</p>
        </Card>
      </div>

      {/* Pending Payments & Recent Borrowings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Payments */}
        <Card className="border-8 border-white shadow-cyan-900 p-1 rounded-3xl shadow">
          <h2 className="text-lg font-semibold mb-4">Pending Payments</h2>
          <CardContent className="space-y-3 max-h-50 overflow-y-auto">
            {pendingPayments.length === 0 && <p>No pending payments.</p>}
            {pendingPayments.map((p) => (
              <div
                key={p._id}
                className="bg-gray-50 rounded-lg p-2 shadow-sm flex justify-between gap-1"
              >
                <div>
                  <div className="font-medium text-gray-800">
                    👤 {p.userId?.firstName} {p.userId?.lastName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {p.duration} - ${p.amount}
                  </div>
                </div>
                <span className="text-sm bg-white text-yellow-600 px-1 py-3 rounded">
                  Pending
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Borrowings */}
        <Card className="p-4 border-8 border-white shadow-cyan-900 rounded-3xl shadow">
          <h2 className="text-md font-semibold mb-3">📖 Recent Borrowings</h2>
          <CardContent>
            <div className="max-h-50 overflow-y-auto space-y-2">
              {borrowings
                .sort((a, b) => new Date(b.borrowDate) - new Date(a.borrowDate))
                .map((b) => (
                  <div
                    key={b.borrowId}
                    className="bg-gray-50 rounded-lg p-2 shadow-sm flex justify-between gap-1"
                  >
                    <div>
                      <div className="font-medium text-gray-800">
                        {b.book?.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        👤 {b.user?.name}
                      </div>
                    </div>
                    <div className="mt-1">
                      {b.status === "returned" ? (
                        <span className="text-xs bg-white text-blue-600 px-2 py-0.5 rounded">
                          Returned
                        </span>
                      ) : new Date(b.dueDate) < new Date() ? (
                        <span className="text-xs bg-white text-red-600 px-2 py-0.5 rounded">
                          Overdue
                        </span>
                      ) : (
                        <span className="text-xs bg-white text-green-600 px-2 py-0.5 rounded">
                          Borrowed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <div className="md:col-span-7 lg:col-span-5 flex justify-center px-50 ">
          <Card className="border-8 border-white  shadow-cyan-900 p-1 rounded-3xl shadow w-full  ">
            <h2 className="text-lg font-semibold mb-1">Books by Category</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}

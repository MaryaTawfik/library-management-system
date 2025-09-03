import React, { useState } from "react";

const AdminPayments = () => {
  // Mock payment requests
  const [payments, setPayments] = useState([
    {
      id: 1,
      student: "John Doe",
      plan: "Basic",
      amount: "₹199",
      screenshot: "/sample-receipt.png", // replace with uploaded screenshot path
      status: "pending",
    },
    {
      id: 2,
      student: "Alice Smith",
      plan: "Premium",
      amount: "₹999",
      screenshot: "/sample-receipt.png",
      status: "pending",
    },
  ]);

  // Approve / Reject handler
  const handleAction = (id, action) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: action } : p))
    );
    alert(`Payment #${id} ${action} ✅`);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Manage Student Payments</h1>

      {payments.length === 0 ? (
        <p className="text-gray-500">No pending payments 🎉</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Student</th>
              <th className="border p-2 text-left">Plan</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Screenshot</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="text-sm">
                <td className="border p-2">{p.student}</td>
                <td className="border p-2">{p.plan}</td>
                <td className="border p-2">{p.amount}</td>
                <td className="border p-2">
                  <img
                    src={p.screenshot}
                    alt="screenshot"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border p-2 capitalize">{p.status}</td>
                <td className="border p-2 space-x-2">
                  {p.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(p.id, "approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(p.id, "rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded ${
                        p.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPayments;

import React, { useEffect, useState } from "react";
import { getOverdueReturned } from "../../services/overdueService";

export default function OverdueReturns() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOverdueReturned()
      .then((res) => {
        setData(res); // res should now be the array from res.data in the service
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading overdue returned books...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Overdue Returned Books</h1>
      {data.length === 0 ? (
        <p className="text-gray-600">No overdue returns available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-2xl">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 border-b">User Name</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Book Title</th>
                <th className="px-4 py-3 border-b">Borrow Date</th>
                <th className="px-4 py-3 border-b">Return Date</th>
                <th className="px-4 py-3 border-b">Overdue Days</th>
                <th className="px-4 py-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((b) => (
                <tr key={b.borrowId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{b.user?.name}</td>
                  <td className="px-4 py-3 border-b">{b.user?.email}</td>
                  <td className="px-4 py-3 border-b">{b.book?.title}</td>
                  <td className="px-4 py-3 border-b">
                    {new Date(b.borrowDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {new Date(b.returnDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {b.overdueDays || 0} days
                  </td>
                  <td
                    className={`px-4 py-3 border-b font-medium ${
                      b.overdueDays > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {b.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

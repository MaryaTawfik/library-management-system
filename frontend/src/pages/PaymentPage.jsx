import { useEffect, useState } from "react";
import {
  getPendingPayments,
  updatePaymentStatus,
} from "../services/adminservice";
import { Eye } from "lucide-react";

export default function PaymentPage() {
  const [payments, setPayments] = useState([]);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchPayments() {
      const res = await getPendingPayments();
      // Add a mock screenshot URL for demo
      const withScreenshots = res.map((p) => ({
        ...p,
        screenshot: "https://via.placeholder.com/400x200?text=Screenshot",
      }));
      setPayments(withScreenshots);
    }
    fetchPayments();
  }, []);

  const handleApprove = async (id) => {
    await updatePaymentStatus(id, "approved");
    setPayments(
      payments.map((p) => (p._id === id ? { ...p, status: "Approved" } : p))
    );
  };

  const handleReject = async (id) => {
    await updatePaymentStatus(id, "rejected");
    setPayments(
      payments.map((p) => (p._id === id ? { ...p, status: "Rejected" } : p))
    );
  };

  const handleViewScreenshot = (url) => {
    setScreenshotUrl(url);
    setShowModal(true);
  };

  return (
    <div className="p-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Payment Management</h1>

      {payments.length === 0 && <p>No payments yet</p>}

      {payments.map((p) => (
        <div
          key={p._id}
          className="flex justify-between items-center bg-white p-4 mb-3 rounded shadow dark:bg-gray-900"
        >
          <div>
            <p className="font-semibold">{p.userName}</p>
            <p>
              {p.duration} - ${p.amount}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            {/* Eye icon for viewing screenshot */}
            <button
              onClick={() => handleViewScreenshot(p.screenshot)}
              className="text-blue-500 hover:text-blue-700"
              title="View Screenshot"
            >
              <Eye size={20} />
            </button>

            {p.status === "Pending" && (
              <>
                <button
                  onClick={() => handleApprove(p._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(p._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </>
            )}

            {p.status !== "Pending" && (
              <span
                className={`px-3 py-1 rounded ${
                  p.status === "Approved"
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                {p.status}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg relative max-w-lg w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-700 font-bold"
            >
              X
            </button>
            <img
              src={screenshotUrl}
              alt="Payment Screenshot"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}

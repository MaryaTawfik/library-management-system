import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment } from "../services/borrowService"; // single endpoint
import { toast } from "react-toastify";

const PendingPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { planId, amount } = location.state || {};

  const [file, setFile] = useState(null);
  const [bankTransactionID, setReference] = useState("")

  const plans = {
    1: { name: "Basic", price: "300 birr / month" },
    2: { name: "Standard", price: "500 birr / 3 months" },
    3: { name: "Premium", price: "1000 birr / year" },
  };

  const selectedPlan = plans[planId] || { name: "Unknown", price: "N/A" };

  const handleSubmitPayment = async () => {
    if (!file) {
      toast.error("Please upload a screenshot first!");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || null);
if (!user) throw new Error("User not found");
await createPayment(user._id, bankTransactionID, amount, file);


      toast.success("Payment submitted successfully! ✅ Waiting for approval.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit payment.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Pending Payment</h1>

      <div className="border p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold">{selectedPlan.name}</h2>
        <p className="text-gray-600">{selectedPlan.price}</p>
      </div>

      <div>
        <label className="block mb-2 font-medium">Upload Payment Screenshot</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full border rounded-lg p-2 mb-4"
        />
      <input
  type="text"
  placeholder="Bank Transaction ID (optional)"
  value={bankTransactionID}
  onChange={(e) => setReference(e.target.value)}
  className="block w-full border rounded-lg p-2 mb-4"
/>

        <button
          onClick={handleSubmitPayment}
          className="w-full bg-[#FA7C54] text-white py-2 rounded-lg hover:bg-[#e66c45]"
        >
          Submit Payment
        </button>
      </div>
    </div>
  );
};

export default PendingPayment;

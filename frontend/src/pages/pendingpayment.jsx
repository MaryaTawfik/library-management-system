import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PendingPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get planId from navigation state (sent from PaymentPlans.jsx)
  const { planId } = location.state || {};

  // Mock plan data
  const plans = {
    1: { name: "Basic", price: "₹199 / month" },
    2: { name: "Standard", price: "₹399 / 3 months" },
    3: { name: "Premium", price: "₹999 / year" },
  };

  const selectedPlan = plans[planId] || { name: "Unknown", price: "N/A" };

  const handleUpload = () => {
    // In real app, send payment screenshot to backend here
    alert("Screenshot uploaded successfully! ✅ Waiting for approval.");
    navigate("/home");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Pending Payment</h1>

      <div className="border p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold">{selectedPlan.name}</h2>
        <p className="text-gray-600">{selectedPlan.price}</p>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Upload Payment Screenshot
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full border rounded-lg p-2 mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-[#FA7C54] text-white py-2 rounded-lg hover:bg-[#e66c45]"
        >
          Submit Payment Proof
        </button>
      </div>
    </div>
  );
};

export default PendingPayment;

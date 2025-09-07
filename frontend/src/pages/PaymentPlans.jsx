// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { createPayment } from "../services/borrowService"; // updated service
// import { toast } from "react-toastify";

const PaymentPlans = () => {
  const navigate = useNavigate();

  const plans = [
    { id: 1, name: "Basic", price: 300, display: "300 birr / month" },
    { id: 2, name: "Standard", price: 500, display: "500 birr / 3 months" },
    { id: 3, name: "Premium", price: 1000, display: "1000 birr / year" },
  ];

  const handleChoose = (plan) => {
    // navigate to pending payment page with plan info
    navigate("/pending-payment", { state: { planId: plan.id, amount: plan.price } });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 border rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-600 mt-2">{plan.display}</p>
            <button
              onClick={() => handleChoose(plan)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPlans;

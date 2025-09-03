import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentPlans = () => {
  const navigate = useNavigate();

  const plans = [
    { id: 1, name: "Basic", price: "₹199 / month" },
    { id: 2, name: "Standard", price: "₹399 / 3 months" },
    { id: 3, name: "Premium", price: "₹999 / year" },
  ];

  const handleChoose = (planId) => {
    // later you can send API request here
    navigate("/pending-payment", { state: { planId } });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 border rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-600 mt-2">{plan.price}</p>
            <button
              onClick={() => handleChoose(plan.id)}
              className="mt-4 bg-[#FA7C54] text-white px-4 py-2 rounded-lg hover:bg-[#e66c45]"
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

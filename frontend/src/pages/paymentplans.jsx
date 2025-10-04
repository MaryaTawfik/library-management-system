// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { createPayment } from "../services/borrowService"; // updated service
// import { toast } from "react-toastify";

const PaymentPlans = () => {
  const navigate = useNavigate();

  const plans = [
    { id: 1, name: "Basic", price: 300, display: "300 birr / months" },
    { id: 2, name: "Standard", price: 500, display: "500 birr / 3 months" },
    { id: 3, name: "Premium", price: 1000, display: "1000 birr / year" },
  ];

  const handleChoose = (plan) => {
    // navigate to pending payment page with plan info
    navigate("/pending-payment", { state: { planId: plan.id, amount: plan.price } });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8 font-[inter] dark:text-gray-300">
      <h1 className="text-2xl font-bold mb-2 flex items-center  ">Choose Your Plan</h1>
      <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">Select a plan that fits your needs</p>


      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 border-none rounded-xl shadow hover:shadow-lg transition bg-gray-100 dark:bg-gray-900 flex flex-col justify-between items-center"
          > <div className="flex flex-col items-center mb-4 dark:text-white">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-600 mt-2 dark:text-gray-300">{plan.display}</p>


          </div>
          
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300"> 
              {plan.id === 2 && <li> 16% discount</li>}
              {plan.id === 3 && <li> 33% discount</li>}
            </ul>
            <button
              onClick={() => handleChoose(plan)}
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-800 transition dark:bg-yellow-700"
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10 p-4 bg-gray-100 border-l-4 border-yellow-500 flex flex-col gap-2 justify-center items-center dark:bg-gray-800">
        <h1 className="text-xl font-bold mb-4 align-middle dark:text-white">Payment Instructions</h1>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Select a payment plan that suits your needs.</li>
          <li>Click on "Choose Plan" to proceed.</li>
          <li>Follow the prompts to complete your payment.</li>
          <li>Wait for confirmation of your payment(usually within a few hours).</li>
        </ol>
      </div>
    </div>
  );
};

export default PaymentPlans;

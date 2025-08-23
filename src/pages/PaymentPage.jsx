import React from "react";

const PaymentPage = () => {
  return (
    <div className="p-4">
      <p className="text-gray-700 mb-2">
        Here you can manage your payments and view transaction history.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-white shadow rounded">Payment Option 1</div>
        <div className="p-4 bg-white shadow rounded">Payment Option 2</div>
      </div>
    </div>
  );
};

export default PaymentPage;

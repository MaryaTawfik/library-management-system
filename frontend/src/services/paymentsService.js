import API from "./api";

const API_URL = "/payments";

// Get all payments
export const getAllPayments = async () => {
  try {
    const res = await API.get(API_URL);
    // Your backend returns { data: [...] }
    return res.data?.data || [];
  } catch (err) {
    console.error("Failed to fetch payments", err);
    return [];
  }
};

// Update payment status
export const updatePaymentStatus = async (id, status) => {
  try {
    const res = await API.put(`${API_URL}/${id}`, { status });
    return res.data;
  } catch (err) {
    console.error("Failed to update payment", err);
    throw err;
  }
};

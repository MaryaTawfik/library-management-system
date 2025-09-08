import API from "./api"; // your Axios instance

// Full API endpoint (relative to your baseURL)
const API_URL = "/returned/overdue";

export const getOverdueReturned = async () => {
  try {
    const res = await API.get("/returned/overdue");
    return res.data.data || []; // <-- important
  } catch (err) {
    console.error("borrowService.getOverdueReturned failed:", err.message);
    return [];
  }
};

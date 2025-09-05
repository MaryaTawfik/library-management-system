import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { getAllUsers, toggleUserBlock } from "../../services/usersService";
import { getAllBorrows } from "../../services/borrowService";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dropdownRefs = useRef({});

  const [borrowCounts, setBorrowCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // adjust how many users per page

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllUsers();
      const list = Array.isArray(res) ? res : res?.data || res?.users || [];
      setUsers(list);
    } catch (err) {
      setError("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadBorrowCounts = async () => {
    try {
      const res = await getAllBorrows();
      const list = Array.isArray(res) ? res : res?.data || [];

      const map = {};

      list.forEach((r) => {
        const uid = r?.user?.email; // use email as unique ID
        if (!uid) return;

        if (!map[uid]) {
          map[uid] = { total: 0, current: 0 };
        }

        map[uid].total += 1;

        // current means borrowed or overdue
        if (!r?.status || r.status === "borrowed" || r.status === "overdue") {
          map[uid].current += 1;
        }
      });

      setBorrowCounts(map);
      toast.success("Borrow records refreshed ✅");
    } catch (err) {
      console.warn("Failed to load borrow records", err.message || err);
      setBorrowCounts({});
      toast.error("Failed to load borrow records ❌");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUsers();
      await loadBorrowCounts();
    })();
  }, []);

  const handleToggle = async (user) => {
    if (!user?._id) return;

    try {
      setLoading(true);
      const block = user.status !== "blocked";
      const res = await toggleUserBlock(user._id, block);
      const updatedStatus = res.data?.status || (block ? "blocked" : "active");

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, status: updatedStatus } : u
        )
      );

      if (selectedUser?._id === user._id) {
        setSelectedUser((prev) => ({ ...prev, status: updatedStatus }));
      }
      setError(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Action failed");
    } finally {
      setLoading(false);
    }
  };

  const normalizeUser = (raw) => {
    const src = raw?.user || raw || {};
    const _id = src._id || src.id || raw?._id || raw?.id || null;
    const firstName = src.firstName || src.first_name || src.first || null;
    const lastName = src.lastName || src.last_name || src.last || null;
    const name =
      src.name ||
      (firstName || lastName
        ? `${firstName || ""} ${lastName || ""}`.trim()
        : null);
    const email = src.email || raw?.email || "";
    const profileImage =
      src.profileImage || src.avatar || src.profile_image || null;
    const isMember =
      typeof src.is_member === "boolean"
        ? src.is_member
        : src?.membership?.status === "active";
    const membershipStatus = isMember
      ? "active"
      : src?.membership?.status || "inactive";
    const membershipExpires =
      src.expiryDate || src?.membership?.expires || null;
    const joinDate = src.createdAt || src.joinDate || null;
    const borrowings = src.borrowings || [];

    const borrowTotal = borrowings.length;
    const borrowCurrent = borrowings.filter(
      (b) => b.status === "borrowed"
    ).length;

    const status = src.status || raw?.status || "-";

    return {
      _id,
      name,
      email,
      profileImage,
      isMember,
      membershipStatus,
      membershipExpires,
      joinDate,
      borrowTotal,
      borrowCurrent,
      status,
      raw: raw,
    };
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openMenuId &&
        dropdownRefs.current[openMenuId] &&
        !dropdownRefs.current[openMenuId].contains(e.target)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredUsers = users.filter((user) => {
    const name = (user?.name || user?.firstName || "").toString();
    const email = (user?.email || "").toString();
    const status = (user?.status || "").toString();

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all"
        ? true
        : status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className=" bg-white min-h-screen rounded-2xl">
      <div className="mb-6">
        <h1 className="text-3xl text-yellow-700 font-bold">Manage Users</h1>
        <p className="text-gray-800">View and manage all library users</p>
      </div>

      {loading && <div className="text-gray-600 mb-4">Loading users...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Search + Filter */}
      <div className="flex flex-row items-center gap-4 border-2 border-gray-100 shadow-2xl rounded mb-6 bg-white px-4 py-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
          className="flex-grow outline-none"
        />
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1); // reset to first page on filter
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white overflow-x-auto rounded shadow">
        <table className="w-full text-sm bg-white">
          <thead className="bg-white text-black">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Membership</th>
              <th className="px-4 py-3 text-left">Join Date</th>
              <th className="px-4 py-3 text-left">Borrowings</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((userRaw, idx) => {
              const u = normalizeUser(userRaw);
              const rowKey = u._id || idx;
              const membershipStatus = u.membershipStatus || "-";
              const membershipExpires = u.membershipExpires || null;
              const joinDate = u.joinDate || "-";
              const statusText = u.status || "-";

              return (
                <tr
                  key={rowKey}
                  className="border-2 border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{u.name || "-"}</div>
                    <div className="text-gray-500">{u.email || "-"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        (membershipStatus || "").toString().toLowerCase() ===
                        "active"
                          ? "bg-green-100 text-teal-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {membershipStatus}
                    </span>
                    {membershipExpires && (
                      <div className="text-xs text-gray-500 mt-1">
                        Expires: {membershipExpires}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {joinDate ? new Date(joinDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div>Total: {u.borrowTotal}</div>
                    <div className="text-gray-500">
                      Current: {u.borrowCurrent}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        (statusText || "").toString().toLowerCase() === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {statusText}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 relative"
                    ref={(el) => (dropdownRefs.current[rowKey] = el)}
                  >
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === rowKey ? null : rowKey)
                      }
                      className="p-1"
                    >
                      <BsThreeDotsVertical className="text-gray-600 hover:text-black" />
                    </button>
                    {openMenuId === rowKey && (
                      <div className="absolute right-2 top-10 w-36 bg-white border rounded shadow-md z-20">
                        <button
                          onClick={() => {
                            setSelectedUser(userRaw);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => handleToggle(u)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {u.status === "blocked"
                            ? "Unblock User"
                            : "Block User"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <AiOutlineClose size={24} />
            </button>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={
                  selectedUser?.profileImage ||
                  selectedUser?.avatar ||
                  "https://i.pravatar.cc/100?u=anon"
                }
                alt={selectedUser?.name || selectedUser?.firstName || "User"}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedUser?.name || selectedUser?.firstName || "-"}
                </h2>
                <p className="text-gray-500">{selectedUser?.email || "-"}</p>
              </div>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Status:</strong>{" "}
                {(selectedUser?.status || "-")
                  .toString()
                  .charAt(0)
                  .toUpperCase() +
                  (selectedUser?.status || "").toString().slice(1)}
              </p>
              <p>
                <strong>Membership:</strong>{" "}
                {selectedUser?.is_member ? "yes" : "no"}
                {selectedUser?.expiryDate &&
                  `, expires ${selectedUser.expiryDate}`}
              </p>
              <p>
                <strong>Join Date:</strong>{" "}
                {selectedUser?.createdAt
                  ? new Date(selectedUser.createdAt).toLocaleDateString()
                  : "-"}
              </p>
              <p>
                <strong>Total Borrowings:</strong>{" "}
                {selectedUser?.borrowings?.length ?? 0}
              </p>
              <p>
                <strong>Current Borrowings:</strong>{" "}
                {selectedUser?.borrowings?.filter(
                  (b) => b.status === "borrowed"
                ).length ?? 0}
              </p>

              <p>
                <strong>Current Borrowings:</strong>{" "}
                {borrowCounts[selectedUser?._id]
                  ? borrowCounts[selectedUser._id].current
                  : selectedUser?.borrowings?.current ??
                    selectedUser?.currentBorrowings ??
                    "-"}
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleToggle(selectedUser);
                  setSelectedUser(null); // optional: close modal immediately
                }}
                className={`flex-start justify-between px-4 py-2 text-white rounded ${
                  selectedUser?.status?.toLowerCase() === "active"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-teal-700"
                }`}
              >
                {selectedUser?.status?.toLowerCase() === "active"
                  ? "Block"
                  : "Unblock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

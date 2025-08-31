import React from "react";
import { 
  FaBook, 
  FaCalendar, 
  FaMailBulk, 
  FaUser, 
  FaRegUser, 
  FaBusinessTime 
} from "react-icons/fa";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col items-center py-10 px-4 font-[Roboto] bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-1 text-yellow-900">My Profile</h1>
      <p className="text-gray-500 mb-8">Manage your personal information</p>

      {/* Personal Information Card */}
      {user ? (
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8 hover:shadow-md transition">
          <div className="flex justify-between items-center mb-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
              <FaUser className="text-[#B8860B]" /> Personal Information
            </h2>
            <button className="bg-yellow-700 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <p><span className="font-medium">Full Name:</span> {user.firstName} {user.lastName}</p>
            <p><span className="font-medium">Email Address:</span> {user.email}</p>
            <p><span className="font-medium">Phone Number:</span> {user.phoneNumber || "Not provided"}</p>
            <p><span className="font-medium">Address:</span> {user.address || "Not provided"}</p>
            <p>
  <span className="font-medium">Membership:</span>{" "}
  {user.is_member ? "Active Member ✅" : "Not a Member ❌"}
</p>

          </div>
        </div>
      ) : (
        <p className="text-gray-600">Please log in to view your profile.</p>
      )}

      {/* Account Status Card */}
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-sm p-8 hover:shadow-md transition">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-6 text-gray-800">
          <FaBusinessTime className="text-[#B8860B]" /> Account Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          {/* Account Type */}
          <div className="flex items-center gap-3">
            <FaRegUser className="text-[#B8860B] text-lg" />
            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <span className="px-2 py-1 text-sm bg-gray-100 text-yellow-800 font-medium rounded-md">
                Premium Member
              </span>
            </div>
          </div>

          {/* Books Borrowed */}
          <div className="flex items-center gap-3">
            <FaBook className="text-[#B8860B] text-lg" />
            <div>
              <p className="text-sm text-gray-500">Books Borrowed</p>
              <span className="font-medium">0 books</span>
            </div>
          </div>

          {/* Membership Expires */}
          <div className="flex items-center gap-3">
            <FaCalendar className="text-[#B8860B] text-lg" />
            <div>
              <p className="text-sm text-gray-500">Membership Expires</p>
              <span className="font-medium">9/25/2025</span>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-center gap-3">
            <FaMailBulk className="text-[#B8860B] text-lg" />
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <span className="font-medium">8/26/2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

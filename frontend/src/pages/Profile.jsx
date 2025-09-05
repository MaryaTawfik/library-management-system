// src/pages/Profile.jsx
import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtom";
import { updateUserProfile } from "../services/borrowService";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useAtom(userAtom); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [file, setFile] = useState(null); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFile(files[0]); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("firstName", formData.firstName || "");
      data.append("lastName", formData.lastName || "");
      data.append("email", formData.email || "");
      data.append("phoneNumber", formData.phoneNumber || "");
      if (file) {
        data.append("profileImage", file); // Only append if a new file is selected
      }

      const updatedUser = await updateUserProfile(data);

      setUser(updatedUser);
      setFormData(updatedUser);  
      console.log("Updated user:", updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setFile(null); 
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  if (!user) {
    return <p className="text-gray-600">Please log in to view your profile.</p>;
  }

  return (
    <div className="flex flex-col items-center py-10 px-4 font-[Roboto] bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-1 text-yellow-900">My Profile</h1>
      <p className="text-gray-500 mb-8">Manage your personal information</p>

      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-8 hover:shadow-md transition">
        <div className="flex justify-between items-center mb-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-black">
            Personal Information
          </h2>
          {!isEditing && (
            <button
              className="bg-yellow-700 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-yellow-800 transition"
              onClick={() => {
                setFormData(user);
                setIsEditing(true);
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <p>
              <span className="font-medium">Full Name:</span> {user.firstName}{" "}
              {user.lastName}
            </p>
            <p>
              <span className="font-medium">Email Address:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Phone Number:</span>{" "}
              {user.phoneNumber || "Not provided"}
            </p>
            <div>
              <span className="font-medium">Profile Picture:</span>
              <div className="mt-2">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <p>Not provided</p>
                )}
              </div>
              <p>
                <span className="font-medium">Member Status:</span> {user.is_member ? "Active ✅" : "Inactive ❌"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <input
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              className="border p-2 rounded-md"
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              className="border p-2 rounded-md"
              placeholder="Last Name"
            />
            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="border p-2 rounded-md"
              placeholder="Email"
            />
            <input
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              className="border p-2 rounded-md"
              placeholder="Phone Number"
            />
            <input
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            <input
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              className="border p-2 rounded-md"
              placeholder="New Password (optional)"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="border p-2 rounded-md"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

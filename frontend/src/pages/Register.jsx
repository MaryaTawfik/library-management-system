import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import LogoTitle from "../components/LogoTitle";
import bgImage from "../assets/librarypic.jpg";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div
        className="relative w-full max-w-lg p-6 rounded-xl shadow-lg 
                      bg-white/5 border border-white/20 backdrop-blur-lg text-white"
      >
        {/* Logo */}
        <LogoTitle />

        <p className="text-center text-gray-200 mb-1">Registration</p>
        <p className="text-center text-xs text-gray-300 mb-6">
          For Both Staff & Students
        </p>

        <form className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-300"
          />
          <input
            type="email"
            placeholder="username@collegename.ac.in"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-300"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white placeholder-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white placeholder-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-300"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <input
            type="text"
            placeholder="Department"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-300"
          />
          <input
            type="number"
            placeholder="Phone Number"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-300"
          />
          <input
            type="text"
            placeholder="Student ID"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-300"
          />
          <input
            type="text"
            placeholder="Academic Year"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-300"
          />

          {/* Gender */}
          <select className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-gray-200">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {/* Role */}
          <select className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-gray-200">
            <option value="">Select Role</option>
            <option>Student</option>
            <option>Staff</option>
          </select>

          {/* Register Button */}
          <button className="w-full bg-[#FA7C54] text-white py-2 rounded hover:bg-[#e66c45] transition">
            Register
          </button>
        </form>

        {/* Footer Links */}
        {/* Footer Links */}
        {/* Footer Links */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-200">
          <p className="text-gray-100">
            Already a User?{" "}
            <Link
              to="/login"
              className="text-[#FA7C54] underline font-semibold"
            >
              Login Now
            </Link>
          </p>
          <Link to="/guest" className="text-white  font-semibold">
            Use as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}

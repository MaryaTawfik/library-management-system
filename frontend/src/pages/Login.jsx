import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LogoTitle from "../components/LogoTitle";
import bgImage from "../assets/librarypic.jpg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div
        className="relative w-[480px] p-8 rounded-xl shadow-lg 
                   bg-white/5 border border-white/20 backdrop-blur-lg text-white"
      >
        {/* Logo */}
        <LogoTitle />

        <p className="text-center text-gray-200 mt-2">Welcome Back!</p>
        <p className="text-center text-xs text-gray-300 mb-6">
          Sign in to continue to your Digital Library
        </p>

        {/* Email */}
        <label className="block text-sm text-gray-300 mb-1">Email</label>
        <input
          type="email"
          placeholder="username@collegename.ac.in"
          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 mb-3 text-white placeholder-gray-300"
        />

        {/* Password */}
        <label className="block text-sm text-gray-300 mb-1">Password</label>
        <div className="relative mb-4">
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

        {/* Remember & Forgot */}
        <div className="flex justify-between items-center mb-6 text-sm text-gray-200">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#FA7C54]" />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-[#FA7C54] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button className="w-full bg-[#FA7C54] text-white py-2 rounded-lg hover:bg-[#e66c45] transition">
          Login
        </button>

        {/* Footer Links */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <p className="text-gray-200">
            New User?{" "}
            <Link
              to="/register"
              className="text-[#FA7C54] underline font-semibold"
            >
              Register Here
            </Link>
          </p>
          <Link to="/guest" className="text-gray-200 hover:underline">
            Use as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}

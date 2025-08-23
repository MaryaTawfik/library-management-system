import { Link } from "react-router-dom";
import bgImage from "../assets/librarypic.jpg"; // same background image

export default function ForgotPassword() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div
        className="relative w-[450px] p-8 rounded-xl shadow-lg 
                    bg-white/10 border border-white/20 backdrop-blur-md text-white"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">Forgot Password</h1>
        <p className="text-xs text-gray-300 text-center mb-6">
          Enter your email to reset your password
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="username@collegename.ac.in"
          className="w-full bg-white/20 border border-white/30 rounded px-3 py-2 mb-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FA7C54]"
        />

        {/* Reset Button */}
        <button className="w-full bg-[#FA7C54] text-white py-2 rounded hover:bg-[#e66c45] transition">
          Send Reset Link
        </button>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-200 mt-4">
          <Link to="/login" className="text-[#FA7C54] font-semibold">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

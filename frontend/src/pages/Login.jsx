import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "../atoms/authAtom";
import LogoTitle from "../components/LogoTitle";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [trialDropdown, setTrialDropdown] = useState(false);

  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://library-management-system-1-mrua.onrender.com/auth/login",
        formData
      );

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);

      if (user.role === "admin") navigate("/admin-dashboard");
      else navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      const message =
        (err.response && err.response.data
          ? JSON.stringify(err.response.data)
          : err.message) || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative bg-light dark:bg-dark px-4">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 sm:p-8 md:p-10 rounded-xl shadow-lg bg-white/5 border border-white/20 backdrop-blur-lg text-white">
        <LogoTitle />

        <p className="text-center text-gray-200 mt-2 text-sm sm:text-base">Welcome Back!</p>
        <p className="text-center text-xs sm:text-sm text-gray-300 mb-6">
          Sign in to continue to your Digital Library
        </p>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="username@collegename.ac.in"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 mb-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          {/* Password */}
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end mb-6 text-sm text-gray-200">
            <Link to="/forgot-password" className="text-white hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full bg-yellow-700 text-white py-2 rounded-lg hover:bg-yellow-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Bottom links & Trial Dropdown */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm">
          <p className="text-gray-200 mb-2 sm:mb-0">
            New User?{" "}
            <Link to="/register" className="text-white underline font-semibold">
              Register Here
            </Link>
          </p>

          <div className="relative w-full sm:w-auto">
            {/* Main Trial Button */}
            <button
              className="w-full sm:w-auto text-white mb-2 sm:mb-0 text-center px-4 py-2 rounded hover:bg-yellow-600 bg-yellow-700 transition"
              onClick={() => setTrialDropdown(!trialDropdown)}
            >
              Log in as Trial
            </button>

            {/* Dropdown with User/Admin Buttons */}
            {trialDropdown && (
              <div className="absolute  bg-white/5  bottom-full mb-2  left-0 mt-2  border-none border-white/20 rounded shadow-lg w-full sm:w-38 text-white z-50">
                <button
                  className="w-full px-4 py-2 hover:bg-yellow-600 text-left rounded-t"
                  onClick={() => {
                    setFormData({ email: "test@gmail.com", password: "qwerty@13" });
                    setTrialDropdown(false);
                  }}
                >
                  User
                </button>
                <button
                  className="w-full px-4 py-2 hover:bg-yellow-600 text-left rounded-b"
                  onClick={() => {
                    setFormData({ email: "admin@example.com", password: "admin123" });
                    setTrialDropdown(false);
                  }}
                >
                  Admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "../atoms/authAtom"; // Jotai atoms
import LogoTitle from "../components/LogoTitle";
import bgImage from "../assets/loginbg.jpg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Jotai atoms for global state
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [loading, setLoading] = useState(false); 
  

  // Update form data dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset error
    setLoading(true); // start loading

    try {
      const res = await axios.post(
        "https://library-management-system-1-mrua.onrender.com/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, user } = res.data;

      // ✅ Save token & user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Update Jotai atoms
      setToken(token);
      setUser(user);

      // ✅ Redirect based on role
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/"); // regular user homepage
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);

  const message =
    (err.response && err.response.data
      ? JSON.stringify(err.response.data)
      : err.message) || "Login failed";

  setError(message);
      
     
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative w-[480px] p-8 rounded-xl shadow-lg bg-white/5 border border-white/20 backdrop-blur-lg text-white">
        <LogoTitle />

        <p className="text-center text-gray-200 mt-2">Welcome Back!</p>
        <p className="text-center text-xs text-gray-300 mb-6">
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
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 mb-3 text-white placeholder-gray-300"
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
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white placeholder-gray-300"
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

          {/* Remember me & Forgot password */}
          <div className="flex justify-between items-center mb-6 text-sm text-gray-200">
            
            <Link
              to="/forgot-password"
              className="text-white hover:underline"
            >
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

        {/* Bottom links */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <p className="text-gray-200">
            New User?{" "}
            <Link
              to="/register"
              className="text-white underline font-semibold"
            >
              Register Here
            </Link>
          </p>
          
        </div>
      </div>
    </div>
  );
}

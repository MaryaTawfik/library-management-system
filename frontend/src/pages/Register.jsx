import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LogoTitle from "../components/LogoTitle";
import bgImage from "../assets/loginbg.jpg";
import { toast } from "react-toastify"; 
import { otpEmailAtom } from "../atoms/otpAtom";
import { useAtom } from "jotai";


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const setOtpEmail = useAtom(otpEmailAtom);



  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    phoneNumber: "",
    userID: "",
    acadamicYear: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  console.log("Sending registration data:", form);


  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // start loading

    
    if (form.password !== form.confirmPassword) {
      setLoading(false); // stop loading
      return setError("Passwords do not match");
    }

    try {
      const res = await fetch("https://library-management-system-1-mrua.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Server response:", data); 
      if (!res.ok) {
  if (data.errors) {
    throw new Error(data.errors[0].msg || "Registration failed");
  }
  throw new Error(data.message || "Registration failed");
}

      toast.success("✅ Registered successfully! Please login.");
        setLoading(false); // stop loading
        setOtpEmail(form.email); // ✅ store email
        navigate("/otp");

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative w-full max-w-lg p-6 rounded-xl shadow-lg bg-white/5 border border-white/20 backdrop-blur-lg text-white">
        <LogoTitle />

        <p className="text-center text-gray-200 mb-1">Registration</p>
        <p className="text-center text-xs text-gray-300 mb-6">
          For Students
        </p>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <form className="space-y-3" onSubmit={handleRegister}>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="username@collegename.ac.in"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
          />

          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative">
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white"
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
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
          />
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            type="number"
            placeholder="Phone Number"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
          />
          <input
            name="userID"
            value={form.userID}
            onChange={handleChange}
            placeholder="Student ID"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
          />
          <input
            name="acadamicYear"
            value={form.acadamicYear}
            onChange={handleChange}
            placeholder="Academic Year"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-gray-200"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button
  disabled={loading}
  type="submit"
  className={`w-full py-2 rounded transition 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-700 hover:bg-yellow-600 text-white"}`}
>
  {loading ? "Registering..." : "Register"}
</button>

        </form>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-200">
          <p className="text-gray-100">
            Already a User?{" "}
            <Link
              to="/login"
              className="text-white underline font-semibold"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
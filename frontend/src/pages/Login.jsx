// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import axios from "axios";
// import { useAtom } from "jotai";
// import { userAtom, tokenAtom } from "../atoms/authAtom";
// import LogoTitle from "../components/LogoTitle";
// import bgImage from "../assets/librarypic.jpg";

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // jotai atoms
//   const [, setUser] = useAtom(userAtom);
//   const [, setToken] = useAtom(tokenAtom);

//   // handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/auth/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       // Save token & user to localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // Save to jotai
//       setToken(res.data.token);
//       setUser(res.data.user);

//       // ✅ Role-based redirect (robust)
//       const role = res.data.user?.role?.toLowerCase();
//       if (role === "admin") navigate("/admin-dashboard");
//       else if (role === "student") navigate("/payment");
//       else navigate("/home");
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.response?.data?.error || "Login failed. Try again.");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       {/* overlay */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       <div className="relative w-[480px] p-8 rounded-xl shadow-lg bg-white/5 border border-white/20 backdrop-blur-lg text-white">
//         <LogoTitle />
//         <p className="text-center text-gray-200 mt-2">Welcome Back!</p>
//         <p className="text-center text-xs text-gray-300 mb-6">
//           Sign in to continue to your Digital Library
//         </p>

//         {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

//         <form onSubmit={handleLogin}>
//           {/* email */}
//           <label className="block text-sm text-gray-300 mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="username@collegename.ac.in"
//             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 mb-3 text-white placeholder-gray-300"
//             required
//             autoComplete="email"
//           />

//           {/* password */}
//           <label className="block text-sm text-gray-300 mb-1">Password</label>
//           <div className="relative mb-4">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white placeholder-gray-300"
//               required
//               autoComplete="current-password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2.5 text-gray-300"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {/* remember + forgot */}
//           <div className="flex justify-between items-center mb-6 text-sm text-gray-200">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" className="accent-[#FA7C54]" />
//               Remember me
//             </label>
//             <Link
//               to="/forgot-password"
//               className="text-[#FA7C54] hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {/* login button */}
//           <button
//             type="submit"
//             className="w-full bg-[#FA7C54] text-white py-2 rounded-lg hover:bg-[#e66c45] transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* footer */}
//         <div className="flex justify-between items-center mt-6 text-sm">
//           <p className="text-gray-200">
//             New User?{" "}
//             <Link
//               to="/register"
//               className="text-[#FA7C54] underline font-semibold"
//             >
//               Register Here
//             </Link>
//           </p>
//           <Link to="/guest" className="text-gray-200 hover:underline">
//             Use as Guest
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "../atoms/authAtom";
import LogoTitle from "../components/LogoTitle";
import bgImage from "../assets/librarypic.jpg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // jotai atoms
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Save token & user to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Save to jotai
      setToken(res.data.token);
      setUser(res.data.user);

      // ✅ Role-based redirect
      const role = res.data.user?.role?.toLowerCase();
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "student") {
        navigate("/payment-plans"); // student first goes to choose a plan
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative w-[480px] p-8 rounded-xl shadow-lg bg-white/5 border border-white/20 backdrop-blur-lg text-white">
        <LogoTitle />
        <p className="text-center text-gray-200 mt-2">Welcome Back!</p>
        <p className="text-center text-xs text-gray-300 mb-6">
          Sign in to continue to your Digital Library
        </p>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* email */}
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="username@collegename.ac.in"
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 mb-3 text-white placeholder-gray-300"
            required
            autoComplete="email"
          />

          {/* password */}
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
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* remember + forgot */}
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

          {/* login button */}
          <button
            type="submit"
            className="w-full bg-[#FA7C54] text-white py-2 rounded-lg hover:bg-[#e66c45] transition"
          >
            Login
          </button>
        </form>

        {/* footer */}
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

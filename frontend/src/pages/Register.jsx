// // import { useState } from "react";
// // import { Eye, EyeOff } from "lucide-react";
// // import { Link, useNavigate } from "react-router-dom";
// // import LogoTitle from "../components/LogoTitle";
// // import bgImage from "../assets/librarypic.jpg";

// // export default function Register() {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //   // Form state
// //   const [form, setForm] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     department: "",
// //     phoneNumber: "",
// //     userID: "",
// //     acadamicYear: "",
// //     gender: "",
// //   });

// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   // Handle input change
// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   // Handle submit
// //   const handleRegister = async (e) => {
// //     e.preventDefault();

// //     if (form.password !== form.confirmPassword) {
// //       return setError("Passwords do not match");
// //     }

// //     try {
// //       const res = await fetch("http://localhost:5000/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) {
// //         throw new Error(data.message || "Registration failed");
// //       }

// //       alert("✅ Registered successfully! Now login.");
// //       navigate("/login");
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   return (
// //     <div
// //       className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-12"
// //       style={{ backgroundImage: `url(${bgImage})` }}
// //     >
// //       {/* Overlay */}
// //       <div className="absolute inset-0 bg-black/60"></div>

// //       {/* Card */}
// //       <div
// //         className="relative w-full max-w-lg p-6 rounded-xl shadow-lg
// //                       bg-white/5 border border-white/20 backdrop-blur-lg text-white"
// //       >
// //         <LogoTitle />

// //         <p className="text-center text-gray-200 mb-1">Registration</p>
// //         <p className="text-center text-xs text-gray-300 mb-6">
// //           For Both Staff & Students
// //         </p>

// //         {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

// //         <form className="space-y-3" onSubmit={handleRegister}>
// //           <input
// //             name="firstName"
// //             value={form.firstName}
// //             onChange={handleChange}
// //             type="text"
// //             placeholder="First Name"
// //             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
// //           />
// //           <input
// //             name="lastName"
// //             value={form.lastName}
// //             onChange={handleChange}
// //             type="text"
// //             placeholder="Last Name"
// //             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
// //           />
// //           <input
// //             name="email"
// //             value={form.email}
// //             onChange={handleChange}
// //             type="email"
// //             placeholder="username@collegename.ac.in"
// //             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
// //           />

// //           {/* Password */}
// //           <div className="relative">
// //             <input
// //               name="password"
// //               value={form.password}
// //               onChange={handleChange}
// //               type={showPassword ? "text" : "password"}
// //               placeholder="Password"
// //               className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white"
// //             />
// //             <button
// //               type="button"
// //               onClick={() => setShowPassword(!showPassword)}
// //               className="absolute right-3 top-2.5 text-gray-300"
// //             >
// //               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //             </button>
// //           </div>

// //           {/* Confirm Password */}
// //           <div className="relative">
// //             <input
// //               name="confirmPassword"
// //               value={form.confirmPassword}
// //               onChange={handleChange}
// //               type={showConfirmPassword ? "text" : "password"}
// //               placeholder="Confirm Password"
// //               className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white"
// //             />
// //             <button
// //               type="button"
// //               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //               className="absolute right-3 top-2.5 text-gray-300"
// //             >
// //               {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //             </button>
// //           </div>

// //           <input
// //             name="department"
// //             value={form.department}
// //             onChange={handleChange}
// //             type="text"
// //             placeholder="Department"
// //             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
// //           />
// //           <input
// //             name="phoneNumber"
// //             value={form.phoneNumber}
// //             onChange={handleChange}
// //             type="number"
// //             placeholder="Phone Number"
// //             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
// //           />
// //           <input
// //             name="userID"
// //             value={form.userID}
// //             onChange={handleChange}
// //             type="text"
// //             placeholder="Student ID"
// //             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
// //           />
// //           <input
// //             name="acadamicYear"
// //             value={form.acadamicYear}
// //             onChange={handleChange}
// //             type="text"
// //             placeholder="Academic Year"
// //             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
// //           />

// //           {/* Gender */}
// //           <select
// //             name="gender"
// //             value={form.gender}
// //             onChange={handleChange}
// //             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-gray-200"
// //           >
// //             <option value="">Select Gender</option>
// //             <option value="male">Male</option>
// //             <option value="female">Female</option>
// //           </select>

// //           {/* Register Button */}
// //           <button
// //             type="submit"
// //             className="w-full bg-[#FA7C54] text-white py-2 rounded hover:bg-[#e66c45] transition"
// //           >
// //             Register
// //           </button>
// //         </form>

// //         <div className="flex justify-between items-center mt-4 text-sm text-gray-200">
// //           <p className="text-gray-100">
// //             Already a User?{" "}
// //             <Link
// //               to="/login"
// //               className="text-[#FA7C54] underline font-semibold"
// //             >
// //               Login Now
// //             </Link>
// //           </p>
// //           <Link to="/guest" className="text-white font-semibold">
// //             Use as Guest
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import LogoTitle from "../components/LogoTitle";
// import bgImage from "../assets/librarypic.jpg";

// export default function Register() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     department: "",
//     phoneNumber: "",
//     userID: "",
//     acadamicYear: "",
//     gender: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (form.password !== form.confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     try {
//       const res = await fetch(
//         "https://library-management-system-1-mrua.onrender.com/auth/register",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(form),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Registration failed");

//       alert("✅ Registered successfully! Please login.");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-12"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="absolute inset-0 bg-black/60"></div>
//       <div className="relative w-full max-w-lg p-6 rounded-xl shadow-lg bg-white/5 border border-white/20 backdrop-blur-lg text-white">
//         <LogoTitle />

//         <p className="text-center text-gray-200 mb-1">Registration</p>
//         <p className="text-center text-xs text-gray-300 mb-6">
//           For Both Staff & Students
//         </p>

//         {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

//         <form className="space-y-3" onSubmit={handleRegister}>
//           <input
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
//           />
//           <input
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
//           />
//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             type="email"
//             placeholder="username@collegename.ac.in"
//             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
//           />

//           <div className="relative">
//             <input
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2.5 text-gray-300"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           <div className="relative">
//             <input
//               name="confirmPassword"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 pr-10 text-white"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-2.5 text-gray-300"
//             >
//               {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           <input
//             name="department"
//             value={form.department}
//             onChange={handleChange}
//             placeholder="Department"
//             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
//           />
//           <input
//             name="phoneNumber"
//             value={form.phoneNumber}
//             onChange={handleChange}
//             type="number"
//             placeholder="Phone Number"
//             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
//           />
//           <input
//             name="userID"
//             value={form.userID}
//             onChange={handleChange}
//             placeholder="Student ID"
//             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
//           />
//           <input
//             name="acadamicYear"
//             value={form.acadamicYear}
//             onChange={handleChange}
//             placeholder="Academic Year"
//             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
//           />

//           <select
//             name="gender"
//             value={form.gender}
//             onChange={handleChange}
//             className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-gray-200"
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>

//           <button
//             type="submit"
//             className="w-full bg-[#FA7C54] text-white py-2 rounded hover:bg-[#e66c45] transition"
//           >
//             Register
//           </button>
//         </form>

//         <div className="flex justify-between items-center mt-4 text-sm text-gray-200">
//           <p className="text-gray-100">
//             Already a User?{" "}
//             <Link
//               to="/login"
//               className="text-[#FA7C54] underline font-semibold"
//             >
//               Login Now
//             </Link>
//           </p>
//           <Link to="/guest" className="text-white font-semibold">
//             Use as Guest
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,

      const res = await fetch("https://library-management-system-1-mrua.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
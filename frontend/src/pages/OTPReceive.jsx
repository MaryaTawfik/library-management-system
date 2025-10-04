import { useAtom } from "jotai";
import { otpEmailAtom } from "../atoms/otpAtom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OTPReceive({ resendCooldown = 30 }) {
  const [identifier, setIdentifier] = useAtom(otpEmailAtom); // email state
  const [otp, setOtp] = useState("");

  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [resendCooldownTimer, setResendCooldownTimer] = useState(0);

  const navigate = useNavigate();

  // Countdown for resend button
  useEffect(() => {
    let timer;
    if (resendCooldownTimer > 0) {
      timer = setInterval(() => setResendCooldownTimer((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldownTimer]);

  // Email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = identifier?.trim();
    const trimmedOtp = otp?.trim();

    if (!trimmedEmail) return toast.error("Please enter your email");
    if (!isValidEmail(trimmedEmail)) return toast.error("Invalid email format");
    if (!trimmedOtp) return toast.error("Please enter OTP");

    setLoadingVerify(true);
    try {
      await axios.post(
        "https://library-management-system-1-mrua.onrender.com/auth/verify-otp",
        { email: trimmedEmail, otp: trimmedOtp }
      );
      toast.success("✅ OTP Verified!");
      setTimeout(() => navigate("/login"), 1500); // redirect after 1.5s
    } catch (err) {
      console.error("OTP Verify Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoadingVerify(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (resendCooldownTimer > 0) return;

    const trimmedEmail = identifier?.trim();
    if (!trimmedEmail) return toast.error("Please enter your email first");
    if (!isValidEmail(trimmedEmail)) return toast.error("Invalid email format");

    setLoadingResend(true);
    try {
      console.log("Resending OTP to:", trimmedEmail); // debug
      await axios.post(
        "https://library-management-system-1-mrua.onrender.com/auth/resend-otp",
        { email: trimmedEmail }
      );
      toast.success("✅ OTP sent again!");
      setResendCooldownTimer(resendCooldown);
    } catch (err) {
      console.error("Resend OTP Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white border border-gray-200 dark:bg-white/10 dark:border-white/20 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Verify Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <input
            type="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your email"
            autoFocus={!identifier}
            className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-white/10 
              border-gray-300 dark:border-white/20 text-gray-900 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none 
              focus:ring-2 focus:ring-yellow-500"
          />

          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Enter the OTP sent to{" "}
            <span className="font-medium">{identifier || "your email"}</span>
          </p>

          {/* OTP input */}
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-white/10 
              border-gray-300 dark:border-white/20 text-gray-900 dark:text-white 
              placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none 
              focus:ring-2 focus:ring-yellow-500"
          />

          {/* Verify OTP button */}
          <button
            type="submit"
            disabled={loadingVerify}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loadingVerify
                ? "dark:bg-yellow-800 cursor-not-allowed"
                : "dark:bg-yellow-900 bg-yellow-600 hover:bg-yellow-500 text-white"
            }`}
          >
            {loadingVerify ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-4 flex justify-between items-center text-sm">
          <button
            type="button"
            onClick={handleResend}
            disabled={loadingResend || resendCooldownTimer > 0}
            className="text-yellow-600 hover:underline disabled:opacity-40"
          >
            {loadingResend ? "Sending..." : "Resend OTP"}
          </button>
          {resendCooldownTimer > 0 && (
            <span className="text-gray-500 dark:text-gray-400">
              ({resendCooldownTimer}s)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

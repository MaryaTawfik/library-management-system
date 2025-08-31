import { useSetAtom } from "jotai";
import { userAtom } from "../atoms/authAtom";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await login(credentials);

      if (res.status === "success") {
        const userData = res.user; // adjust depending on backend

        // Save in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Update Jotai atom
        setUser(userData);

        // Navigate to home or dashboard
        if (userData.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" required placeholder="Email" />
      <input type="password" name="password" required placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

import { useNavigate } from "react-router-dom";
import bgImage from "../assets/librarypic.jpg";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center relative cursor-pointer"
      style={{ backgroundImage: `url(${bgImage})` }}
      onClick={() => navigate("/login")}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Title */}
      <h1 className="relative text-5xl font-light text-white drop-shadow-lg">
        My <span className="text-[#FA7C54] font-semibold">Book</span> Shelf
      </h1>
    </div>
  );
}

import logo from "../assets/jemealogo.jpg";
export default function LogoTitle() {
  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="Jemea Logo" className="w-30 mb-2 rounded-full" />
      {/* <h1 className="text-3xl text-center mb-6">
        <span className="text-white">My </span>
        <span className="text-[#FA7C54]">Book </span>
        <br />
        <span className="text-white">Shelf</span>
      </h1> */}
    </div>
  );
}

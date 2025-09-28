import React, { useState,useEffect } from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { CgEnter } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtom";
import { LuSun ,LuMoon} from "react-icons/lu";
import { themeAtom } from "../atoms/themeAtom";
import { toEthiopian } from "ethiopian-date";
import HijriDate from "hijri-date/lib/safe"; 


const Navbar = ({ SidebarToggle, setSidebarToggle }) => {
  const [user, setUser] = useAtom(userAtom);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [calendarDropdownOpen, setCalendarDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [theme, setTheme] = useAtom(themeAtom);
  const [calendarType, setCalendarType] = useState("ethiopian");
  const [dateString, setDateString] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setProfileDropdownOpen(false);
    setUser(null);
    navigate("/login");
  };
  useEffect(() => {
    const today = new Date();

    if (calendarType === "ethiopian") {
      const [year, month, day] = toEthiopian(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      const months = [
        "መስከረም", "ጥቅምት", "ህዳር", "ታኅሣሥ", "ጥር", "የካቲት",
        "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"
      ];
      setDateString(`${day} ${months[month - 1]} ${year}`);
    } 
    else if (calendarType === "gregorian") {
      setDateString(today.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }));
    } 
    else if (calendarType === "arabic") {
      const hijri = new HijriDate(today);
      const monthsArabic = [
        "محرم", "صفر", "ربيع الأول", "ربيع الثاني",
        "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
        "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
      ];
      setDateString(`${hijri.getDate()} ${monthsArabic[hijri.getMonth()]} `);
    }
  }, [calendarType]);

  const firstLetter = (user?.firstName || user?.lastName || "").charAt(0).toUpperCase();
  const profileImage = user?.profileImage || null;

  return (
    <header className={`fixed w-full bg-white dark:bg-gray-900 shadow-sm z-20 ${theme === 'dark' ? 'dark' : ''}`}>
      <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Left: Sidebar toggle + Brand */}
        <div className="flex items-center gap-3 flex-shrink-0 dark:text-white text-black">
          <HiMiniBars3CenterLeft
            onClick={() => setSidebarToggle(!SidebarToggle)}
            className="cursor-pointer text-xl"
          />
          <p className="text-base lg:text-lg font-bold font-[Roboto] dark:text-white text-black">
            ASTUMSJ Library
          </p>
        </div>

        {/* Centered Arabic Quote */}
        <div className="flex-1 flex justify-center">
          <p className="arabic-calligraphy hidden md:block text-center">
            المكتبة الإلكترونية
          </p>
        </div>
        <div className="flex items-center bg-zinc-100 dark:bg-gray-900 rounded-lg ">
    <button
  onClick={() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
  }}
  className="bg-transparent p-3 hover:bg-zinc-200 dark:hover:bg-zinc-100/10 rounded-lg transition dark:text-white text-black"
>
  {theme === "dark" ? <LuSun className="text-xl" /> : <LuMoon className="text-xl" />}
</button>

</div>
{/* Calendar Section */}
<div className="relative flex items-center gap-2">
  {/* Clickable Date */}
  <button
    onClick={() => setCalendarDropdownOpen(calendarDropdownOpen === "calendar" ? null : "calendar")}
    className="text-sm text-gray-700 dark:text-gray-300 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    {dateString}
  </button>

  {/* Calendar Dropdown */}
  {calendarDropdownOpen === "calendar" && (
    <div className="absolute right-0 mt-10 w-40 bg-white dark:bg-gray-900 rounded-md shadow-lg py-2 z-30">
      <button
        onClick={() => { setCalendarType("ethiopian"); setCalendarDropdownOpen(null); }}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
      >
        Ethiopian
      </button>
      <button
        onClick={() => { setCalendarType("gregorian"); setCalendarDropdownOpen(null); }}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
      >
        Gregorian
      </button>
      <button
        onClick={() => { setCalendarType("arabic"); setCalendarDropdownOpen(null); }}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
      >
        Arabic (Hijri)
      </button>
    </div>
  )}
</div>

    

        <div className="relative flex items-center gap-4 flex-shrink-0 dark:text-white text-black">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {/* Avatar */}
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold dark:bg-gray-700 dark:text-white overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    firstLetter
                  )}
                </div>
              </button>

              {/* Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border-none rounded-md shadow-lg py-2 z-30">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <FaRegUser /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                  >
                    <CgEnter /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1">
              <FaUserCircle className="text-2xl" /> Login
            </Link>
          )}
        </div>
      </nav>

      {/* CSS for Arabic calligraphy */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fustat:wght@200..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Jost:ital,wght@0,100..900;1,100..900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap');

          .arabic-calligraphy {
            font-family: 'Fustat', serif;
            font-size: 16px;
            color: #b8860b;
            white-space: nowrap;
            line-height: 1.1;
            animation: fadeIn 1s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </header>
  );
};

export default Navbar; 
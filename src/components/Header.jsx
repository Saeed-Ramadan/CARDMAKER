import React from "react";
import { Share2, Sun, Moon } from "lucide-react";
import logo from "../assets/logo.png";

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className="w-full max-w-6xl flex items-center justify-between py-4">
      {/* Social / Share Header Button */}
      <button
        onClick={() => {}}
        className="flex lg:hidden items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <Share2 className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-1 overflow-hidden border border-gray-100 dark:border-slate-700">
            <img
              src={logo}
              alt="Said Ramadan Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden md:flex flex-col">
            <h1 className="text-xl font-black bg-linear-to-r from-primary to-amber-600 bg-clip-text text-transparent font-arabic">
              Saeed Ramadan
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              GREETING CARD MAKER
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </header>
  );
};

export default Header;

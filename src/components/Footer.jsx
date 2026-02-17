import React from "react";

const Footer = () => {
  return (
    <footer className="w-full max-w-6xl mt-12 py-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-6">
      <div className="flex items-center gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
        <a href="#" className="hover:text-primary transition-colors">
          عن الموقع
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          سياسة الخصوصية
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          تواصل معنا
        </a>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-xs text-gray-400">جميع الحقوق محفوظة © 2026</p>
        <a
          href="https://www.facebook.com/said.aboshanab.92?locale=ar_AR"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-black text-primary hover:underline transition-all mt-1"
        >
          Designed & Developed by Saeed Ramadan
        </a>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Moon, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

const CardPreview = ({
  name,
  photo,
  design,
  photoScale = 1,
  photoY = 0,
  setPhotoY,
  photoX = 0,
  setPhotoX,
  frameHeight = 320,
  frameWidth = 256,
}) => {
  const getThemeColors = () => {
    switch (design) {
      case 2:
        return {
          primary: "text-teal-600",
          secondary: "bg-teal-50",
          accent: "text-teal-400",
          border: "border-teal-100",
          nameColor: "text-teal-600",
          icon: "text-teal-500",
        };
      case 3:
        return {
          primary: "text-slate-600",
          secondary: "bg-slate-50",
          accent: "text-slate-400",
          border: "border-slate-100",
          nameColor: "text-slate-600",
          icon: "text-slate-500",
        };
      default:
        return {
          primary: "text-amber-600",
          secondary: "bg-amber-50",
          accent: "text-amber-400",
          border: "border-amber-100",
          nameColor: "text-amber-500",
          icon: "text-amber-500",
        };
    }
  };

  const theme = getThemeColors();

  return (
    <div
      id="greeting-card"
      className={`relative w-full max-w-105 bg-white rounded-[0.5rem] overflow-hidden shadow-2xl border ${theme.border} p-8 pb-16 flex flex-col items-center text-center transition-all duration-500 ${!photo ? "justify-between min-h-160" : "space-y-8 min-h-150"}`}
    >
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-50/50 rounded-bl-full -mr-20 -mt-20 opacity-50" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-50/50 rounded-tr-full -ml-16 -mb-16 opacity-50" />

      <div className={`absolute top-6 left-6 ${theme.icon} size-6`}>
        <Star className="size-full" />
      </div>
      <div
        className={`absolute top-12 right-12 ${theme.icon} size-10 opacity-20`}
      >
        <Sparkles className="size-full" />
      </div>

      {/* Decorative Center Pattern (Only when no photo) */}
      {!photo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none p-12">
          <Moon className="w-full h-full rotate-12" />
        </div>
      )}

      <div className="flex flex-col items-center space-y-4 w-full">
        {/* Hero Icon */}
        <div
          className={`mt-4 p-5 rounded-full ${theme.secondary} transition-all duration-500 ${!photo ? "scale-150 mb-6" : ""}`}
        >
          <Moon className={`w-8 h-8 fill-current ${theme.icon}`} />
        </div>

        {/* Main Text */}
        <div className="space-y-2">
          <h1
            className={`${!photo ? "text-4xl md:text-5xl" : "text-3xl"} font-black text-gray-800 transition-all duration-500 font-arabic`}
          >
            كل عام وأنتم بخير
          </h1>
          <p
            className={`${!photo ? "text-xl md:text-2xl" : "text-lg"} font-medium text-gray-400 transition-all duration-500 font-arabic`}
          >
            رمضان كريم وعيد مبارك
          </p>
        </div>
      </div>

      {/* User Photo Frame - Conditional Render */}
      {photo ? (
        <div
          style={{ height: `${frameHeight}px`, width: `${frameWidth}px` }}
          className={`relative p-1.5 rounded-[2.5rem] border-4 shadow-xl overflow-hidden ${theme.border} bg-white flex items-center justify-center cursor-move touch-none transition-all duration-300`}
        >
          <motion.img
            src={photo}
            alt="User"
            drag
            dragConstraints={{
              left: -600,
              right: 600,
              top: -600,
              bottom: 600,
            }}
            dragElastic={0}
            onDragEnd={(_, info) => {
              setPhotoX(photoX + info.offset.x);
              setPhotoY(photoY + info.offset.y);
            }}
            style={{
              x: photoX,
              y: photoY,
              scale: photoScale,
            }}
            className="w-full h-full object-cover rounded-[2.2rem] pointer-events-none"
          />
          {/* Overlay info */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
            <span className="bg-black/60 text-white text-[10px] py-1 px-3 rounded-full backdrop-blur-md font-arabic font-bold">
              اسحب لضبط الموقع
            </span>
          </div>
        </div>
      ) : (
        /* Empty space filler or just centered layout */
        <div className="grow" />
      )}

      <div className="space-y-6 w-full">
        {/* Name Section */}
        <div className="space-y-1 text-center flex flex-col items-center justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 font-arabic">
            أطيب التمنيات من
          </p>
          <h2
            className={`${!photo ? "text-4xl md:text-6xl" : "text-4xl"} font-black ${theme.nameColor} leading-tight transition-all duration-500 font-arabic`}
          >
            {name || "محمد أحمد"}
          </h2>
        </div>

        {/* Prayers / Duaa Section */}
        <div
          className={`w-full p-6 rounded-[2.5rem] flex flex-col gap-2 ${theme.secondary} border border-white dark:border-slate-800/10 transition-all duration-500`}
        >
          <p
            className={`${!photo ? "text-lg" : "text-xs"} font-bold text-gray-600 italic transition-all duration-500 font-arabic`}
          >
            "اللهم بلغنا رمضان وأنت راضٍ عنا"
          </p>
          <p
            className={`${!photo ? "text-lg" : "text-xs"} font-medium text-gray-600 transition-all duration-500 font-arabic`}
          >
            رمضان كريم، أعاده الله علينا وعليكم باليمن والبركات
          </p>
        </div>
      </div>

      {/* Footer Brand */}
      <div className="flex flex-col items-center pb-2 opacity-20">
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
            Exclusive Design by Saeed Ramadan
          </span>
        </div>
        <div className="w-32 h-1 mt-2 bg-linear-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </div>
  );
};

export default CardPreview;

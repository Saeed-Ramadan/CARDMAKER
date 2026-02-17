import React, { useRef } from "react";
import { toPng, toBlob } from "html-to-image";
import { Download, Upload, User, LayoutGrid, Share2 } from "lucide-react";

const Controls = ({
  setName,
  setPhoto,
  design,
  setDesign,
  name,
  photoScale,
  setPhotoScale,
  photoY,
  setPhotoY,
  photoX,
  setPhotoX,
  photo,
  frameHeight,
  setFrameHeight,
  frameWidth,
  setFrameWidth,
}) => {
  const fileInputRef = useRef(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isSharing, setIsSharing] = React.useState(false);

  const handleDownload = async () => {
    const cardElement = document.getElementById("greeting-card");
    if (!cardElement) {
      console.error("Card element not found");
      return;
    }

    setIsDownloading(true);
    try {
      // Ensure fonts are loaded before capturing
      await document.fonts.ready;

      const dataUrl = await toPng(cardElement, {
        canvasWidth: 1200,
        canvasHeight: 1800,
        pixelRatio: 3,
        skipFonts: false,
        filter: (node) => {
          if (node.tagName === "LINK" && node.rel === "stylesheet") {
            return node.href?.startsWith(window.location.origin);
          }
          return true;
        },
      });

      const link = document.createElement("a");
      link.download = `ramadan-card-${name || "ramadan"}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert("حدث خطأ أثناء تحميل الصورة، يرجى المحاولة مرة أخرى.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const cardElement = document.getElementById("greeting-card");
    if (!cardElement) return;

    if (!navigator.share) {
      alert(
        "خاصية المشاركة غير مدعومة في متصفحك، يمكنك تحميل الصورة ومشاركتها يدوياً.",
      );
      return;
    }

    setIsSharing(true);
    try {
      await document.fonts.ready;
      const blob = await toBlob(cardElement, {
        canvasWidth: 1200,
        canvasHeight: 1800,
        pixelRatio: 3,
        filter: (node) => {
          if (node.tagName === "LINK" && node.rel === "stylesheet") {
            return node.href?.startsWith(window.location.origin);
          }
          return true;
        },
      });

      if (blob) {
        const file = new File([blob], `ramadan-card.png`, {
          type: "image/png",
        });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "بطاقة تهنئة رمضان",
            text: `تهنئة خاصة من ${name || "محمد أحمد"} بمناسبة شهر رمضان الكريم`,
          });
        } else {
          // Fallback if file sharing is not supported but navigator.share exists
          await navigator.share({
            title: "بطاقة تهنئة رمضان",
            text: `تم إنشاء هذه البطاقة بواسطة Greeting Card Maker`,
            url: window.location.href,
          });
          alert("تمت مشاركة الرابط، لمشاركة الصورة مباشرة يرجى تحميلها أولاً.");
        }
      }
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setIsSharing(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        // Reset adjustments on new photo
        setPhotoScale(1);
        setPhotoY(0);
        setPhotoX(0);
        setFrameHeight(320);
        setFrameWidth(256);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100 dark:border-slate-800 space-y-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-xl">
          <LayoutGrid className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-black font-arabic">تخصيص البطاقة</h3>
      </div>

      {/* Name Input */}
      <div className="space-y-4">
        <label className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block font-arabic">
          الاسم بالكامل
        </label>
        <input
          type="text"
          placeholder="اكتب اسمك هنا..."
          className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-900 transition-all text-right outline-none text-lg font-bold font-arabic"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Photo Upload & Adjustments */}
      <div className="space-y-6">
        <label className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block font-arabic">
          الصورة الشخصية
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full aspect-2/1 border-3 border-dashed border-gray-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group overflow-hidden"
        >
          {photo ? (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={photo}
                alt="Preview"
                className="w-full h-full object-cover opacity-20 transition-opacity group-hover:opacity-30"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Upload className="w-8 h-8 text-primary animate-bounce" />
                <span className="text-sm font-black font-arabic">
                  تغيير الصورة
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-lg font-black font-arabic">
                  اضغط لرفع صورتك
                </p>
                <p className="text-xs text-gray-400 font-arabic">
                  PNG, JPG تصل إلى 5MB
                </p>
              </div>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            className="hidden"
            accept="image/*"
          />
        </div>

        {photo && (
          <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-3xl space-y-8 border border-gray-100 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Zoom slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-gray-600 dark:text-gray-400 font-arabic">
                    حجم الصورة (Zoom)
                  </span>
                  <span className="text-sm font-black text-primary">
                    {Math.round(photoScale * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.01"
                  value={photoScale}
                  onChange={(e) => setPhotoScale(parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Frame Height slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-gray-600 dark:text-gray-400 font-arabic">
                    طول الكادر (Height)
                  </span>
                  <span className="text-sm font-black text-primary">
                    {Math.round(frameHeight)}px
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="1"
                  value={frameHeight}
                  onChange={(e) => setFrameHeight(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Frame Width slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-gray-600 dark:text-gray-400 font-arabic">
                    عرض الكادر (Width)
                  </span>
                  <span className="text-sm font-black text-primary">
                    {Math.round(frameWidth)}px
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="400"
                  step="1"
                  value={frameWidth}
                  onChange={(e) => setFrameWidth(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-gray-400 font-arabic">
                    أفقي (X)
                  </span>
                  <span className="text-xs font-black text-primary">
                    {Math.round(photoX)}px
                  </span>
                </div>
                <input
                  type="range"
                  min="-300"
                  max="300"
                  step="1"
                  value={photoX}
                  onChange={(e) => setPhotoX(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-gray-400 font-arabic">
                    رأسي (Y)
                  </span>
                  <span className="text-xs font-black text-primary">
                    {Math.round(photoY)}px
                  </span>
                </div>
                <input
                  type="range"
                  min="-300"
                  max="300"
                  step="1"
                  value={photoY}
                  onChange={(e) => setPhotoY(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-gray-400 font-arabic uppercase tracking-tighter">
                يمكنك سحب الصورة داخل الكارت مباشرة
              </span>
              <button
                onClick={() => {
                  setPhotoScale(1);
                  setPhotoY(0);
                  setPhotoX(0);
                  setFrameHeight(320);
                  setFrameWidth(256);
                }}
                className="text-xs text-primary hover:underline transition-all font-black font-arabic"
              >
                إعادة ضبط الأبعاد
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Design Selector */}
      <div className="space-y-6">
        <label className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block font-arabic">
          اختر نمط التصميم
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((d) => (
            <button
              key={d}
              onClick={() => setDesign(d)}
              className={`aspect-square rounded-3xl border-4 transition-all flex items-center justify-center shadow-sm ${
                design === d
                  ? "border-primary bg-primary/10 scale-105"
                  : "border-transparent bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full shadow-lg ring-4 ring-white dark:ring-slate-900 ${
                  d === 1
                    ? "bg-amber-400"
                    : d === 2
                      ? "bg-teal-500"
                      : "bg-slate-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading || isSharing}
          className={`w-full py-5 text-xl font-black rounded-3xl shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] font-arabic ${
            isDownloading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-amber-500 text-amber-950 shadow-primary/30"
          }`}
        >
          <Download
            className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`}
          />
          {isDownloading ? "جاري التحميل..." : "تحميل البطاقة"}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          disabled={isDownloading || isSharing}
          className={`w-full py-5 text-xl font-black rounded-3xl shadow-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] font-arabic border-2 ${
            isSharing
              ? "bg-gray-200 text-gray-400 cursor-not-allowed border-transparent"
              : "bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
          }`}
        >
          <Share2 className={`w-5 h-5 ${isSharing ? "animate-pulse" : ""}`} />
          {isSharing ? "جاري المشاركة..." : "مشاركة"}
        </button>
      </div>
    </div>
  );
};

export default Controls;

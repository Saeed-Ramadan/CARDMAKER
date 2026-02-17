import { useState, useEffect } from "react";
import Header from "./components/Header";
import CardPreview from "./components/CardPreview";
import Controls from "./components/Controls";
import Footer from "./components/Footer";

function App() {
  const [name, setName] = useState(" ");
  const [photo, setPhoto] = useState(null);
  const [design, setDesign] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [photoScale, setPhotoScale] = useState(1);
  const [photoY, setPhotoY] = useState(0);
  const [photoX, setPhotoX] = useState(0);
  const [frameHeight, setFrameHeight] = useState(320);
  const [frameWidth, setFrameWidth] = useState(256);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 space-y-8 bg-background text-foreground transition-colors duration-300">
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="order-2 lg:order-1 flex flex-col items-center space-y-4 lg:sticky lg:top-8">
          <h2 className="text-gray-500 dark:text-gray-400 font-medium font-arabic">
            معاينة مباشرة
          </h2>
          <CardPreview
            name={name}
            photo={photo}
            design={design}
            photoScale={photoScale}
            photoY={photoY}
            setPhotoY={setPhotoY}
            photoX={photoX}
            setPhotoX={setPhotoX}
            frameHeight={frameHeight}
            frameWidth={frameWidth}
          />
          <p className="text-xs text-center text-gray-400 max-w-xs font-arabic">
            اسحب الصورة داخل البطاقة لضبط موقعها، واستخدم الكنترول لتغيير حجم
            الكادر والصورة
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <Controls
            setName={setName}
            setPhoto={setPhoto}
            design={design}
            setDesign={setDesign}
            name={name}
            photoScale={photoScale}
            setPhotoScale={setPhotoScale}
            photoY={photoY}
            setPhotoY={setPhotoY}
            photoX={photoX}
            setPhotoX={setPhotoX}
            photo={photo}
            frameHeight={frameHeight}
            setFrameHeight={setFrameHeight}
            frameWidth={frameWidth}
            setFrameWidth={setFrameWidth}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

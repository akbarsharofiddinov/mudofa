import ShinyText from "@/components/UI/ShinyText";
import { LogIn, Search } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationLogo from "@/components/NavigationLogo";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import LightRays from "@/components/UI/LightRay";
import EnhancedTimelineNav from "@/EnhancedTimelineNav";
import { HorseModel } from "@/ThreeJS";
import SearchInput from "../Search/SearchInput";
import PhotoRoom from "../Search/PhotoRoom";

const navItems = [
  { label: "Rahbariyat", link: "leadership" },
  { label: "Statistika", link: "statistics" },
  { label: "Musobaqalar", link: "competitions" },
  { label: "Yutuqlar", link: "achievements" },
  { label: "Bizning Jamoa", link: "team" },
  { label: "Tadbirlar", link: "events" },
  { label: "Yangiliklar", link: "news" },
  { label: "Bizning strategiya", link: "strategy" },
];

const Entrance: React.FC = () => {
  const [showEntrance, setShowEntrance] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [imageData, setImageData] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<[number, number, number]>([
    -13, -2.6, 0,
  ]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  const text = useTypewriter({
    words: ["O’zbekiston Respublikasi Mudofa Vazirligi Sport Markazi"],
    loop: 1,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 1000,
    onLoopDone: () => {
      setTimeout(() => {
        setShowEntrance(false);
      }, 1000);
    },
  });

  return showGallery ? (
    <>
      <div className="w-full h-screen flex flex-col items-center overflow-hidden">
        <PhotoRoom setImageData={setImageData} imageData={imageData}>
          <h1 className="text-center font-bold text-2xl m-2">
            Galareya xonasi
          </h1>
          <SearchInput setImageData={setImageData} />
        </PhotoRoom>
      </div>
    </>
  ) : (
    <>
      <main className={`w-full h-screen transition-all duration-500`}>
        <NavigationLogo />
        <Outlet />
        {location.pathname === "/" && (
          <div className="absolute inset-0 z-[80]">
            <div className="flex flex-col gap-4 absolute top-4 left-4">
              {/* Coordinates */}
              <div>
                <h1>Coordinates</h1>
                <p>
                  X: {coordinates[0]} <br />
                  Y: {coordinates[1]} <br />
                  Z: {coordinates[2]}
                </p>
              </div>

              {/* Rotation */}
              <div>
                <h1>Rotation</h1>
                <p>
                  X: {rotation[0]} <br />
                  Y: {rotation[1]} <br />
                  Z: {rotation[2]}
                </p>
              </div>
            </div>
            <HorseModel
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              rotation={rotation}
              setRotation={setRotation}
            />
          </div>
        )}

        <div className="flex items-center gap-2 fixed top-4 right-4 z-90">
          {/* <Input placeholder="Qidirish" className='rounded-full bg-white/20 backdrop-blur-sm border-0 text-white placeholder:text-white focus:border-0 focus:ring-0 max-w-[100px] h-10' /> */}
          <ShinyText className="h-10 bg-transparent hover:bg-white/10 transition-all duration-300">
            <div
              className="flex items-center gap-2 text-white text-[14px] w-full h-full"
              onClick={() => setShowGallery(true)}
            >
              <Search size={18} className="mx-auto" />
            </div>
          </ShinyText>

          {/* Log in button */}
          <ShinyText className="h-10 bg-white/10 hover:bg-white/20 border">
            <div className="flex items-center gap-2 text-white text-[14px]">
              <LogIn size={18} /> Kirish
            </div>
          </ShinyText>
        </div>
      </main>

      {!showEntrance && (
        <>
          <EnhancedTimelineNav
            items={navItems}
            betweenDots={8}
            coordinates={coordinates}
          />
        </>
      )}

      {/* Entrance Overlay */}
      {showEntrance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xl">
          <div className="relative w-full flex items-center z-90 justify-center h-screen p-8 backdrop-blur-md">
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays h-screen"
            />

            <div className="text-center absolute inset-0 flex flex-col justify-center items-center break-words text-white space-y-6">
              <h1 className="text-7xl font-normal max-w-[1100px] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-white">
                {text[0]}
                <Cursor cursorStyle="|" />
              </h1>
            </div>

            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-sm"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-sm"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Entrance;

/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { atom, useAtom } from "jotai";

/* ---------- Types ---------- */
export type PageItem = {
  front: string;
  back: string;
};

/* ---------- Data ---------- */
const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
] as const;

/* ---------- Jotai ---------- */
export const pageAtom = atom<number>(0);

/* ---------- Pages builder ---------- */
export const pages: PageItem[] = [
  { front: "book-cover", back: pictures[0] },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

/* ---------- UI Component ---------- */
export const UI: React.FC = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    // Fire-and-forget; ignore promise to avoid unhandled rejections on autoplay block
    audio.play().catch(() => { });
  }, [page]);

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        {/* <a
          className="pointer-events-auto mt-10 ml-10"
          href="https://lessons.wawasensei.dev/courses/react-three-fiber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-20"
            src="/images/wawasensei-white.png"
            alt="Wawa Sensei"
          />
        </a> */}

        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${index === page
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
                  }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${page === pages.length
                ? "bg-white/90 text-black"
                : "bg-black/30 text-white"
                }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      {/* Informations text */}
      <div className="fixed inset-0 flex items-center -rotate-2 select-none">
        <div className="relative w-full overflow-hidden">
          {/* Track 1 */}
          <div className="bg-white/0 flex items-center gap-8 px-8 w-max animate-horizontal-scroll">
            <h1 className="shrink-0 text-white text-10xl font-black">Erishilgan yutuqlar</h1>
            <h2 className="shrink-0 text-white text-12xl font-bold">Olimpiada</h2>
            <h2 className="shrink-0 text-white text-9xl italic font-light">Osiyo chempionati</h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">Jahon chempionati</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">Terma jamoa</h2>
            <h2 className="shrink-0 text-white text-10xl font-extralight italic">Kubok</h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">Rekord</h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">Final • Yarim final</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold outline-text italic">Musobaqalar</h2>
            <h2 className="shrink-0 text-white text-9xl font-semibold">Gʼalaba</h2>

            {/* duplicate for loop */}
            <h1 className="shrink-0 text-white text-10xl font-black">Erishilgan yutuqlar</h1>
            <h2 className="shrink-0 text-white text-12xl font-bold">Olimpiada</h2>
            <h2 className="shrink-0 text-white text-9xl italic font-light">Osiyo chempionati</h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">Jahon chempionati</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">Terma jamoa</h2>
            <h2 className="shrink-0 text-white text-10xl font-extralight italic">Kubok</h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">Rekord</h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">Final • Yarim final</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold outline-text italic">Musobaqalar</h2>
            <h2 className="shrink-0 text-white text-9xl font-semibold">Gʼalaba</h2>
          </div>


          {/* Track 2 (parallax) */}
          <div className="absolute top-0 left-0 bg-white/0 flex items-center gap-8 px-8 w-max animate-horizontal-scroll-2">
            <h1 className="shrink-0 text-white text-10xl font-black">Oltin • Kumush • Bronza</h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">Medallar jadvali</h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">Champions</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Season Best
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">Reyting</h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">National Team</h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">Records</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Match Highlights
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">Road to Parisi</h2>

            {/* duplicate content for seamless loop */}
            <h1 className="shrink-0 text-white text-10xl font-black">Road to Parisi</h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">Champions</h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">Season Best</h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Reyting
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">National Team</h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">Records</h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">Match Highlights</h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Road to Paris
            </h2>
          </div>
        </div>

        {/* local styles to power the marquee */}
        <style>{`
          @keyframes scroll-x {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-horizontal-scroll {
        animation: scroll-x 30s linear infinite;
        will-change: transform;
          }
          .animate-horizontal-scroll-2 {
        animation: scroll-x 45s linear infinite reverse;
        will-change: transform;
        opacity: 0.6;
          }
        `}</style>
      </div>
    </>
  );
};

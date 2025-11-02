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
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-3 py-2 rounded-full text-sm uppercase shrink-0 border ${index === page
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
                  }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-3 py-2 rounded-full text-md uppercase shrink-0 border ${page === pages.length
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
    </>
  );
};

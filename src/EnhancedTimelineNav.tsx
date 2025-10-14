import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type NavItem = { label: string; link: string };

interface Props {
  items: NavItem[];
  className?: string;
  /** How many mini-dots to render between each main item */
  betweenDots?: number; // default 8
  coordinates?: [number, number, number];
}

export default function EnhancedTimelineNav({
  items,
  className,
  betweenDots = 8,
  coordinates
}: Props) {
  const [active, setActive] = useState<string | null>(null);
  const location = useLocation();

  // Scroll-spy: highlight section mostly in view
  useEffect(() => {
    setActive(location.pathname.split("/")[1] || "/");
    if (coordinates![1] === -2.6) {
      if (coordinates![0] >= -13 && coordinates![0] < -10) {
        setActive("management")
      } else if (coordinates![0] >= -10 && coordinates![0] <= -8) {
        setActive("statistics")
      } else if (coordinates![0] >= -8 && coordinates![0] <= -4) {
        setActive("competitions")
      } else if (coordinates![0] >= -4 && coordinates![0] <= -1) {
        setActive("achievements")
      } else if (coordinates![0] >= -1 && coordinates![0] <= 2) {
        setActive("team")
      } else if (coordinates![0] >= 2 && coordinates![0] <= 5) {
        setActive("events")
      } else if (coordinates![0] >= 5 && coordinates![0] <= 8) {
        setActive("news")
      } else if (coordinates![0] >= 8 && coordinates![0] <= 12) {
        setActive("strategy")
      }
    }
  }, [location, coordinates]);

  const navigate = useNavigate();

  const go = (link: string) => {
    navigate(link)
  };

  return (
    <nav
      className={[
        "fixed inset-x-0 bottom-0 z-90 w-full",
        "pb-4 pt-2 md:pb-3 md:pt-0 lg:pb-6 lg:pt-4]",
        "bg-black/10 backdrop-blur-sm border-t border-white/10",
        className ?? "",
      ].join(" ")}
    >
      {/* Curved glow for the 'arc' feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-120%] h-[230%] rounded-b-[100%]"
      />

      <div className="relative mx-auto w-full px-5">
        {/* dotted base rail */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px z-0"
        />

        <ul className="relative z-10 flex items-center justify-center gap-6">
          {items.map((item, idx) => {
            const isActive = active === item.link;
            return (
              <React.Fragment key={item.link}>
                {/* MAIN ITEM */}
                <li className="first:translate-x-[5px] relative min-w-[130px] flex items-center justify-center min-h-[80px]">

                  {/* MINI-DOTS BETWEEN (not after last) */}
                  {idx < items.length - 1 && (
                    <div className={[
                      "absolute top-[25%] left-[50%] flex items-center gap-2 translate-x-[10px] translate-y-[5px] first:translate-x-[18px]",
                      // `${idx === 0 && "translate-x-[18px]"}`,
                      // `${idx === 1 && ""}`,
                      // `${idx === 2 && "translate-x-[15px]"}`,
                      // `${idx === 3 && "translate-x-[15px]"}`,
                      // `${idx === 4 && "translate-x-[15px]"}`,
                      // `${idx === items.length - 2 && "translate-x-[10px]"}`
                    ].join(" ")}>
                      {Array.from({
                        length: idx === 0 ? betweenDots + 2
                          : idx === 1 ? betweenDots + 3
                            : idx === 2 ? betweenDots + 3
                              : idx === 3 ? betweenDots + 3
                                : idx === 4 ? betweenDots + 3
                                  : idx === 5 ? betweenDots + 3
                                    : idx === items.length - 2 ? betweenDots + 4
                                      : betweenDots
                      }).map((_, i) => (
                        <span
                          key={i}
                          className="inline-block size-[4px] rounded-full bg-yellow-300/40"
                        />
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => go(item.link)}
                    className="group mx-1 sm:mx-1 flex flex-col items-center justify-center px-1"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Big dot */}
                    <span
                      className={[
                        "mb-2 inline-block size-[6px] rounded-full transition-all duration-300",
                        isActive
                          ? "bg-yellow-400 scale-150 shadow-[0_0_10px_rgba(234,179,8,0.6)]"
                          : "bg-yellow-400/70 group-hover:bg-yellow-400 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(234,179,8,0.6)]",
                      ].join(" ")}
                    />
                    {/* Label */}
                    <span
                      className={[
                        "text-[14px] leading-tight text-center font-[600] tracking-widest",
                        "text-ellipsis line-clamp-2",
                        isActive
                          ? "text-yellow-300"
                          : "text-white/70 group-hover:text-yellow-300",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>


                    <span className={[
                      "absolute inset-0 rounded-lg opacity-0 bg-gradient-to-b from-[#FFAA00] to-transparent",
                      // "after:content-[''] after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-b after:from-[#FFAA00] after:to-transparent after:transform [transform:perspective(2em)_rotateX(30deg)] blur-[2px]",
                      `transition-opacity duration-300 ${isActive ? "opacity-20" : "group-hover:opacity-20"}`,
                      "pointer-events-none"
                    ].join(" ")} />
                  </button>
                </li>


              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type NavItem = { label: string; link: string };

interface Props {
  items: NavItem[];
  className?: string;
  /** How many mini-dots to render between each main item */
  betweenDots?: number; // default 8
}

export default function EnhancedTimelineNav({
  items,
  className,
  betweenDots = 8,
}: Props) {
  const [active, setActive] = useState<string | null>(null);

  // Scroll-spy: highlight section mostly in view
  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.link))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best?.target?.id) setActive(best.target.id);
      },
      { threshold: [0.25, 0.6, 0.9] }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      sections.forEach((s) => io.unobserve(s));
      io.disconnect();
    };
  }, [items]);

  const navigate = useNavigate()

  const go = (link: string) => {
    navigate(link)
  };

  return (
    <nav
      className={[
        "fixed inset-x-0 bottom-0 z-90 w-full",
        "py-4 md:py-5 lg:py-6]",
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

        <ul className="relative z-10 flex items-center justify-center gap-6 min-h-[80px]">
          {items.map((item, idx) => {
            const isActive = active === item.link;
            return (
              <React.Fragment key={item.link}>
                {/* MAIN ITEM */}
                <li className="first:translate-x-[5px] relative min-w-[130px] flex items-center justify-center">

                  {/* MINI-DOTS BETWEEN (not after last) */}
                  {idx < items.length - 1 && (
                    <div className={[
                      "absolute top-0 left-[50%] flex items-center gap-2 translate-x-[10px] first:translate-x-[18px]",
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
                    className="group relative mx-1 sm:mx-1 flex flex-col items-center justify-center px-1"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Big dot */}
                    <span
                      className={[
                        "mb-2 inline-block size-[6px] rounded-full transition-all duration-300",
                        isActive
                          ? "bg-yellow-400 scale-150 shadow-[0_0_14px_rgba(234,179,8,0.85)]"
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

                    {/* Hover halo */}
                    <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-yellow-400" />
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

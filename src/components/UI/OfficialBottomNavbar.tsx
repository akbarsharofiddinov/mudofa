import React, { useEffect, useState } from "react";

export const navItems: NavItem[] = [
  { label: "Biz haqimizda", link: "about" },
  { label: "Statistika", link: "statistics" },
  { label: "Rahbariyat", link: "management" },
  { label: "Erishilgan yutuqlar", link: "achievements" },
  { label: "O’tkazilgan musobaqalar", link: "competitions" },
  { label: "Bizning jamoa", link: "team" },
  { label: "Rejalashtirilgan sport tadbirlari", link: "events" },
  { label: "Yangiliklar", link: "news" },
  { label: "Bizning strategiya", link: "strategy" },
  { label: "Yaratilgan imkoniyat", link: "opportunities" },
];


export type NavItem = { label: string; link: string };

interface Props {
  items: NavItem[];
  className?: string;
  /** Agar react-router bilan boshqarib navigatsiya qilmoqchi bo'lsangiz */
  onNavigate?: (link: string) => void;
}

export default function OfficialBottomNavbar({
  items,
  className,
  onNavigate,
}: Props) {
  const [active, setActive] = useState<string | null>(null);

  // Scroll-spy: ko'rinib turgan bo'limni aktiv qiladi
  useEffect(() => {
    if (!items.length) return;
    const sections = items
      .map((i) => document.getElementById(i.link))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const topMost = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (topMost?.target?.id) setActive(topMost.target.id);
      },
      { threshold: [0.25, 0.6, 0.9] }
    );

    sections.forEach((s) => io.observe(s));
    return () => {
      sections.forEach((s) => io.unobserve(s));
      io.disconnect();
    };
  }, [items]);

  const go = (link: string) => {
    if (onNavigate) {
      onNavigate(link);
      return;
    }
    const el =
      document.getElementById(link) ||
      (document.querySelector(`[data-section="${link}"]`) as HTMLElement | null);

    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = link.startsWith("#") ? link : `#${link}`;
  };

  return (
    <nav
      className={[
        "fixed inset-x-0 bottom-0 z-50 w-full",
        "bg-yellow-500/10 backdrop-blur-md border-t border-yellow-500/30",
        "py-5 md:py-6",
        "pb-[env(safe-area-inset-bottom)]",
        "transition-all duration-700",
        className ?? "",
      ].join(" ")}
      role="navigation"
      aria-label="Primary"
    >
      <div className="w-full mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 relative">
        <ul className="relative flex items-center justify-between min-h-[64px] w-full">
          {/* Gradient dotted line */}
          <div
            aria-hidden
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px opacity-70
                       bg-repeat-x
                       bg-[radial-gradient(theme(colors.yellow.400)_1.5px,transparent_1.5px)]
                       [background-size:16px_1px]"
          />
          {items.map((item) => {
            const isActive = active === item.link;
            return (
              <li key={item.link} className="flex-1 relative z-10">
                <button
                  type="button"
                  onClick={() => go(item.link)}
                  className="group relative mx-auto flex flex-col items-center justify-center p-2
                             transition-transform duration-200 hover:scale-[1.06] focus:outline-none"
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Nuqta */}
                  <span
                    className={[
                      "mb-2 inline-block size-2 rounded-full transition-all duration-300",
                      isActive
                        ? "bg-yellow-400 scale-150 shadow-[0_0_12px_rgba(234,179,8,0.75)]"
                        : "bg-yellow-400/60 group-hover:bg-yellow-400 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(234,179,8,0.6)]",
                    ].join(" ")}
                  />
                  {/* Yorliq */}
                  <span
                    className={[
                      "text-[11px] leading-tight text-center font-medium tracking-widest",
                      "max-w-[120px]",
                      isActive
                        ? "text-yellow-300"
                        : "text-white/70 group-hover:text-yellow-300",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>

                  {/* Hover fon highlight */}
                  <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-yellow-400" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

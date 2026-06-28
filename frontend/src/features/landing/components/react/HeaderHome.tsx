import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../../hooks/useI18n";
import { useSignal } from "../../hooks/useSignal";
import { lenis } from "../../hooks/useScroll";
import { projectIdSignal } from "../../store/routeStore";

type ActiveLink = "about" | "projects" | "contact";
const sections: ActiveLink[] = ["about", "projects", "contact"];
const ITEM_WIDTH = 128;

export function HeaderHome() {
  const { t } = useI18n();
  const projectId = useSignal(projectIdSignal);
  const [activeLink, setActiveLink] = useState<ActiveLink | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDarkTheme = false;
  const hasScrolledIntoView = activeLink !== null;

  useEffect(() => {
    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: section === "about" ? "top 22.5%" : "top center",
        end: "bottom center",
        onEnter: () => setActiveLink(section),
        onEnterBack: () => setActiveLink(section),
        onLeave: () => setActiveLink(null),
        onLeaveBack: () => setActiveLink(null),
      }),
    );
    ScrollTrigger.refresh();
    containerRef.current?.classList.add("header-home-mounted");
    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  const index = activeLink ? sections.indexOf(activeLink) : 0;

  return (
    <div
      ref={containerRef}
      className={[
        "header-home",
        projectId !== null ? "header-home-isProjectPage" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "header-home-links",
          isDarkTheme ? "header-home-links-dark" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className={[
            "header-home-bar",
            activeLink !== null && hasScrolledIntoView
              ? "header-home-bar-active"
              : "",
            isDarkTheme ? "header-home-bar-dark" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ transform: `translateX(${index * ITEM_WIDTH}px)` }}
        />
        {sections.map((section) => (
          <button
            key={section}
            type="button"
            className={[
              "header-home-link",
              activeLink === section && hasScrolledIntoView
                ? "header-home-link-active"
                : "",
              "children-unclickable",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => lenis.value?.scrollTo(`#${section}`)}
            aria-label={t(section)}
            data-sound="click"
            data-hoversound="hover"
          >
            {t(section)}
          </button>
        ))}
      </div>
    </div>
  );
}

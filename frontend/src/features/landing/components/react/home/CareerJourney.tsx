import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import type { PublishedWorkExperience } from "../../../api/landing.types";
import { useI18n } from "../../../hooks/useI18n";
import { usePortfolioData } from "../../../hooks/usePortfolioData";
import { Banner } from "../Banner";

gsap.registerPlugin(ScrollTrigger);

export function CareerJourney({ id }: { id?: string }) {
  const { t } = useI18n();
  const { workExperiences } = usePortfolioData();
  const sectionRef = useRef<HTMLElement | null>(null);

  const entries = useMemo(
    () => workExperiences?.filter((entry) => entry.role && entry.company) ?? [],
    [workExperiences],
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".career-journey-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 72%",
            scrub: true,
          },
        },
      );

      gsap.utils
        .toArray<HTMLElement>(".career-journey-item")
        .forEach((item) => {
          gsap.fromTo(
            item,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, [entries.length]);

  if (!workExperiences) {
    return null;
  }

  return (
    <section ref={sectionRef} className="career-journey" id={id}>
      <div className="grid">
        <div className="career-journey-title">
          <Banner
            className="career-journey-title-banner"
            copy={t("career-label")}
            size="sm"
            animated
          />
          <h2 className="career-journey-title-copy">{t("career-journey")}</h2>
        </div>
      </div>

      <div className="career-journey-timeline" aria-label={t("career-journey")}>
        <div className="career-journey-line" aria-hidden="true">
          <div className="career-journey-line-fill" />
        </div>

        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <CareerJourneyItem key={entry.id} entry={entry} index={index} />
          ))
        ) : (
          <CareerJourneyEmptyState />
        )}
      </div>
    </section>
  );
}

function CareerJourneyItem({
  entry,
  index,
}: {
  entry: PublishedWorkExperience;
  index: number;
}) {
  const logoUrl = resolveAssetUrl(entry.companyLogoUrl);
  const alignment = index % 2 === 0 ? "left" : "right";

  return (
    <article
      className={[
        "career-journey-item",
        `career-journey-item-${alignment}`,
      ].join(" ")}
    >
      <div className="career-journey-marker" aria-hidden="true" />
      <div className="career-journey-card">
        <div className="career-journey-card-top">
          <CompanyLogo name={entry.company} logoUrl={logoUrl} />
          <div className="career-journey-card-heading">
            <time className="career-journey-date">{entry.date}</time>
            <h3>{entry.role}</h3>
            <p>{entry.company}</p>
          </div>
        </div>

        {entry.description ? (
          <p className="career-journey-description">{entry.description}</p>
        ) : null}

        {entry.descriptionBullets.length > 0 ? (
          <ul className="career-journey-bullets">
            {entry.descriptionBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

function CompanyLogo({
  name,
  logoUrl,
}: {
  name: string;
  logoUrl: string | null;
}) {
  if (logoUrl) {
    return (
      <img className="career-journey-logo" src={logoUrl} alt={`${name} logo`} />
    );
  }

  return (
    <div className="career-journey-logo career-journey-logo-fallback">
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}

function CareerJourneyEmptyState() {
  const { t } = useI18n();

  return (
    <div className="career-journey-empty">
      <p>{t("career-empty")}</p>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { Vector3 } from "three";
import { transitions } from "../../../animations";
import { aboutProgress } from "../../../animations/transitions/about";
import { useI18n } from "../../../hooks/useI18n";
import { useSignal } from "../../../hooks/useSignal";
import { locale } from "../../../i18n/store";
import { AppearingText } from "../AppearingText";
import { Pin } from "../icons";
import { ProjectedElement } from "../ProjectedElement";

const detailsPoint = new Vector3(-0.76, 3.6, 6.75);
const descriptionPoint = new Vector3(-0.9, 2, 6.75);
const servicesPoint = new Vector3(0.75, 2.75, 6.75);

export function About({
  spacerRef,
}: {
  spacerRef: RefObject<HTMLDivElement | null>;
}) {
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const spacerEl = spacerRef.current;
    if (
      !spacerEl ||
      !detailsRef.current ||
      !descriptionRef.current ||
      !servicesRef.current ||
      !progressRef.current
    )
      return;

    transitions.about.setup({
      about: spacerEl,
      contentDescription: descriptionRef.current,
      tlDescription: gsap.timeline({ paused: true }),
      contentServices: servicesRef.current,
      tlServices: gsap.timeline({ paused: true }),
      contentDetails: detailsRef.current,
      tlDetails: gsap.timeline({ paused: true }),
      contentProgressCount: progressRef.current,
    });

    return () => transitions.about.destroy();
  }, [spacerRef]);

  return (
    <div className="about-content">
      <div ref={detailsRef} className="about-details">
        <BoxDetails />
      </div>
      <div ref={descriptionRef} className="about-description">
        <BoxDescription />
      </div>
      <div ref={servicesRef} className="about-services">
        <BoxServices />
      </div>
      <div ref={progressRef} className="about-progress-count">
        <ProgressCount />
      </div>
    </div>
  );
}

function BoxDetails() {
  const { t } = useI18n();

  return (
    <ProjectedElement point={detailsPoint}>
      <div className="box-details">
        <div className="box-details-content">
          <div className="box-details-title">
            <AppearingText text="David" steps={1} duration={0.35} />
          </div>
          <div className="box-details-items">
            <div className="box-details-item">
              <Pin className="box-details-icon" />
              {t("germany") ? (
                <AppearingText
                  className="box-details-content-copy"
                  text={t("germany")}
                  steps={3}
                  duration={0.35}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ProjectedElement>
  );
}

function BoxDescription() {
  const { t } = useI18n();

  return (
    <ProjectedElement point={descriptionPoint}>
      <div className="box-description">
        <div className="box-description-content">
          <div className="box-description-details">
            <p className="box-description-details-name">David</p>
            <div className="box-description-details-location">
              <Pin className="box-description-details-location-icon" />
              <p className="box-description-details-location-copy">
                {t("germany")}
              </p>
            </div>
          </div>
          <div className="box-description-line" />
          <div className="box-description-copy">
            <AppearingText text={t("about-tagline")} steps={3} duration={0.7} />
          </div>
        </div>
      </div>
    </ProjectedElement>
  );
}

function BoxServices() {
  const activeLocale = useSignal(locale);
  const { t } = useI18n();
  const services =
    activeLocale === "de"
      ? [
          "Three.js & WebGL",
          "Node.js & WebSockets",
          "React & Vue",
          "Kubernetes & Redis",
          "Echtzeit-Mehrspieler",
        ]
      : [
          "Three.js & WebGL",
          "Node.js & WebSockets",
          "React & Vue",
          "Kubernetes & Redis",
          "Real-time Multiplayer",
        ];

  return (
    <ProjectedElement point={servicesPoint}>
      <div className="box-services">
        <div className="box-services-content">
          <div className="box-services-title">
            <AppearingText text={t("services")} steps={1} duration={0.35} />
          </div>
          <div className="box-services-list">
            {services.map((service) => (
              <div className="box-services-list-item" key={service}>
                <div className="box-services-list-item-name">
                  <AppearingText text={service} steps={1} duration={0.35} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProjectedElement>
  );
}

function ProgressCount() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = () => setProgress(Math.round(aboutProgress.value * 1000) / 10);
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className="progress-count grid">
      <div className="progress-count-bar">
        <div
          className="progress-count-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="progress-count-percentage">{Math.round(progress)}%</p>
    </div>
  );
}

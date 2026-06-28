import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { three } from "../three";
import { animations } from "../animations";
import { renderer } from "../three/core/renderer";
import { raycast } from "../three/utils/raycast";
import { Layout } from "../components/react/Layout";
import { Hero } from "../components/react/home/Hero";
import { About } from "../components/react/home/About";
import { Projects } from "../components/react/home/Projects";
import { Contact } from "../components/react/home/Contact";
import { Footer } from "../components/react/Footer";
import { HeaderHome } from "../components/react/HeaderHome";
import { ScrollIcon } from "../components/react/ScrollIcon";
import { useAgent } from "../hooks/useAgent";
import { useSignal } from "../hooks/useSignal";
import {
  isTransitioningSignal,
  projectIdSignal,
  projectVisibleSignal,
} from "../store/routeStore";
import { preloaderVisible } from "../hooks/usePreloader";

export function HomePage() {
  const introRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const aboutSpacerRef = useRef<HTMLDivElement | null>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrolledPastIntro, setScrolledPastIntro] = useState(false);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [contactBottom, setContactBottom] = useState(0);
  const [threeInitialized, setThreeInitialized] = useState(false);
  const projectId = useSignal(projectIdSignal);
  const projectVisible = useSignal(projectVisibleSignal);
  const isTransitioning = useSignal(isTransitioningSignal);
  const isPreloaderVisible = useSignal(preloaderVisible);
  const { isTouch } = useAgent();

  const isStickyVisible = useMemo(
    () => scrolledPastIntro || !projectsLoaded,
    [projectsLoaded, scrolledPastIntro],
  );

  useEffect(() => {
    if (!introRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      setScrolledPastIntro(entries[0]?.isIntersecting ?? false);
    });
    observer.observe(introRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (threeCanvasRef.current) {
      three.init(threeCanvasRef.current);
      setThreeInitialized(true);
    }

    return () => {
      three.destroy();
      animations.destroy();
    };
  }, []);

  useEffect(() => {
    if (!contactRef.current) return;

    let frame = 0;

    const updateContactBottomOffset = () => {
      if (!contactRef.current) return;

      const contactBottomEdge =
        contactRef.current.getBoundingClientRect().bottom + window.scrollY;
      const footer = contactRef.current
        .nextElementSibling as HTMLElement | null;
      const footerBottomEdge = footer
        ? footer.getBoundingClientRect().bottom + window.scrollY
        : contactBottomEdge;

      setContactBottom(
        Math.max(0, Math.round(footerBottomEdge - contactBottomEdge)),
      );

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    updateContactBottomOffset();
    const resizeObserver = new ResizeObserver(updateContactBottomOffset);
    resizeObserver.observe(contactRef.current);
    const footer = contactRef.current.nextElementSibling;
    if (footer) resizeObserver.observe(footer);
    window.addEventListener("resize", updateContactBottomOffset);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateContactBottomOffset);
    };
  }, [projectVisible, isTransitioning, projectsLoaded]);

  useEffect(() => {
    const updateCursor = () => {
      if (isTouch) return;
      document.documentElement.style.cursor = raycast.getHoveringBox()
        ? "pointer"
        : "";
    };

    gsap.ticker.add(updateCursor);
    return () => {
      document.documentElement.style.cursor = "";
      gsap.ticker.remove(updateCursor);
    };
  }, [isTouch]);

  useEffect(() => {
    if (projectsLoaded && threeInitialized && !isPreloaderVisible) {
      animations.init();
      ScrollTrigger.refresh();
    }
    return () => animations.destroy();
  }, [isPreloaderVisible, projectsLoaded, threeInitialized]);

  useEffect(() => {
    renderer.setIsActive(!projectVisible);
  }, [projectVisible]);

  return (
    <>
      <div
        className={[
          "home-wrapper",
          projectId !== null && isTransitioning ? "home-wrapper-out" : "",
          projectId === null && isTransitioning ? "home-wrapper-in" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <ScrollIcon />
        <Layout>
          <div className="intro-wrapper" ref={introRef}>
            <div
              className={[
                "intro-sticky",
                isStickyVisible ? "intro-sticky-visible" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--contact-bottom": `${contactBottom}px`,
                } as React.CSSProperties
              }
            >
              <canvas
                className={[
                  "three-canvas",
                  !isStickyVisible ? "three-canvas-contact" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                ref={threeCanvasRef}
              />
              <div
                className={!isStickyVisible ? "intro-about-hidden" : undefined}
              >
                <About spacerRef={aboutSpacerRef} />
              </div>
            </div>
            <Hero className="intro-hero" />
            <div className="intro-wrapper-spacer" />
            <div className="about-spacer" ref={aboutSpacerRef} id="about" />
          </div>
          <Projects id="projects" onLoaded={() => setProjectsLoaded(true)} />

          <div ref={contactRef} className="home-contact">
            {projectsLoaded ? <Contact id="contact" /> : null}
          </div>
          <Footer withSocial={false} />
        </Layout>
      </div>
      {projectsLoaded ? <HeaderHome /> : null}
    </>
  );
}

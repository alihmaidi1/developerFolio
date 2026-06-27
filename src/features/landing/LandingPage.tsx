import { useEffect, useRef } from "react";
import { useTheme } from "@/shared/theme/ThemeContext";
import { ErrorState } from "@/shared/ui";
import Loading from "@/shared/ui/loading/Loading";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { NotchBar } from "./components/notch-bar/NotchBar";
import { CustomCursor } from "./components/custom-cursor/CustomCursor";
import { SmoothScroll } from "./components/smooth-scroll/SmoothScroll";
import { SoundProvider } from "./components/sound/SoundProvider";
import { ProjectOverlayProvider } from "./components/project-overlay/ProjectOverlayProvider";
import { ProjectOverlay } from "./components/project-overlay/ProjectOverlay";
import { BackgroundLab } from "./components/background-lab/BackgroundLab";
import { useLandingProjects, useLandingSettings } from "./hooks/useLandingData";
import { ContactSection } from "./sections/ContactSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { OpenSourceSection } from "./sections/OpenSourceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import "./landing.tokens.css";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const { isDark } = useTheme();
  const settingsQuery = useLandingSettings();
  const projectsQuery = useLandingProjects();
  const scrollBarRef = useRef<HTMLDivElement>(null);

  // Top scroll-progress bar
  useEffect(() => {
    const update = () => {
      const node = scrollBarRef.current;
      if (!node) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      node.style.transform = `scaleX(${ratio})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Loading shell (settings is the hero's source of truth)
  if (settingsQuery.isPending) {
    return (
      <div className={`landing ${!isDark ? "landing--light" : ""}`}>
        <div className={styles.fullFeedback}>
          <Loading />
        </div>
      </div>
    );
  }

  if (settingsQuery.isError) {
    return (
      <div className={`landing ${!isDark ? "landing--light" : ""}`}>
        <div className={styles.fullFeedback}>
          <ErrorState
            title="Couldn't load the portfolio"
            description="Please check the API and try again."
            actionLabel="Retry"
            onAction={() => void settingsQuery.refetch()}
          />
        </div>
      </div>
    );
  }

  const { greeting, contact, socialLinks } = settingsQuery.data;

  if (!greeting.displayGreeting) {
    // If the greeting is hidden, the entire landing has no entry point — show nothing graceful.
    return null;
  }

  return (
    <SoundProvider>
      <SmoothScroll>
        <ProjectOverlayProvider projects={projectsQuery.data ?? []}>
          <div className={`landing ${!isDark ? "landing--light" : ""}`}>
            <BackgroundLab />

            <div
              ref={scrollBarRef}
              className={styles.scrollBar}
              aria-hidden="true"
            />

            <NotchBar brand={greeting.username} />

            <Navbar
              brand={greeting.username}
              contactHref={
                contact.email ? `mailto:${contact.email}` : "#contact"
              }
            />

            <main>
              <HeroSection greeting={greeting} />

              <div className={styles.divider} aria-hidden="true" />
              <ProjectsSection />

              <div className={styles.divider} aria-hidden="true" />
              <OpenSourceSection />

              <div className={styles.divider} aria-hidden="true" />
              <SkillsSection />

              <div className={styles.divider} aria-hidden="true" />
              <ExperienceSection />

              <div className={styles.divider} aria-hidden="true" />
              <EducationSection />

              <div className={styles.divider} aria-hidden="true" />
              <ContactSection contact={contact} socialLinks={socialLinks} />
            </main>

            <Footer brand={greeting.username} socials={socialLinks} />

            <ProjectOverlay />
            <CustomCursor />
          </div>
        </ProjectOverlayProvider>
      </SmoothScroll>
    </SoundProvider>
  );
}

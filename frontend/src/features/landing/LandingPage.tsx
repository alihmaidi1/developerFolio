import { useRef } from "react";
import "./landing.css";
import { LandingHeader } from "./components/LandingHeader/LandingHeader";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { SkillsSection } from "./components/SkillsSection/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection/ProjectsSection";
import { CareerJourneySection } from "./components/CareerJourneySection/CareerJourneySection";
import { EducationSection } from "./components/EducationSection/EducationSection";
import { ContactSection } from "./components/ContactSection/ContactSection";
import { LandingFooter } from "./components/LandingFooter/LandingFooter";
import { LandingSkeleton } from "./components/LandingSkeleton/LandingSkeleton";
import { useLandingPageData } from "./hooks/useLandingPageData";
import { useLandingAnimations } from "./hooks/useLandingAnimations";

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useLandingPageData();

  useLandingAnimations({ scope: rootRef, enabled: !isLoading });

  return (
    <div ref={rootRef} className="landing-root">
      <div
        className="landing-progress"
        data-scroll-progress
        aria-hidden="true"
      />
      <LandingHeader />
      {isLoading ? (
        <LandingSkeleton />
      ) : (
        <main>
          <HeroSection hero={data.hero} />
          <SkillsSection
            capabilities={data.capabilities}
            skills={data.skills}
          />
          <ProjectsSection projects={data.projects} />
          <CareerJourneySection steps={data.career} />
          <EducationSection education={data.education} />
          <ContactSection contact={data.contact} social={data.social} />
        </main>
      )}
      <LandingFooter />
    </div>
  );
}

export default LandingPage;

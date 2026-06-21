import { useEffect, useState } from "react";
import {
  Achievement,
  Blogs,
  ContactProfile,
  Education,
  Footer,
  Greeting,
  Header,
  Podcast,
  Projects,
  SkillProgress,
  Skills,
  SplashScreen,
  StartupProjects,
  Talks,
  Twitter,
  WorkExperience,
  splashScreen,
} from "@/features/portfolio";
import { ScrollToTop } from "@/shared/ui";
import "./PortfolioPage.scss";

export default function PortfolioPage() {
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  useEffect(() => {
    if (!splashScreen.enabled) {
      return;
    }

    const splashTimer = window.setTimeout(
      () => setIsShowingSplashAnimation(false),
      splashScreen.duration,
    );
    return () => window.clearTimeout(splashTimer);
  }, []);

  if (isShowingSplashAnimation && splashScreen.enabled) {
    return <SplashScreen />;
  }

  return (
    <>
      <Header />
      <Greeting />
      <Skills />
      <SkillProgress />
      <Education />
      <WorkExperience />
      <Projects />
      <StartupProjects />
      <Achievement />
      <Blogs />
      <Talks />
      <Twitter />
      <Podcast />
      <ContactProfile />
      <Footer />
      <ScrollToTop />
    </>
  );
}

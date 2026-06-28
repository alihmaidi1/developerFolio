import { Outlet } from "react-router-dom";
import { Header } from "../components/react/Header";
import { Cursor } from "../components/react/Cursor";
import { LandingPreloader } from "../components/react/LandingPreloader";
import { HomePage } from "../pages/HomePage";
import { useAgent } from "../hooks/useAgent";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { usePreloader } from "../hooks/usePreloader";
import { useScroll } from "../hooks/useScroll";

export function RootLayout() {
  const { isTouch } = useAgent();
  const { isLoading } = usePortfolioData();
  const { isVisible, progress } = usePreloader(isLoading);

  useScroll();

  return (
    <>
      <LandingPreloader isVisible={isVisible} progress={progress} />
      <Header />
      <HomePage />
      {!isTouch ? <Cursor /> : null}
      <Outlet />
    </>
  );
}

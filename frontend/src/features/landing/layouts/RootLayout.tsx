import { Outlet } from "react-router-dom";
import { Header } from "../components/react/Header";
import { Cursor } from "../components/react/Cursor";
import { HomePage } from "../pages/HomePage";
import { useAgent } from "../hooks/useAgent";
import { usePreloader } from "../hooks/usePreloader";
import { useScroll } from "../hooks/useScroll";

export function RootLayout() {
  const { isTouch } = useAgent();

  usePreloader();
  useScroll();

  return (
    <>
      <Header />
      <HomePage />
      {!isTouch ? <Cursor /> : null}
      <Outlet />
    </>
  );
}

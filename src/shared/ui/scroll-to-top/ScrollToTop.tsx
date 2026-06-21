import { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import "./ScrollToTop.scss";

export default function Top() {
  useEffect(() => {
    const updateVisibility = () => {
      const button = document.getElementById("topButton");
      if (!button) {
        return;
      }

      const hasScrolled =
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
      button.style.visibility = hasScrolled ? "visible" : "hidden";
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button onClick={scrollToTop} id="topButton" title="Go to top">
      <ArrowUp aria-hidden />
    </button>
  );
}

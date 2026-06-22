import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import styles from "./ScrollToTop.module.css";

export default function Top() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const hasScrolled =
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
      setIsVisible(hasScrolled);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      className={cn(styles.button, isVisible && styles.visible)}
      type="button"
      onClick={scrollToTop}
      title="Go to top"
      aria-label="Scroll to top"
    >
      <ArrowUp aria-hidden />
    </button>
  );
}

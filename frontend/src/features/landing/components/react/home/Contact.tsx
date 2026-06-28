import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { transitions } from "../../../animations";
import { useI18n } from "../../../hooks/useI18n";
import { Social } from "../Social";

export function Contact({ id }: { id?: string }) {
  const contactElement = useRef<HTMLDivElement | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    if (!contactElement.current) return undefined;

    transitions.contact.setup(contactElement.current);
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(frame);
      transitions.contact.destroy();
    };
  }, []);

  return (
    <div className="contact grid" ref={contactElement} id={id}>
      <div className="contact-content">
        <h2
          className="contact-title"
          dangerouslySetInnerHTML={{ __html: t("lets-work-together") }}
        />
        <Social variant="background" />
      </div>
    </div>
  );
}

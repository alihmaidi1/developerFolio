import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "./sound-context";
import styles from "./SoundToggle.module.css";

export function SoundToggle() {
  const { enabled, toggle, playSoft } = useSound();

  const handleToggle = () => {
    toggle();
    // Play a tiny confirmation chime on enable so users hear "it's on now".
    if (!enabled) {
      // Defer to next tick so the freshly-mounted context exists.
      setTimeout(playSoft, 0);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.toggle} ${enabled ? styles.on : ""}`}
      onClick={handleToggle}
      data-sound="toggle"
      data-cursor="hover"
      aria-label={enabled ? "Mute UI sounds" : "Enable UI sounds"}
      aria-pressed={enabled}
    >
      {enabled ? (
        <Volume2 aria-hidden="true" />
      ) : (
        <VolumeX aria-hidden="true" />
      )}
    </button>
  );
}

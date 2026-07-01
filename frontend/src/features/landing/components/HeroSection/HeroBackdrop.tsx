import { useState } from "react";
import styles from "./HeroBackdrop.module.css";

// Drop a generated (Nano Banana / Gemini) image here to replace the CSS
// cinematic fallback. If the file is absent the <img> onError hides it and the
// aurora/orbs/grain layers below carry the hero on their own.
const HERO_BACKDROP_URL = "/hero/hero-backdrop.webp";

export function HeroBackdrop() {
  const [hasImage, setHasImage] = useState(true);

  return (
    <div className={styles.backdrop} aria-hidden="true">
      {/* CSS cinematic fallback — always rendered beneath the image */}
      <div className={styles.aurora} data-hero-parallax="aurora" />
      <div className={styles.orbs} data-hero-parallax="orbs">
        <span className={`${styles.orb} ${styles.orbA}`} />
        <span className={`${styles.orb} ${styles.orbB}`} />
        <span className={`${styles.orb} ${styles.orbC}`} />
      </div>
      <div className={styles.mesh} />

      {/* Optional generated image on top of the fallback. The wrapper carries
          the scroll-parallax transform; the inner <img> runs its own Ken Burns
          drift so the two transforms never fight. */}
      {hasImage ? (
        <div className={styles.imageWrap} data-hero-parallax="image">
          <img
            className={styles.image}
            src={HERO_BACKDROP_URL}
            alt=""
            loading="eager"
            decoding="async"
            onError={() => setHasImage(false)}
          />
        </div>
      ) : null}

      {/* Grain + legibility scrim + vignette sit above everything */}
      <div className={styles.grain} />
      <div className={styles.scrim} />
      <div className={styles.vignette} />
    </div>
  );
}

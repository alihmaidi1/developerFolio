import styles from "./LandingSkeleton.module.css";

function Block({
  className = "",
  rounded = false,
}: {
  className?: string;
  rounded?: boolean;
}) {
  return (
    <span
      className={`${styles.shimmer} ${rounded ? styles.rounded : ""} ${className}`}
      aria-hidden="true"
    />
  );
}

export function LandingSkeleton() {
  return (
    <main className={styles.skeleton} aria-busy="true" aria-label="Loading">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Block className={styles.badge} rounded />
          <Block className={styles.heroTitleA} />
          <Block className={styles.heroTitleB} />
          <Block className={styles.heroLineA} />
          <Block className={styles.heroLineB} />
          <div className={styles.actions}>
            <Block className={styles.actionPrimary} rounded />
            <Block className={styles.actionSecondary} rounded />
          </div>
          <div className={styles.chips}>
            {Array.from({ length: 5 }, (_, index) => (
              <Block key={index} className={styles.chip} rounded />
            ))}
          </div>
        </div>

        <div className={styles.scene}>
          <Block className={styles.scenePill} rounded />
          <Block className={styles.sceneOrb} rounded />
          <div className={styles.sceneLines}>
            {Array.from({ length: 4 }, (_, index) => (
              <Block key={index} className={styles.sceneLine} />
            ))}
          </div>
        </div>
      </section>

      <SkeletonSection variant="profile" />
      <SkeletonSection variant="skills" />
      <SkeletonSection variant="projects" />
      <SkeletonSection variant="career" />
      <SkeletonSection variant="contact" />
    </main>
  );
}

function SectionHeader() {
  return (
    <div className={styles.sectionHead}>
      <Block className={styles.eyebrow} rounded />
      <Block className={styles.sectionTitle} />
      <Block className={styles.sectionLead} />
    </div>
  );
}

function SkeletonSection({
  variant,
}: {
  variant: "profile" | "skills" | "projects" | "career" | "contact";
}) {
  if (variant === "profile") {
    return (
      <section className={`landing-section ${styles.section}`}>
        <SectionHeader />
        <div className={styles.profileGrid}>
          <Block className={styles.profileBody} />
          <div className={styles.statGrid}>
            {Array.from({ length: 3 }, (_, index) => (
              <div className={styles.stat} key={index}>
                <Block className={styles.statValue} />
                <Block className={styles.statLabel} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "skills") {
    return (
      <section className={`landing-section ${styles.section}`}>
        <SectionHeader />
        <div className={styles.skillsGrid}>
          <div className={styles.capabilityList}>
            {Array.from({ length: 4 }, (_, index) => (
              <Block key={index} className={styles.capability} />
            ))}
          </div>
          <div className={styles.skillTiles}>
            {Array.from({ length: 12 }, (_, index) => (
              <Block key={index} className={styles.skillTile} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "projects") {
    return (
      <section className={`landing-section ${styles.section}`}>
        <SectionHeader />
        <div className={styles.projectGrid}>
          {Array.from({ length: 3 }, (_, index) => (
            <div className={styles.project} key={index}>
              <Block className={styles.projectMedia} />
              <Block className={styles.projectTitle} />
              <Block className={styles.projectBody} />
              <div className={styles.projectTags}>
                <Block className={styles.projectTag} rounded />
                <Block className={styles.projectTag} rounded />
                <Block className={styles.projectTagShort} rounded />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (variant === "career") {
    return (
      <section className={`landing-section ${styles.section}`}>
        <SectionHeader />
        <div className={styles.timeline}>
          <span className={styles.timelineSpine} aria-hidden="true" />
          {Array.from({ length: 4 }, (_, index) => (
            <div className={styles.timelineItem} key={index}>
              <Block className={styles.timelineDot} rounded />
              <Block className={styles.timelineCard} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`landing-section ${styles.section}`}>
      <SectionHeader />
      <div className={styles.contactGrid}>
        <div className={styles.terminal}>
          <Block className={styles.terminalBar} />
          {Array.from({ length: 5 }, (_, index) => (
            <Block key={index} className={styles.terminalLine} />
          ))}
        </div>
        <div className={styles.contactAside}>
          <Block className={styles.contactText} />
          <Block className={styles.contactButton} rounded />
          <div className={styles.contactLinks}>
            <Block className={styles.contactLink} rounded />
            <Block className={styles.contactLink} rounded />
            <Block className={styles.contactLink} rounded />
          </div>
        </div>
      </div>
    </section>
  );
}

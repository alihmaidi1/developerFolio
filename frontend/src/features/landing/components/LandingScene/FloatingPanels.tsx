import styles from "./LandingScene.module.css";

const PANEL_ITEMS = [
  { key: "api", label: "API", cls: styles.p1 },
  { key: "dotnet", label: ".NET", cls: styles.p2 },
  { key: "react", label: "React", cls: styles.p3 },
  { key: "docker", label: "Docker", cls: styles.p4 },
  { key: "sql", label: "SQL", cls: styles.p5 },
];

export function FloatingPanels() {
  return (
    <div className={styles.floatingPanels} aria-hidden="true">
      {PANEL_ITEMS.map((panel, index) => (
        <span
          key={panel.key}
          className={`${styles.panel} ${panel.cls}`}
          data-anim="floating-panel"
          data-panel-index={index}
        >
          {panel.label}
        </span>
      ))}
    </div>
  );
}

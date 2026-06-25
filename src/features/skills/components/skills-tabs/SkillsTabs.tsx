import { cn } from "@/shared/lib/cn";
import styles from "./SkillsTabs.module.css";

export type SkillsTab = "statements" | "software";

interface SkillsTabsProps {
  active: SkillsTab;
  statementsCount: number;
  softwareCount: number;
  onChange: (tab: SkillsTab) => void;
}

export function SkillsTabs({
  active,
  statementsCount,
  softwareCount,
  onChange,
}: SkillsTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Skills tabs">
      <button
        type="button"
        role="tab"
        aria-selected={active === "statements"}
        className={cn(styles.tab, active === "statements" && styles.tabActive)}
        onClick={() => onChange("statements")}
      >
        Statements
        <span className={styles.count}>{statementsCount}</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === "software"}
        className={cn(styles.tab, active === "software" && styles.tabActive)}
        onClick={() => onChange("software")}
      >
        Software skills
        <span className={styles.count}>{softwareCount}</span>
      </button>
    </div>
  );
}

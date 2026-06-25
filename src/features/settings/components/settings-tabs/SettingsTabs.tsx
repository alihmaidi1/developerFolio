import { cn } from "@/shared/lib/cn";
import styles from "./SettingsTabs.module.css";

export type SettingsTab = "greeting" | "contact" | "social";

interface SettingsTabsProps {
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

const tabs: { id: SettingsTab; label: string }[] = [
  { id: "greeting", label: "Greeting" },
  { id: "contact", label: "Contact" },
  { id: "social", label: "Social links" },
];

export function SettingsTabs({ active, onChange }: SettingsTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Settings tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={cn(styles.tab, active === tab.id && styles.tabActive)}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

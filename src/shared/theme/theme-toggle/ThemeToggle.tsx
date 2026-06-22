import emoji from "react-easy-emoji";
import { useTheme } from "@/shared/theme/ThemeContext";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { isDark, changeTheme } = useTheme();

  return (
    <label className={styles.switch}>
      <input
        className={styles.input}
        type="checkbox"
        checked={isDark}
        onChange={changeTheme}
        aria-label="Toggle color theme"
      />
      <span className={styles.slider}>
        <span className={styles.emoji}>
          {isDark ? emoji("🌜") : emoji("☀️")}
        </span>
      </span>
    </label>
  );
}

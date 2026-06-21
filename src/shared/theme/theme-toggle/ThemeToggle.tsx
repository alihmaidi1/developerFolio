import emoji from "react-easy-emoji";
import { useTheme } from "@/shared/theme/ThemeContext";
import "./ThemeToggle.scss";

export default function ThemeToggle() {
  const { isDark, changeTheme } = useTheme();

  return (
    <label className="switch">
      <input type="checkbox" checked={isDark} onChange={changeTheme} />
      <span className="slider round">
        <span className="emoji">{isDark ? emoji("🌜") : emoji("☀️")}</span>
      </span>
    </label>
  );
}

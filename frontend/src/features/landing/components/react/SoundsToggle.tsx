import { useSignal } from "../../hooks/useSignal";
import { setSoundsEnabled, soundsEnabled } from "../../store/soundStore";
import { Volume } from "./icons";

export function SoundsToggle({
  isDarkTheme = false,
  className = "",
}: {
  isDarkTheme?: boolean;
  className?: string;
}) {
  const enabled = useSignal(soundsEnabled);

  return (
    <button
      type="button"
      className={[
        "music-toggle",
        isDarkTheme ? "music-toggle-dark" : "",
        "children-unclickable",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => setSoundsEnabled(!enabled)}
      aria-pressed={enabled}
      data-sound="click"
      data-hoversound="hover"
    >
      <Volume active={enabled} className="music-toggle-icon" />
    </button>
  );
}

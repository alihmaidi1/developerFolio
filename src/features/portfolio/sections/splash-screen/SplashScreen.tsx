import "./SplashScreen.css";
import DisplayLottie from "@/shared/ui/display-lottie/DisplayLottie";
import {
  greeting,
  splashScreen,
} from "@/features/portfolio/config/portfolio.config";
import { useTheme } from "@/shared/theme/ThemeContext";
import { cn } from "@/shared/lib/cn";

export default function SplashScreen() {
  const { isDark } = useTheme();
  return (
    <div className={cn("splash-container", isDark && "dark-mode")}>
      <div className="splash-animation-container">
        <DisplayLottie animationData={splashScreen.animation} />
      </div>
      <div className="splash-title-container">
        <span className="grey-color"> &lt;</span>
        <span className="splash-title">{greeting.username}</span>
        <span className="grey-color">/&gt;</span>
      </div>
    </div>
  );
}

import "./Footer.scss";
import { Fade } from "@/shared/ui/reveal/Reveal";
import emoji from "react-easy-emoji";
import { useTheme } from "@/shared/theme/ThemeContext";
import { cn } from "@/shared/lib/cn";

export default function Footer() {
  const { isDark } = useTheme();
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className={cn("footer-text", isDark && "dark-mode")}>
          {emoji("Made with ❤️ by DeveloperFolio Team")}
        </p>
        <p className={cn("footer-text", isDark && "dark-mode")}>
          Theme by{" "}
          <a
            href="https://github.com/saadpasta/developerFolio"
            target="_blank"
            rel="noreferrer"
          >
            developerFolio
          </a>
        </p>
      </div>
    </Fade>
  );
}

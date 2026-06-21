import { useEffect } from "react";
import "./Twitter.scss";
import { twitterDetails } from "@/features/portfolio/config/portfolio.config";
import { useTheme } from "@/shared/theme/ThemeContext";

const TWITTER_WIDGET_SCRIPT_ID = "twitter-widgets-script";

export default function Twitter() {
  const { isDark } = useTheme();

  useEffect(() => {
    if (document.getElementById(TWITTER_WIDGET_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = TWITTER_WIDGET_SCRIPT_ID;
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!twitterDetails.display || !twitterDetails.userName) {
    return null;
  }

  const profileUrl = `https://twitter.com/${twitterDetails.userName}`;

  return (
    <div className="tw-main-div" id="twitter">
      <div className="centerContent">
        <a
          className="twitter-timeline"
          data-height="400"
          data-theme={isDark ? "dark" : "light"}
          href={profileUrl}
        >
          Posts by @{twitterDetails.userName}
        </a>
      </div>
    </div>
  );
}

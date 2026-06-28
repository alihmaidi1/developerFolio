import { social } from "../../content/social";
import { Link } from "./Link";

export function Social({
  variant = "default",
}: {
  variant?: "default" | "background";
}) {
  return (
    <div className={["social", `social-variant-${variant}`].join(" ")}>
      {social.map((item) => (
        <Link
          key={item.name}
          href={item.url}
          external={item.url.startsWith("http")}
          className="social-link children-unclickable"
          data-cursor={
            item.url.startsWith("http") ? "arrow-external" : "circle-white"
          }
          data-hoversound="hover"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

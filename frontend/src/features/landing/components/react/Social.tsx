import { usePortfolioData } from "../../hooks/usePortfolioData";
import { Link } from "./Link";

export function Social({
  variant = "default",
}: {
  variant?: "default" | "background";
}) {
  const { settings } = usePortfolioData();
  const socialLinks = settings?.socialLinks ?? [];

  return (
    <div className={["social", `social-variant-${variant}`].join(" ")}>
      {socialLinks.map((item) => (
        <Link
          key={item.id}
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

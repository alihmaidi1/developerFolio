import type { BlogCardData } from "@/features/portfolio/model/portfolio-content.types";
import { cn } from "@/shared/lib/cn";
import "./BlogCard.scss";

interface BlogCardProps {
  blog: BlogCardData;
  isDark: boolean;
}

export default function BlogCard({ blog, isDark }: BlogCardProps) {
  return (
    <div className={cn("blog-container", isDark && "dark-mode")}>
      <a
        className={cn("blog-card", isDark && "dark-mode blog-card-shadow")}
        href={blog.url}
        target="_blank"
        rel="noreferrer"
      >
        <h3 className={cn("blog-title", isDark && "small-dark")}>
          {blog.title}
        </h3>
        <p className={cn("small", isDark && "small-dark")}>
          {blog.description}
        </p>
        <div className="go-corner" aria-hidden="true">
          <div className="go-arrow">â†’</div>
        </div>
      </a>
    </div>
  );
}

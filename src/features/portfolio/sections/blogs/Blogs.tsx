import { useMediumBlogs } from "@/features/portfolio/hooks/useMediumBlogs";
import { cn } from "@/shared/lib/cn";
import { Fade } from "@/shared/ui/reveal/Reveal";
import BlogCard from "@/features/portfolio/components/blog-card/BlogCard";
import { blogSection } from "@/features/portfolio/config/portfolio.config";
import { useTheme } from "@/shared/theme/ThemeContext";
import "./Blogs.scss";

function extractTextContent(html: string): string {
  const documentFragment = new DOMParser().parseFromString(html, "text/html");
  return documentFragment.body.textContent?.trim() ?? "";
}

export default function Blogs() {
  const { isDark } = useTheme();
  const shouldLoadMediumBlogs =
    blogSection.display && blogSection.displayMediumBlogs;
  const {
    data: mediumBlogs = [],
    isError,
    isPending,
  } = useMediumBlogs(shouldLoadMediumBlogs);

  if (!blogSection.display) {
    return null;
  }

  const blogs =
    shouldLoadMediumBlogs && !isError && !isPending
      ? mediumBlogs.map((blog) => ({
          url: blog.link,
          title: blog.title,
          description: extractTextContent(blog.content),
        }))
      : blogSection.blogs;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="blogs">
        <div className="blog-header">
          <h1 className="blog-header-text">{blogSection.title}</h1>
          <p className={cn("blog-subtitle", isDark ? "dark-mode" : "subTitle")}>
            {blogSection.subtitle}
          </p>
        </div>
        <div className="blog-main-div">
          <div className="blog-text-div">
            {blogs.map((blog) => (
              <BlogCard key={blog.url} isDark={isDark} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
}

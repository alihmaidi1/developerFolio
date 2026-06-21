export const portfolioQueryKeys = {
  all: ["portfolio"] as const,
  githubData: () => [...portfolioQueryKeys.all, "github-data"] as const,
  mediumBlogs: () => [...portfolioQueryKeys.all, "medium-blogs"] as const,
};

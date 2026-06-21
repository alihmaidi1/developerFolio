import { z } from "zod";

const githubRepositorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  url: z.url(),
  forkCount: z.number(),
  diskUsage: z.number(),
  stargazers: z.object({ totalCount: z.number() }),
  primaryLanguage: z
    .object({
      name: z.string(),
      color: z.string(),
    })
    .nullable(),
});

const githubProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  avatarUrl: z.url(),
  location: z.string().nullable(),
  pinnedItems: z.object({
    edges: z.array(z.object({ node: githubRepositorySchema })),
  }),
});

export const githubDataSchema = z.object({
  data: z.object({
    user: githubProfileSchema,
  }),
});

export const mediumDataSchema = z.object({
  items: z.array(
    z.object({
      link: z.url(),
      title: z.string(),
      content: z.string(),
    }),
  ),
});

export type GithubProfile = z.infer<typeof githubProfileSchema>;
export type GithubRepositoryEdge =
  GithubProfile["pinnedItems"]["edges"][number];
export type MediumBlog = z.infer<typeof mediumDataSchema>["items"][number];

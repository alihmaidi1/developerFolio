import { apiClient } from "@/shared/lib/api-client";
import {
  githubDataSchema,
  mediumDataSchema,
  type GithubProfile,
  type MediumBlog,
} from "../model/portfolio.schemas";

async function getJsonFile(path: string): Promise<unknown> {
  const response = await apiClient.get<unknown>(path);
  return response.data;
}

export async function getGithubData(): Promise<GithubProfile> {
  const response = githubDataSchema.parse(await getJsonFile("profile.json"));
  return response.data.user;
}

export async function getMediumBlogs(): Promise<MediumBlog[]> {
  const response = mediumDataSchema.parse(await getJsonFile("blogs.json"));
  return response.items;
}

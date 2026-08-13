import axios from "axios";
import type { GitHubRepo } from "../types/repo";

export async function getReposByUsername(
  username: string,
): Promise<GitHubRepo[]> {
  const response = await axios.get<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos`,
  );

  return response.data;
}

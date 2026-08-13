export interface FavoriteRepository {
  id: number;
  githubRepoId: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  owner: string;
  createdAt: string;
}

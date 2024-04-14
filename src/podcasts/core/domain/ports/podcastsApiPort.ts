import { Podcast } from "../entities/podcast";

export interface IPodcastApi {
  fetchTopPodcasts(): Promise<Podcast[]>;
}

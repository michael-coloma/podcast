import { Podcast } from "../entities/podcast";
import { podcastDetails } from "../entities/podcastDetails";

export interface IPodcastApi {
  fetchTopPodcasts(): Promise<Podcast[]>;
  fetchPodcastDetail(podcastId: string): Promise<podcastDetails>;
}

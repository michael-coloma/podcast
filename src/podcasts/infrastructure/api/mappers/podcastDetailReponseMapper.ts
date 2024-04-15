import { Episode } from "../../../core/domain/entities/episode";
import { podcastDetails } from "../../../core/domain/entities/podcastDetails";

export interface ApiPodcastDetail {
  kind: "podcast";
  trackCount: number;
}

export interface ApiEpisode {
  kind: "podcast-episode";
  trackId: string;
  trackName: string;
  releaseDate: string; //FormatZulo: "2024-03-20T16:30:00Z",
  trackTimeMillis: number;
  episodeUrl: string;
  description: string;
}

export const mapPodcastDetail = (
  apiPodcastDetail: ApiPodcastDetail[], // it should be one element
  apiEpisodes: ApiEpisode[]
): podcastDetails => {
  const episodes: Episode[] = apiEpisodes.map((apiEpisode) => ({
    id: apiEpisode.trackId,
    title: apiEpisode.trackName,
    publicationDate: apiEpisode.releaseDate,
    duration: apiEpisode.trackTimeMillis,
    description: apiEpisode.description,
    audioUrl: apiEpisode.episodeUrl || "",
  }));

  return {
    numberEpisodes: apiPodcastDetail?.[0].trackCount || 0,
    episodes,
  };
};

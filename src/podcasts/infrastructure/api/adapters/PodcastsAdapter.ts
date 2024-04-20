import { Podcast } from "../../../core/domain/entities/podcast";
import { podcastDetails } from "../../../core/domain/entities/podcastDetails";
import { IPodcastApi } from "../../../core/domain/ports/podcastsApiPort";
import { PodcastsApiClient } from "../clients/PodcastsApiClient";
import { ApiEpisode, ApiPodcastDetails, mapPodcastDetail } from "../mappers/podcastDetailReponseMapper";
import { mapPodcastResponse } from "../mappers/podcastsResponseMapper";

export class PodcastAdapter implements IPodcastApi {
  private apiClient = new PodcastsApiClient();

  async fetchTopPodcasts(): Promise<Podcast[]> {
    const responseApiPodcasts = await this.apiClient.fetchTopPodcasts();

    return mapPodcastResponse(responseApiPodcasts);
  }

  async fetchPodcastDetail(podcastId: string): Promise<podcastDetails> {
    const responseApiPodcastDetail = await this.apiClient.fetchPodcastDetail(podcastId);

    const podcastDetail = responseApiPodcastDetail.filter(
      (itemResponse: { kind: string }) => itemResponse.kind === "podcast",
    );
    const episodes = responseApiPodcastDetail.filter(
      (itemResponse: { kind: string }) => itemResponse.kind === "podcast-episode",
    );

    return mapPodcastDetail(podcastDetail as ApiPodcastDetails[], episodes as ApiEpisode[]);
  }
}

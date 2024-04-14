import { Podcast } from "../../../core/domain/entities/podcast";
import { IPodcastApi } from "../../../core/domain/ports/podcastsApiPort";
import { PodcastsApiClient } from "../clients/PodcastsApiClient";
import { mapPodcastResponse } from "../mappers/podcastsResponseMapper";

export class PodcastAdapter implements IPodcastApi {
  private apiClient = new PodcastsApiClient();

  async fetchTopPodcasts(): Promise<Podcast[]> {
    const responseApiPodcasts = await this.apiClient.fetchTopPodcasts();

    return mapPodcastResponse(responseApiPodcasts);
  }
}

import { IPodcastApi } from "../../domain/ports/podcastsApiPort";

export class GetPodcastDetail {
  constructor(private podcastsApi: IPodcastApi) {}

  async execute(podcastId: string) {
    return await this.podcastsApi.fetchPodcastDetail(podcastId);
  }
}

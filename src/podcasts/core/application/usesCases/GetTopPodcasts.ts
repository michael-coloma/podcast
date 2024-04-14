import { IPodcastApi } from "../../domain/ports/podcastsApiPort";

export class GetTopPodcasts {
  constructor(private podcastsApi: IPodcastApi) {}

  async execute() {
    return await this.podcastsApi.fetchTopPodcasts();
  }
}

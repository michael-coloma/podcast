import axios from "axios";
import { ApiResponsePodcast } from "../mappers/podcastsResponseMapper";
import { ApiEpisode, ApiPodcastDetails } from "../mappers/podcastDetailReponseMapper";

const API_BASE_URL = "https://api.allorigins.win/get?url=";

export type ApiResponsePodcastDetails = [ApiPodcastDetails, ...ApiEpisode[]];

export class PodcastsApiClient {
  private readonly topPodcastsUrl = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

  private podcastDetailUrl(podcastsId: string) {
    return `https://itunes.apple.com/lookup?id=${podcastsId}&media=podcast&entity=podcastEpisode&limit=20`;
  }

  // To use in test
  public getTopPodcastsUrl() {
    return `${API_BASE_URL}${encodeURIComponent(this.topPodcastsUrl)}`;
  }

  //To use in test
  public getPodcastsDetailsUrl(podcastsId: string) {
    return `${API_BASE_URL}${encodeURIComponent(this.podcastDetailUrl(podcastsId))}`;
  }

  async fetchTopPodcasts(): Promise<ApiResponsePodcast[]> {
    const response = await axios.get(`${API_BASE_URL}${encodeURIComponent(this.topPodcastsUrl)}`).catch((error) => {
      console.error("There is an error with fetchTopPodcasts in PodscastApiClient", error);
      throw error;
    });

    return JSON.parse(response.data.contents).feed.entry;
  }

  async fetchPodcastDetail(podcastId: string): Promise<ApiResponsePodcastDetails> {
    const response = await axios
      .get(`${API_BASE_URL}${encodeURIComponent(this.podcastDetailUrl(podcastId))}`)
      .catch((error) => {
        console.error("There is an error with fetchPodcastDetails in PodscastApiClient", error);
        throw error;
      });

    return JSON.parse(response.data.contents).results;
  }
}

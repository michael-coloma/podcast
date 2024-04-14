import axios from "axios";

const API_BASE_URL = "https://api.allorigins.win/get?url=";

export class PodcastsApiClient {
  private readonly topPodcastsUrl =
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

  async fetchTopPodcasts(): Promise<any[]> {
    const response = await axios
      .get(`${API_BASE_URL}${encodeURIComponent(this.topPodcastsUrl)}`)
      .catch((error) => {
        console.error(
          "There is an error with fetch in PodscastApiClient",
          error
        );
        throw error;
      });

    return JSON.parse(response.data.contents).feed.entry;
  }

  public getTopPodcastsUrl() {
    return `${API_BASE_URL}${encodeURIComponent(this.topPodcastsUrl)}`;
  }
}

import { ApiResponsePodcastDetails } from "../clients/PodcastsApiClient";
import { PodcastAdapter } from "./PodcastsAdapter";

describe("PodcastAdapter", () => {
  let adapter: PodcastAdapter;

  beforeEach(() => {
    adapter = new PodcastAdapter();
  });

  it("fetches top podcasts with adapter successfully", async () => {
    const mockResponseApiClient = [
      {
        id: { attributes: { "im:id": "1" } },
        title: { label: "Podcast 1" },
        "im:artist": { label: "Author 1" },
        summary: { label: "Description 1" },
        "im:image": [
          {
            label: "https://example.com/podcast1.jpg",
            attributes: { height: "170" },
          },
        ],
      },
    ];

    jest.spyOn(adapter["apiClient"], "fetchTopPodcasts").mockResolvedValue(mockResponseApiClient);

    const podcasts = await adapter.fetchTopPodcasts();

    expect(podcasts).toHaveLength(1);
    expect(podcasts[0].id).toBe("1");
    expect(podcasts[0].title).toBe("Podcast 1");
  });

  it("fetches podcasts Details with adapter successfully", async () => {
    const mockResponseApiClient: ApiResponsePodcastDetails = [
      {
        kind: "podcast",
        trackCount: 476,
      },
      {
        kind: "podcast-episode",
        trackId: 1000652324873,
        trackName: "Episode 716",
        releaseDate: "2024-04-13T07:00:00Z",
        trackTimeMillis: 11145000,
        description: "In the latest episode...",
        episodeUrl:
          "https://verifi.podscribe.com/rss/p/traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_716.mp3?dest-id=2422538",
      },
    ];

    jest.spyOn(adapter["apiClient"], "fetchPodcastDetail").mockResolvedValue(mockResponseApiClient);

    const podcastsDetails = await adapter.fetchPodcastDetail("12345");

    expect(podcastsDetails.numberEpisodes).toBe(476);
    expect(podcastsDetails.episodes[0]).toMatchObject({
      id: 1000652324873,
      title: "Episode 716",
      publicationDate: "2024-04-13T07:00:00Z",
      duration: 11145000,
      description: "In the latest episode...",
      audioUrl:
        "https://verifi.podscribe.com/rss/p/traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_716.mp3?dest-id=2422538",
    });
  });
});

import { PodcastAdapter } from "./PodcastsAdapter";

describe("PodcastAdapter", () => {
  let adapter: PodcastAdapter;

  beforeEach(() => {
    adapter = new PodcastAdapter();
  });

  it("should fetch top podcasts successfully", async () => {
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

    //mock mockResponseApiClient
    jest
      .spyOn(adapter["apiClient"], "fetchTopPodcasts")
      .mockResolvedValue(mockResponseApiClient);

    // Call the fetchTopPodcasts method of the adapter
    const podcasts = await adapter.fetchTopPodcasts();

    // Assert that the returned podcasts are mapped correctly
    expect(podcasts).toHaveLength(1);
    expect(podcasts[0].id).toBe("1");
    expect(podcasts[0].title).toBe("Podcast 1");
  });
});

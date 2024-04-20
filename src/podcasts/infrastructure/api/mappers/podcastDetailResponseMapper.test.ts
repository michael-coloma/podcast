import { podcastDetails } from "../../../core/domain/entities/podcastDetails";
import { ApiEpisode, ApiPodcastDetails, mapPodcastDetail } from "./podcastDetailReponseMapper";

const mockApiPodcastDetail: ApiPodcastDetails[] = [
  {
    kind: "podcast",
    trackCount: 100,
  },
];

const mockApiEpisode: ApiEpisode[] = [
  {
    kind: "podcast-episode",
    trackId: 1234,
    trackName: "trackName",
    releaseDate: "2024-03-20T16:30:00Z",
    trackTimeMillis: 1102000,
    episodeUrl: "episodeUrl",
    description: "description",
  },
];

const mockResultMap: podcastDetails = {
  numberEpisodes: 100,
  episodes: [
    {
      id: 1234,
      title: "trackName",
      publicationDate: "2024-03-20T16:30:00Z",
      duration: 1102000,
      description: "description",
      audioUrl: "episodeUrl",
    },
  ],
};

describe("podcastsReponseMapper Test", () => {
  it("checks reponse is mapped correctly", () => {
    expect(mapPodcastDetail(mockApiPodcastDetail, mockApiEpisode)).toEqual(mockResultMap);
  });
});

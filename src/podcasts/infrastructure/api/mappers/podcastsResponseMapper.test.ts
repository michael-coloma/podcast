import { Podcast } from "../../../core/domain/entities/podcast";
import { ApiPodcast, mapPodcastResponse } from "./podcastsResponseMapper";

const responseApiPodcasts: ApiPodcast[] = [
  {
    id: { attributes: { "im:id": "mockId" } },
    title: { label: "mockTitle" },
    "im:artist": { label: "mockAuthor" },
    "im:image": [{ label: "mockImageUrl", attributes: { height: "170" } }],
    summary: { label: "mockDescription" },
  },
];

const resultMap: Podcast[] = [
  {
    id: "mockId",
    title: "mockTitle",
    author: "mockAuthor",
    imageUrl: "mockImageUrl",
    description: "mockDescription",
  },
];

describe("podcastsReponseMapper Test", () => {
  it("checks reponse is mapped correctly", () => {
    expect(mapPodcastResponse(responseApiPodcasts)).toEqual(resultMap);
  });

  it("checks reponse is mapped incorrectly", () => {
    expect(mapPodcastResponse(responseApiPodcasts)).not.toEqual([
      { ...resultMap[0], title: "unexpectedTitle" },
    ]);
  });
});

import { Podcast } from "../../../core/domain/entities/podcast";
import { ApiResponsePodcast, mapPodcastResponse } from "./podcastsResponseMapper";

const apiResponsePodcasts: ApiResponsePodcast[] = [
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
    expect(mapPodcastResponse(apiResponsePodcasts)).toEqual(resultMap);
  });

  it("checks reponse is mapped incorrectly", () => {
    expect(mapPodcastResponse(apiResponsePodcasts)).not.toEqual([{ ...resultMap[0], title: "unexpectedTitle" }]);
  });
});

import { Podcast } from "../../../core/domain/entities/podcast";
export interface ApiPodcast {
  title: {
    label: string;
  };
  "im:artist": {
    label: string;
  };
  "im:image": Array<{ label: string; attributes: { height: string } }>;
  id: {
    attributes: {
      "im:id": string;
    };
  };
  summary: {
    label: string;
  };
}

export const mapPodcastResponse = (apiPodcasts: ApiPodcast[]): Podcast[] => {
  return apiPodcasts.map((apiPodcast) => ({
    id: apiPodcast.id.attributes["im:id"],
    title: apiPodcast.title.label,
    author: apiPodcast["im:artist"].label,
    description: apiPodcast.summary.label,
    imageUrl: apiPodcast["im:image"].find((image) => image.attributes.height === "170")?.label || "", //bigger sizes
  }));
};

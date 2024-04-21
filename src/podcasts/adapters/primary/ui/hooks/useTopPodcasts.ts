import { useQuery } from "@tanstack/react-query";
import { PodcastAdapter } from "../../../../infrastructure/api/adapters/PodcastsAdapter";
import { GetTopPodcasts } from "../../../../core/application/usesCases/GetTopPodcasts";

export const useTopPodcasts = () => {
  const podcastService = new PodcastAdapter();
  const getTopPodcasts = new GetTopPodcasts(podcastService);

  const {
    data: podcasts,
    error,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["topPodcasts"],
    queryFn: () => getTopPodcasts.execute(),
  });

  return {
    podcasts: podcasts || [],
    isLoading: isLoading || isFetching,
    error,
    isError,
  };
};

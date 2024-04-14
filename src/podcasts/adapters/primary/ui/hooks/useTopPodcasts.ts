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
    isError,
  } = useQuery({
    queryKey: ["topPodcasts"],
    queryFn: () => getTopPodcasts.execute(),
    // staleTime: 1000 * 60 * 60 * 24
  });

  return {
    podcasts: podcasts || [],
    isLoading,
    error,
    isError,
  };
};

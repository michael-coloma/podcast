import { useQuery } from "@tanstack/react-query";
import { PodcastAdapter } from "../../../../infrastructure/api/adapters/PodcastsAdapter";
import { GetPodcastDetail } from "../../../../core/application/usesCases/GetPodcastDetail";

export const usePodcastDetail = (podcastId: string) => {
  const podcastService = new PodcastAdapter();
  const getPodcastDetail = new GetPodcastDetail(podcastService);

  const {
    data: podcastDetails,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["podcastDetail", `${podcastId}`],
    queryFn: () => getPodcastDetail.execute(podcastId),
  });

  return {
    podcastDetails: podcastDetails || null,
    isLoading,
    error,
    isError,
  };
};

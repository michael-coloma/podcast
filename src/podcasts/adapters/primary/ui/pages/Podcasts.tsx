import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import PodcastCard from "../components/PodcastCard";
import { useTopPodcasts } from "../hooks/useTopPodcasts";
import Filter from "../components/Filter";
import { Podcast } from "../../../../core/domain/entities/podcast";

import * as styles from "./Podcasts.module.css";

const Podcasts: React.FC = () => {
  const { podcasts, error, isLoading, isError } = useTopPodcasts();
  const [podcastsFiltered, setPodcastsFiltered] = useState<Podcast[]>([]);

  useEffect(() => {
    if (!isLoading && !isError && podcasts) {
      setPodcastsFiltered(podcasts);
    }
  }, [podcasts, isLoading, isError]);

  return (
    <>
      <Header isLoading={isLoading} />
      {!isLoading && !isError && (
        <>
          <Filter
            data={podcasts}
            byFields={["title", "author"]}
            onDataFiltered={(podcastsFiltered) =>
              setPodcastsFiltered(podcastsFiltered)
            }
          />
          <div className={styles.podcastsList}>
            {podcastsFiltered.map(
              ({ id, title, author, imageUrl, description }) => (
                <PodcastCard
                  key={id}
                  id={id}
                  title={title}
                  author={author}
                  imageUrl={imageUrl}
                  description={description}
                />
              )
            )}
          </div>
        </>
      )}

      {isError && (
        <>
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </>
      )}
    </>
  );
};

export default Podcasts;

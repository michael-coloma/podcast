import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import PodcastCard from "../components/PodcastCard";
import { useTopPodcasts } from "../hooks/useTopPodcasts";
import Filter from "../components/Filter";

import * as styles from "./Podcasts.module.css";
import { Podcast } from "../../../../core/domain/entities/podcast";

const Podcasts: React.FC = () => {
  const { podcasts, error, isLoading, isError } = useTopPodcasts();
  const [podcastsFiltered, setPodcastsFiltered] = useState<Podcast[]>([]);

  useEffect(() => {
    if (isLoading || !isError) {
      setPodcastsFiltered(podcasts);
    }
  }, [podcasts, isLoading, isError]);

  if (isLoading) {
    return <div>Loading podcasts...</div>;
  }

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  return (
    <>
      <Header />
      <Filter
        data={podcasts}
        byFields={["title", "author"]}
        onDataFiltered={(podcastsFiltered) =>
          setPodcastsFiltered(podcastsFiltered)
        }
      />
      <div className={styles.podcastsList}>
        {podcastsFiltered.map(({ id, title, author, imageUrl }) => (
          <PodcastCard
            key={id}
            id={id}
            title={title}
            author={author}
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </>
  );
};

export default Podcasts;

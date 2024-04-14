import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import PodcastCard from "../components/PodcastCard";
import { useTopPodcasts } from "../hooks/useTopPodcasts";
import Filter from "../components/Filter";

import * as styles from "./Podcasts.module.css";

const Podcasts: React.FC = () => {
  const { podcasts, error, isLoading, isError } = useTopPodcasts();
  const [valueFilter, setValueFilter] = useState<string>("");

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
      <Filter onChange={setValueFilter} />
      <div className={styles.podcastsList}>
        {podcasts
          .filter(
            (podcast) =>
              podcast.title.toLowerCase().includes(valueFilter.toLowerCase()) ||
              podcast.author.toLowerCase().includes(valueFilter.toLowerCase())
          )
          .map(({ id, title, author, imageUrl }) => (
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

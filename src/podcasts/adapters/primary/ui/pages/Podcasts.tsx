import React, { Fragment, useEffect, useState } from "react";
import { Podcast } from "../../../../core/domain/entities/podcast";
import Header from "../components/Header";
import PodcastCard from "../components/PodcastCard";
import * as styles from "./Podcasts.module.css";
import { useTopPodcasts } from "../hooks/useTopPodcasts";

const Podcasts: React.FC = () => {
  const { podcasts, error, isLoading, isError } = useTopPodcasts();

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
      <div className={styles.podcastsList}>
        {podcasts?.map(({ id, title, author, imageUrl }) => (
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

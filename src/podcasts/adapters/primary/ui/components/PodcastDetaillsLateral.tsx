import React from "react";
import * as styles from "./PodcastDetailsLateral.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../secondary/redux/store";

const PodcastDetailLateral = ({}) => {
  const selectedPodcast = useSelector(
    (state: RootState) => state.podcastDetails.selectedPodcast
  );

  const { id, imageUrl, author, title, description } = selectedPodcast || {
    id: 1,
    title: "",
    author: "",
    description: "",
    imageUrl: "",
  };

  return (
    <div key={id} className={styles.page}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={styles.containerTitleAuthor}>
        <span className={styles.title}>{title}</span>
        <em className={styles.author}>by {author}</em>
      </div>
      <div className={styles.containerDescription}>
        <strong>Description: </strong>
        <em className={styles.description}>{description}</em>
      </div>
    </div>
  );
};

export default PodcastDetailLateral;

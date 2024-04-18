import React from "react";
import * as styles from "./PodcastDetailsLateral.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../secondary/redux/store";
import { useNavigate } from "react-router-dom";

interface PodcastDetailsProps {
  enableLinksPodcastDetails?: boolean;
}

const PodcastDetailLateral = ({
  enableLinksPodcastDetails: enableLinkPodcastDetails = false,
}: PodcastDetailsProps) => {
  const navigate = useNavigate();
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
        <span
          className={styles.title}
          onClick={() => enableLinkPodcastDetails && navigate(`/podcast/${id}`)}
        >
          {title}
        </span>
        <em
          className={styles.author}
          onClick={() => enableLinkPodcastDetails && navigate(`/podcast/${id}`)}
        >
          by {author}
        </em>
      </div>
      <div className={styles.containerDescription}>
        <strong>Description: </strong>
        <em className={styles.description}>{description}</em>
      </div>
    </div>
  );
};

export default PodcastDetailLateral;

import React from "react";
import { Link } from "react-router-dom";
import { Podcast } from "../../../../core/domain/entities/podcast";
import * as styles from "./PodcasCard.module.css";

const PodcastCard = ({ id, imageUrl, title, author }: Podcast) => {
  return (
    <div key={id} className={styles.card}>
      <Link className={styles.link} to={`/podcast/${id}`}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={title} />
        </div>
        <span className={styles.title}>{title.toUpperCase()}</span>
        <div className={styles.authorContainer}>
          <span className={styles.author}>Author:</span>
          <span className={styles.author}>{author}</span>
        </div>
      </Link>
    </div>
  );
};

export default PodcastCard;

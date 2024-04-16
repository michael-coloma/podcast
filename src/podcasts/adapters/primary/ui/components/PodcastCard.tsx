import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Podcast } from "../../../../core/domain/entities/podcast";
import * as styles from "./PodcasCard.module.css";
import { useDispatch } from "react-redux";
import { setSelectedPodcast } from "../../../secondary/redux/podCastDetailsSlice";

const PodcastCard = ({ id, imageUrl, title, author, description }: Podcast) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePodcastCardClick = () => {
    dispatch(setSelectedPodcast({ id, imageUrl, title, author, description }));
    navigate(`/podcast/${id}`);
  };

  return (
    <div key={id} className={styles.card} onClick={handlePodcastCardClick}>
      <div>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={title} />
        </div>
        <span className={styles.title}>{title.toUpperCase()}</span>
        <div className={styles.authorContainer}>
          <span className={styles.author}>Author:</span>
          <span className={styles.author}>{author}</span>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;

import React from "react";
import * as styles from "./PodcastDetailsLateral.module.css";

const PodcastDetailLateral = ({}) => {
  const dataMock = {
    id: 1,
    title: "tituli",
    author: "author",
    description: "descripfasdfdsfsafsafsa",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/67/ca/18/67ca1846-f942-2a04-aeb1-8e5652d9d6c5/mza_10646182707668815111.jpg/170x170bb.png",
  };

  const { id, imageUrl, author, title, description } = dataMock;

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
